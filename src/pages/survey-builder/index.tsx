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

const SurveyBuilder = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const [survey, setSurvey] = useState<SurveyType>({
		components: [],
		description: 'this is test desc',
		authRequired: false,
		status: 'drafted',
		title: 'this is test title',
	});
	const [history, setHistory] = useState<SurveyComponent[][]>([
		survey.components,
	]);

	const [selectedComponent, setSelectedComponent] =
		useState<SurveyComponent | null>(null);
	const [showPropertyPanel, setShowPropertyPanel] = useState<boolean>(false);
	const [historyIndex, setHistoryIndex] = useState<number>(0);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [showMobilePreview, setShowMobilePreview] = useState<boolean>(false);
	const [showPalette, setShowPalette] = useState<boolean>(false);

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
			navigate(`/edit/${data?.data?._id}`);
		},
		onSettled: () => {
			setIsSaving(false);
		},
	});

	const addToHistory = (newComponents: SurveyComponent[]): void => {
		const newHistory = history?.slice(0, historyIndex + 1);
		newHistory?.push(newComponents);
		console.log(newComponents);
		setHistory(newHistory);
		setHistoryIndex(newHistory?.length - 1);
	};

	const handleDrop = (e: React.DragEvent<Element>, index: number): void => {
		e?.preventDefault();
		const componentData = JSON.parse(e?.dataTransfer?.getData('component'));

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
		// setComponents(newComponents);
		setSurvey((curr) => ({ ...curr, components: newComponents }));
		addToHistory(newComponents);
	};

	const handleDragOver = (e: React.DragEvent<Element>): void => {
		e?.preventDefault();
	};

	const handleSelectComponent = (component: SurveyComponent): void => {
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
		setIsSaving(true);
		if (survey._id) {
			mutationUpdate(survey);
		} else {
			mutationCreate({ ...survey, user: authUser?.user._id });
		}
	};

	const handleTheme = (themeSettings: unknown): void => {
		console.log('Theme updated:', themeSettings);
	};

	useEffect(() => {
		if (!id) return;
		if (currentSurvey?.data?.data) setSurvey(currentSurvey.data.data);
	}, [currentSurvey, id]);

	if (!survey) return null;

	return (
		<div className='min-h-screen bg-background'>
			{/* Survey Header */}
			<div className='bg-card border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6'>
					<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
						<div className='flex-1 min-w-0'>
							<input
								type='text'
								value={survey.title}
								onChange={(e) =>
									setSurvey((curr) => ({ ...curr, title: e?.target?.value }))
								}
								className='w-full text-xl lg:text-2xl font-heading font-bold text-foreground bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1 mb-2'
								placeholder='Survey Title'
							/>
							<input
								type='text'
								value={survey.description}
								onChange={(e) =>
									setSurvey((curr) => ({
										...curr,
										description: e?.target?.value,
									}))
								}
								className='w-full text-sm lg:text-base text-muted-foreground bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1'
								placeholder='Survey Description'
							/>
						</div>
						<div className='flex items-center gap-2 lg:gap-3'>
							<Button
								variant='outline'
								size='sm'
								onClick={handleSave}
								className='flex-1 lg:flex-none'
							>
								Save Draft
							</Button>
							<Button
								variant='default'
								size='sm'
								onClick={() => navigate('/profile')}
								className='flex-1 lg:flex-none'
							>
								Continue
							</Button>
						</div>
					</div>
				</div>
			</div>
			{/* Main Content */}
			<div className='h-[calc(100vh-16rem)] lg:max-h-[calc(100vh-14rem)]'>
				{/* Desktop Layout */}
				<div className='hidden lg:grid lg:grid-cols-[280px_1fr_400px] h-full'>
					<ComponentPalette onDragStart={() => {}} />
					<CanvasWorkspace
						components={survey.components}
						selectedComponent={selectedComponent}
						onSelectComponent={handleSelectComponent}
						onUpdateComponent={handleUpdateComponent}
						onDeleteComponent={handleDeleteComponent}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
					/>
					<TestModePreviewWrapper>
						<Preview surveyParam={survey} />
					</TestModePreviewWrapper>
				</div>

				{/* Mobile Layout */}
				<div className='lg:hidden h-full'>
					{!showMobilePreview ? (
						<CanvasWorkspace
							components={survey.components}
							selectedComponent={selectedComponent}
							onSelectComponent={handleSelectComponent}
							onUpdateComponent={handleUpdateComponent}
							onDeleteComponent={handleDeleteComponent}
							onDrop={handleDrop}
							onDragOver={handleDragOver}
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
