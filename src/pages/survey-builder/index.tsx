import { useEffect, useState } from 'react';
import ComponentPalette from './components/ComponentPalette';
import CanvasWorkspace from './components/CanvasWorkspace';
import FloatingToolbar from './components/FloatingToolbar';
import PropertyPanel from './components/PropertyPanel';
import Icon from '../../components/AppIcon';
import { Button } from '../../components/ui/button';
import Preview from '../Preview';
import TestModePreviewWrapper from '../Preview/TestModePreviewWrapper';
import surveyApi from '@/utils/survey.feature';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetSurveyBySurveyId } from '@/queries/survey.query';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAuthUser, userQueryAuth } from '@/queries/auth.query';
import { useTheme } from '@/context/theme.context';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import { htmlToText } from '@/utils/htmlToText';
import { isNonMeaningful } from '@/utils/sanitize';

const initSurvey: SurveyType = {
	components: [],
	description: 'Survey Description',
	authRequired: false,
	status: 'drafted',
	title: 'Survey Title',
	fontStyle: 'modern',
	primaryColor: 'blue',
};

const SurveyBuilder = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { setColor, setFont } = useTheme();

	const [survey, setSurvey] = useState<SurveyType>(initSurvey);
	const [history, setHistory] = useState<SurveyComponent[][]>([
		survey.components,
	]);
	const [showPreview, setShowPreview] = useState(false);

	const [selectedComponent, setSelectedComponent] =
		useState<SurveyComponent | null>(null);
	const [showPropertyPanel, setShowPropertyPanel] = useState<boolean>(false);
	const [historyIndex, setHistoryIndex] = useState<number>(0);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [showMobilePreview, setShowMobilePreview] = useState<boolean>(false);
	const [showPalette, setShowPalette] = useState<boolean>(false);
	const [isDirty, setIsDirty] = useState(false);
	const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
	const [isSavingAndExiting, setIsSavingAndExiting] = useState(false);

	const { id } = useParams<{ id: string }>();

	const { data: currentSurvey } = useGetSurveyBySurveyId(id!);
	const { data: authUser } = useGetAuthUser();

	const { mutate: mutationUpdate } = useMutation({
		mutationFn: (survey: SurveyType) => surveyApi.update(survey._id!, survey),
		onError: (err) => {
			console.log(err);
			toast.error('Server Unreachable please check the logs');
		},
		onSuccess: (data) => {
			if (data.error) toast.error(data.error);
			if (!data.data) return;
			toast.success('Survey Drafted Successfully');
			setSurvey(data.data);
			setIsDirty(false);
			if (isSavingAndExiting) {
				navigate('/profile');
			}
			queryClient.invalidateQueries({ queryKey: ['survey'] });
		},
		onSettled: () => {
			setIsSaving(false);
		},
	});

	const { mutate: mutationCreate } = useMutation({
		mutationFn: (survey: SurveyType) => surveyApi.create(survey),
		onError: (err) => {
			console.log(err);
			toast.error('Server Unreachable please check the logs');
		},
		onSuccess: (data) => {
			if (data.error) toast.error(data.error);
			if (!data.data) return;
			toast.success('Survey Drafted Successfully');
			setSurvey(data.data);
			setIsDirty(false);
			if (isSavingAndExiting) {
				navigate('/profile');
			} else {
				navigate(`/edit/${data?.data?._id}`);
			}
		},
		onSettled: () => {
			setIsSaving(false);
		},
	});

	const addToHistory = (newComponents: SurveyComponent[]): void => {
		const newHistory = history?.slice(0, historyIndex + 1);
		newHistory?.push(newComponents);
		setHistory(newHistory);
		setHistoryIndex(newHistory?.length - 1);
	};

	const handleDrop = (e: React.DragEvent<Element>, index: number): void => {
		e?.preventDefault();
		const componentDataStr = e?.dataTransfer?.getData('component');
		const moveIndexStr = e?.dataTransfer?.getData('moveIndex');

		if (moveIndexStr) {
			const fromIndex = parseInt(moveIndexStr);
			const newComponents = [...survey.components];
			const [movedComponent] = newComponents.splice(fromIndex, 1);

			// Adjust destination index if it shifted due to the removal
			const toIndex = index > fromIndex ? index - 1 : index;
			newComponents.splice(toIndex, 0, movedComponent);

			setSurvey((curr) => ({ ...curr, components: newComponents }));
			addToHistory(newComponents);
			return;
		}

		if (componentDataStr) {
			const componentData = JSON.parse(componentDataStr);
			const newComponent: SurveyComponent = {
				...componentData,
				id: `comp-${Date.now()}`,
				label: `${componentData?.name} Question`,
				required: false,
				options: ['multiple-choice', 'checkboxes', 'dropdown']?.includes(
					componentData?.type,
				)
					? ['Option 1', 'Option 2', 'Option 3']
					: undefined,
			};

			const newComponents = [...survey.components];
			newComponents?.splice(index, 0, newComponent);
			setSurvey((curr) => ({ ...curr, components: newComponents }));
			addToHistory(newComponents);
			setIsDirty(true);
		}
	};

	const handleDragOver = (e: React.DragEvent<Element>): void => {
		e?.preventDefault();
	};

	const handleSelectComponent = (component: SurveyComponent): void => {
		setSelectedComponent(component);
		// setShowPropertyPanel(true); // Don't open automatically
	};

	const handleOpenSettings = (component: SurveyComponent): void => {
		setSelectedComponent(component);
		setShowPropertyPanel(true);
	};

	const handleUpdateComponent = (
		componentId: string,
		updates: Partial<SurveyComponent>,
	): void => {
		const newComponents = survey.components?.map((comp) =>
			comp?.id === componentId ? { ...comp, ...updates } : comp,
		);

		setSurvey((curr) => ({ ...curr, components: newComponents }));
		addToHistory(newComponents);

		if (selectedComponent?.id === componentId) {
			setSelectedComponent({ ...selectedComponent, ...updates });
		}
		setIsDirty(true);
	};

	const handleDeleteComponent = (componentId: string): void => {
		const newComponents = survey.components?.filter(
			(comp) => comp?.id !== componentId,
		);

		setSurvey((curr) => ({ ...curr, components: newComponents }));
		addToHistory(newComponents);

		if (selectedComponent?.id === componentId) {
			setSelectedComponent(null);
			setShowPropertyPanel(false);
		}
		setIsDirty(true);
	};

	const handleUndo = (): void => {
		if (historyIndex > 0 && survey) {
			setHistoryIndex(historyIndex - 1);
			setSurvey((curr) => ({
				...curr,
				components: history?.[historyIndex - 1],
			}));
		}
	};

	const handleRedo = (): void => {
		if (historyIndex < history?.length - 1) {
			setHistoryIndex(historyIndex + 1);
			setSurvey((curr) => ({
				...curr,
				components: history?.[historyIndex + 1],
			}));
		}
	};

	const handleSave = async () => {
		if (isNonMeaningful(survey.title)) {
			toast.error('Survey title cannot be empty');
			return;
		}

		if (!survey.components?.length) {
			toast.error('Add at least one component before saving a draft');
			return;
		}

		for (const component of survey.components) {
			// Skip content-only components like dividers and images for label validation if needed,
			// but usually they also have labels/alt text.
			if (component.type !== 'divider') {
				const labelText = htmlToText(component.label || '');
				if (isNonMeaningful(labelText)) {
					toast.error(`Question text for ${component.type} cannot be empty`);
					return;
				}
			}

			if (
				['multiple-choice', 'checkboxes', 'dropdown', 'ranking'].includes(
					component.type,
				)
			) {
				const options = component.options as unknown as string[];
				if (!options || options.length === 0) {
					toast.error(`At least one option is required for ${component.type}`);
					return;
				}
				for (let i = 0; i < options.length; i++) {
					if (isNonMeaningful(options[i])) {
						toast.error(
							`Option ${i + 1} for ${component.type} cannot be empty`,
						);
						return;
					}
				}
			}
		}

		setIsSaving(true);
		if (survey._id) {
			mutationUpdate(survey);
		} else {
			mutationCreate({ ...survey, user: authUser?.user._id });
		}
	};

	const handleTheme = function (trigger: {
		primaryColor?: string;
		fontStyle?: string;
	}) {
		if (trigger.primaryColor) {
			setColor(trigger.primaryColor as ColorTheme);
			setSurvey((curr) => ({
				...curr,
				primaryColor: trigger.primaryColor as ColorTheme,
			}));
			setIsDirty(true);
		} else if (trigger.fontStyle) {
			setFont(trigger.fontStyle as FontTheme);
			setSurvey((curr) => ({
				...curr,
				fontStyle: trigger.fontStyle as FontTheme,
			}));
			setIsDirty(true);
		}
	};

	useEffect(() => {
		if (!id || !currentSurvey?.data?.data) return;
		setSurvey(currentSurvey.data.data);
	}, [currentSurvey?.data?.data, id]);

	if (!survey) return null;

	return (
		<div className={`min-h-screen`}>
			<Header />
			{/* Survey Header */}
			<div className='bg-card border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6'>
					<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
						<div className='flex-1 min-w-0'>
							<input
								type='text'
								value={survey.title}
								onChange={(e) => {
									setSurvey((curr) => ({ ...curr, title: e?.target?.value }));
									setIsDirty(true);
								}}
								className='w-full text-xl lg:text-2xl  font-heading font-bold text-foreground bg-transparent border outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1 mb-2'
								placeholder='Survey Title'
							/>
							<input
								type='text'
								value={survey.description}
								onChange={(e) => {
									setSurvey((curr) => ({
										...curr,
										description: e?.target?.value,
									}));
									setIsDirty(true);
								}}
								className='w-full text-sm lg:text-base text-muted-foreground bg-transparent border outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1'
								placeholder='Survey Description'
							/>
						</div>
						<div className='flex items-center gap-2 lg:gap-3'>
							<Button
								variant='outline'
								size='sm'
								onClick={handleSave}
								disabled={isSaving || !survey.components?.length}
								className='flex-1 lg:flex-none'
							>
								Save Draft
							</Button>
							<Button
								variant='default'
								size='sm'
								onClick={() => {
									if (isDirty) {
										setShowUnsavedDialog(true);
									} else {
										navigate('/profile');
									}
								}}
								className='flex-1 lg:flex-none'
							>
								Continue
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Unsaved Changes Dialog */}
			<Dialog
				open={showUnsavedDialog}
				onOpenChange={setShowUnsavedDialog}
			>
				<DialogContent className='max-w-md'>
					<DialogHeader>
						<div className='flex items-center gap-3 text-warning mb-2'>
							<AlertCircle className='w-6 h-6 text-amber-500' />
							<DialogTitle className='text-xl'>Unsaved Changes</DialogTitle>
						</div>
						<DialogDescription className='text-base'>
							You have unsaved progress in your survey. What would you like to
							do?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className='mt-6 gap-3 flex-col sm:flex-row'>
						<Button
							variant='outline'
							onClick={() => navigate('/profile')}
							className='w-full sm:w-auto'
						>
							Exit Without Saving
						</Button>
						<Button
							variant='default'
							onClick={() => {
								setIsSavingAndExiting(true);
								handleSave();
							}}
							disabled={isSaving}
							className='w-full sm:w-auto bg-primary hover:bg-primary/90'
						>
							{isSaving ? 'Saving...' : 'Save Draft & Exit'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			{/* Main Content */}
			<div className='h-[calc(100vh-16rem)] lg:max-h-[calc(100vh-14rem)]'>
				{/* Desktop Layout */}
				<div className='hidden lg:flex h-full'>
					<ComponentPalette onDragStart={() => {}} />
					<CanvasWorkspace
						components={survey.components}
						selectedComponent={selectedComponent}
						onSelectComponent={handleSelectComponent}
						onOpenSettings={handleOpenSettings}
						onUpdateComponent={handleUpdateComponent}
						onDeleteComponent={handleDeleteComponent}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						preview={showPreview}
						showPreview={() => setShowPreview((prev) => !prev)}
					/>
					{showPreview && (
						<TestModePreviewWrapper>
							<Preview surveyParam={survey} />
						</TestModePreviewWrapper>
					)}
				</div>

				{/* Mobile Layout */}
				<div className='lg:hidden h-full'>
					{!showMobilePreview ? (
						<CanvasWorkspace
							components={survey.components}
							selectedComponent={selectedComponent}
							onSelectComponent={handleSelectComponent}
							onOpenSettings={handleOpenSettings}
							preview={showPreview}
							onUpdateComponent={handleUpdateComponent}
							onDeleteComponent={handleDeleteComponent}
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							showPreview={() => setShowPreview((prev) => !prev)}
						/>
					) : (
						<Preview surveyParam={survey} />
					)}
				</div>
			</div>
			{/* Mobile Component Palette */}
			{showPalette && (
				<div className='lg:hidden fixed inset-0 z-modal'>
					<div
						className='absolute inset-0 bg-background'
						onClick={() => setShowPalette(false)}
					/>
					<div className='absolute inset-x-0 bottom-0 max-h-[70vh] bg-card rounded-t-xl shadow-elevation-5'>
						<ComponentPalette onDragStart={() => setShowPalette(false)} />
					</div>
				</div>
			)}
			{/* Mobile Toggle Buttons */}
			<div className='lg:hidden fixed bottom-20 left-4 right-4 z-sticky flex items-center gap-2'>
				<Button
					variant={showMobilePreview ? 'outline' : 'default'}
					size='sm'
					onClick={() => setShowMobilePreview(false)}
				>
					Build
				</Button>
				<Button
					variant={showMobilePreview ? 'default' : 'outline'}
					size='sm'
					onClick={() => setShowMobilePreview(true)}
				>
					Preview
				</Button>
			</div>
			{/* Mobile Add Component Button */}
			{!showMobilePreview && (
				<button
					onClick={() => setShowPalette(true)}
					className='lg:hidden fixed bottom-36 right-4 z-sticky w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevation-4 flex items-center justify-center hover:shadow-elevation-5 transition-smooth'
				>
					<Icon
						name='Plus'
						size={24}
					/>
				</button>
			)}
			<FloatingToolbar
				onSave={handleSave}
				onUndo={handleUndo}
				onRedo={handleRedo}
				onTheme={handleTheme}
				canUndo={historyIndex > 0}
				canRedo={historyIndex < history?.length - 1}
				isSaving={isSaving}
			/>
			{showPropertyPanel && selectedComponent?.id && (
				<PropertyPanel
					component={selectedComponent}
					onUpdate={(updates) =>
						handleUpdateComponent(selectedComponent?.id, updates)
					}
					onClose={() => setShowPropertyPanel(false)}
				/>
			)}
		</div>
	);
};

export default SurveyBuilder;
