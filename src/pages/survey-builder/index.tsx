import { useState } from 'react';
import ComponentPalette from './components/ComponentPalette';
import CanvasWorkspace from './components/CanvasWorkspace';
import LivePreviewPanel from './components/LivePreviewPanel';
import FloatingToolbar from './components/FloatingToolbar';
import PropertyPanel from './components/PropertyPanel';
import Icon from '../../components/AppIcon';
import { Button } from '../../components/ui/button';
import Preview from '../Preview';
import { demoSurvey } from '../Preview/servey';
import TestModePreviewWrapper from '../Preview/TestModePreviewWrapper';

const SurveyBuilder = () => {
	const savedSurvey: SavedSurvey = {
		title: 'Customer Satisfaction Survey',
		id: '#si345bjyka34',
		description: 'Help us improve our services by sharing your feedback',
		components: [
			{
				id: 'comp-1',
				type: 'text-input',
				name: 'Text Input',
				icon: 'Type',
				min: 3,
				max: 100,
				validation: 'none',
				label: 'What is your full name?',
				description: 'Please enter your first and last name',
				required: false,
				placeholder: 'John Doe',
			},
			{
				id: 'comp-2',
				type: 'email',
				name: 'Email',
				icon: 'Mail',
				min: 3,
				max: 100,
				label: 'What is your email address?',
				required: true,
				placeholder: 'john@example.com',
			},
			{
				id: 'comp-3',
				type: 'multiple-choice',
				name: 'Multiple Choice',
				icon: 'Circle',
				label: 'How satisfied are you with our service?',
				required: true,
				options: [
					'Very Satisfied',
					'Satisfied',
					'Neutral',
					'Dissatisfied',
					'Very Dissatisfied',
				],
			},
		],
	};

	const [surveyTitle, setSurveyTitle] = useState(savedSurvey.title);
	const [surveyDescription, setSurveyDescription] = useState(
		savedSurvey.description,
	);
	const [components, setComponents] = useState(savedSurvey.components);
	const [history, setHistory] = useState([savedSurvey.components]);

	const [selectedComponent, setSelectedComponent] =
		useState<SurveyComponent | null>(null);
	const [showPropertyPanel, setShowPropertyPanel] = useState<boolean>(false);
	const [historyIndex, setHistoryIndex] = useState<number>(0);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [showMobilePreview, setShowMobilePreview] = useState<boolean>(false);
	const [showPalette, setShowPalette] = useState<boolean>(false);

	const addToHistory = (newComponents: SurveyComponent[]): void => {
		const newHistory = history?.slice(0, historyIndex + 1);
		newHistory?.push(newComponents);
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

		const newComponents = [...components];
		newComponents?.splice(index, 0, newComponent);
		setComponents(newComponents);
		addToHistory(newComponents);
	};

	const navigate = (path: string): void => {
		console.log(`Navigating to ${path}`);
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
		const newComponents = components?.map((comp) =>
			comp?.id === componentId ? { ...comp, ...updates } : comp,
		);
		setComponents(newComponents);
		addToHistory(newComponents);

		if (selectedComponent?.id === componentId) {
			setSelectedComponent({ ...selectedComponent, ...updates });
		}
	};

	const handleDeleteComponent = (componentId: string): void => {
		const newComponents = components?.filter(
			(comp) => comp?.id !== componentId,
		);
		setComponents(newComponents);
		addToHistory(newComponents);

		if (selectedComponent?.id === componentId) {
			setSelectedComponent(null);
			setShowPropertyPanel(false);
		}
	};

	const handleUndo = (): void => {
		if (historyIndex > 0) {
			setHistoryIndex(historyIndex - 1);
			setComponents(history?.[historyIndex - 1]);
		}
	};

	const handleRedo = (): void => {
		if (historyIndex < history?.length - 1) {
			setHistoryIndex(historyIndex + 1);
			setComponents(history?.[historyIndex + 1]);
		}
	};

	const handleSave = (): void => {
		setIsSaving(true);
		// later we have to update the same in database
		localStorage.setItem(
			`COMPONENT_DRAFT_${savedSurvey.id}`,
			JSON.stringify(components),
		);
		setTimeout(() => {
			setIsSaving(false);
		}, 500);
	};

	const handleTheme = (themeSettings: unknown): void => {
		console.log('Theme updated:', themeSettings);
	};

	return (
		<div className='min-h-screen bg-background'>
			{/* Survey Header */}
			<div className='bg-card border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6'>
					<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
						<div className='flex-1 min-w-0'>
							<input
								type='text'
								value={surveyTitle}
								onChange={(e) => setSurveyTitle(e?.target?.value)}
								className='w-full text-xl lg:text-2xl font-heading font-bold text-foreground bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1 mb-2'
								placeholder='Survey Title'
							/>
							<input
								type='text'
								value={surveyDescription}
								onChange={(e) => setSurveyDescription(e?.target?.value)}
								className='w-full text-sm lg:text-base text-muted-foreground bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1'
								placeholder='Survey Description'
							/>
						</div>
						<div className='flex items-center gap-2 lg:gap-3'>
							<Button
								variant='outline'
								size='sm'
								// iconName='Save'
								// iconPosition='left'
								// iconSize={16}
								// loading={isSaving}
								onClick={handleSave}
								className='flex-1 lg:flex-none'
							>
								Save Draft
							</Button>
							<Button
								variant='default'
								size='sm'
								// iconName='ArrowRight'
								// iconPosition='right'
								// iconSize={16}
								onClick={() => navigate('/survey-settings')}
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
						components={components}
						selectedComponent={selectedComponent}
						onSelectComponent={handleSelectComponent}
						onUpdateComponent={handleUpdateComponent}
						onDeleteComponent={handleDeleteComponent}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
					/>
					<TestModePreviewWrapper>
						<Preview
							survey={{
								components: components,
								description: surveyDescription,
								id: savedSurvey.id,
								title: surveyTitle,
							}}
						/>
					</TestModePreviewWrapper>
					{/* <LivePreviewPanel
						components={components}
						surveyTitle={surveyTitle}
						surveyDescription={surveyDescription}
					/> */}
				</div>

				{/* Mobile Layout */}
				<div className='lg:hidden h-full'>
					{!showMobilePreview ? (
						<CanvasWorkspace
							components={components}
							selectedComponent={selectedComponent}
							onSelectComponent={handleSelectComponent}
							onUpdateComponent={handleUpdateComponent}
							onDeleteComponent={handleDeleteComponent}
							onDrop={handleDrop}
							onDragOver={handleDragOver}
						/>
					) : (
						<Preview
							survey={{
								components: components,
								description: surveyDescription,
								id: savedSurvey.id,
								title: surveyTitle,
							}}
						/>
						// <LivePreviewPanel
						// 	components={components}
						// 	surveyTitle={surveyTitle}
						// 	surveyDescription={surveyDescription}
						// />
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
					// iconName='Edit3'
					// iconPosition='left'
					// iconSize={16}
					// fullWidth
					onClick={() => setShowMobilePreview(false)}
				>
					Build
				</Button>
				<Button
					variant={showMobilePreview ? 'default' : 'outline'}
					size='sm'
					// iconName='Eye'
					// iconPosition='left'
					// iconSize={16}
					// fullWidth
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
