import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ArrowRight,
	Link2,
	Save,
	LogIn,
	UserPlus,
	X,
	Sparkles,
	Undo2,
	Redo2,
} from 'lucide-react';
import ComponentPalette from '@/pages/survey-builder/components/ComponentPalette';
import CanvasWorkspace from '@/pages/survey-builder/components/CanvasWorkspace';
import { savePendingSurvey } from '@/utils/pendingSurvey';

const initSurvey: SurveyType = {
	components: [],
	description: 'Add a description...',
	authRequired: false,
	status: 'drafted',
	title: 'My Survey',
	fontStyle: 'modern',
	primaryColor: 'blue',
};

type ModalMode = 'save' | 'share' | null;

export default function DemoSurveyBuilder() {
	const navigate = useNavigate();

	const [survey, setSurvey] = useState<SurveyType>(initSurvey);
	const [history, setHistory] = useState<SurveyComponent[][]>([[]]);
	const [historyIndex, setHistoryIndex] = useState(0);
	const [selectedComponent, setSelectedComponent] =
		useState<SurveyComponent | null>(null);
	const [showPreview, setShowPreview] = useState(false);
	const [modalMode, setModalMode] = useState<ModalMode>(null);

	const addToHistory = (components: SurveyComponent[]) => {
		const trimmed = history.slice(0, historyIndex + 1);
		trimmed.push(components);
		setHistory(trimmed);
		setHistoryIndex(trimmed.length - 1);
	};

	const handleDrop = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		const componentDataStr = e.dataTransfer.getData('component');
		const moveIndexStr = e.dataTransfer.getData('moveIndex');

		if (moveIndexStr) {
			const fromIndex = parseInt(moveIndexStr);
			const newComponents = [...survey.components];
			const [moved] = newComponents.splice(fromIndex, 1);
			const toIndex = index > fromIndex ? index - 1 : index;
			newComponents.splice(toIndex, 0, moved);
			setSurvey((c) => ({ ...c, components: newComponents }));
			addToHistory(newComponents);
			return;
		}

		if (componentDataStr) {
			const componentData = JSON.parse(componentDataStr);
			const newComponent: SurveyComponent = {
				...componentData,
				id: `comp-${Date.now()}`,
				label: `${componentData.name} Question`,
				required: false,
				options: ['multiple-choice', 'checkboxes', 'dropdown'].includes(
					componentData.type,
				)
					? ['Option 1', 'Option 2', 'Option 3']
					: undefined,
			};
			const newComponents = [...survey.components];
			newComponents.splice(index, 0, newComponent);
			setSurvey((c) => ({ ...c, components: newComponents }));
			addToHistory(newComponents);
		}
	};

	const handleDragOver = (e: React.DragEvent) => e.preventDefault();

	const handleUpdateComponent = (
		id: string,
		updates: Partial<SurveyComponent>,
	) => {
		const newComponents = survey.components.map((c) =>
			c.id === id ? { ...c, ...updates } : c,
		);
		setSurvey((curr) => ({ ...curr, components: newComponents }));
		addToHistory(newComponents);
		if (selectedComponent?.id === id) {
			setSelectedComponent({ ...selectedComponent, ...updates });
		}
	};

	const handleDeleteComponent = (id: string) => {
		const newComponents = survey.components.filter((c) => c.id !== id);
		setSurvey((curr) => ({ ...curr, components: newComponents }));
		addToHistory(newComponents);
		if (selectedComponent?.id === id) setSelectedComponent(null);
	};

	const handleUndo = () => {
		if (historyIndex > 0) {
			const prev = historyIndex - 1;
			setHistoryIndex(prev);
			setSurvey((c) => ({ ...c, components: history[prev] }));
		}
	};

	const handleRedo = () => {
		if (historyIndex < history.length - 1) {
			const next = historyIndex + 1;
			setHistoryIndex(next);
			setSurvey((c) => ({ ...c, components: history[next] }));
		}
	};

	const handleCTAClick = (mode: ModalMode) => {
		setModalMode(mode);
	};

	const proceedToAuth = (tab: 'signup' | 'signin') => {
		// Persist the current draft so it survives auth redirect
		savePendingSurvey(survey);
		navigate(`/auth?intent=${tab}&restore=1`);
	};

	return (
		<section className='py-24 md:py-32 border-t border-border bg-muted/10'>
			<div className='max-w-7xl mx-auto px-6'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-10'
				>
					<span className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 mb-5'>
						<Sparkles className='w-3 h-3' />
						Try it live — no signup needed
					</span>
					<h2 className='text-4xl md:text-5xl font-black tracking-tight text-foreground mb-3'>
						Build a survey right here.
					</h2>
					<p className='text-muted-foreground text-lg max-w-md mx-auto'>
						Drag components from the left panel onto the canvas. When you're ready,
						sign up to save and share your survey — your work won't be lost.
					</p>
				</motion.div>

				{/* Builder frame */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
					className='rounded-2xl border border-border overflow-hidden shadow-xl bg-card'
				>
					{/* Toolbar */}
					<div className='flex items-center justify-between px-5 py-3 border-b border-border bg-card'>
						{/* Left: title / description */}
						<div className='flex flex-col gap-0.5 min-w-0 flex-1 mr-4'>
							<input
								type='text'
								value={survey.title}
								onChange={(e) =>
									setSurvey((c) => ({ ...c, title: e.target.value }))
								}
								placeholder='Survey title...'
								className='text-base font-semibold text-foreground bg-transparent border-none outline-none focus:ring-0 placeholder:text-muted-foreground/50 truncate w-full max-w-xs'
							/>
							<input
								type='text'
								value={survey.description}
								onChange={(e) =>
									setSurvey((c) => ({ ...c, description: e.target.value }))
								}
								placeholder='Description...'
								className='text-xs text-muted-foreground bg-transparent border-none outline-none focus:ring-0 placeholder:text-muted-foreground/40 truncate w-full max-w-xs'
							/>
						</div>

						{/* Right: actions */}
						<div className='flex items-center gap-2 shrink-0'>
							<button
								onClick={handleUndo}
								disabled={historyIndex === 0}
								className='p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors'
								title='Undo'
							>
								<Undo2 className='w-4 h-4' />
							</button>
							<button
								onClick={handleRedo}
								disabled={historyIndex === history.length - 1}
								className='p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors'
								title='Redo'
							>
								<Redo2 className='w-4 h-4' />
							</button>
							<div className='w-px h-5 bg-border mx-1' />
							<button
								onClick={() => handleCTAClick('share')}
								disabled={!survey.components.length}
								className='inline-flex items-center gap-1.5 text-xs font-medium border border-border px-3 py-1.5 rounded-lg hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
							>
								<Link2 className='w-3.5 h-3.5' />
								Get link
							</button>
							<button
								onClick={() => handleCTAClick('save')}
								disabled={!survey.components.length}
								className='inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
							>
								<Save className='w-3.5 h-3.5' />
								Save survey
							</button>
						</div>
					</div>

					{/* Hint when empty */}
					{survey.components.length === 0 && (
						<div className='hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary/5 border-b border-primary/10 text-xs text-primary/80'>
							<ArrowRight className='w-3.5 h-3.5 shrink-0' />
							Drag any component from the left panel to get started — try "Multiple
							Choice" or "Text Input"
						</div>
					)}

					{/* Builder body — fixed height so it doesn't jump */}
					<div className='h-[540px] flex overflow-hidden'>
						{/* Palette — hidden on small screens */}
						<div className='hidden lg:block w-56 shrink-0 overflow-y-auto border-r border-border'>
							<ComponentPalette onDragStart={() => {}} />
						</div>

						{/* Canvas */}
						<div className='flex-1 overflow-hidden'>
							<CanvasWorkspace
								components={survey.components}
								selectedComponent={selectedComponent}
								onSelectComponent={setSelectedComponent}
								onOpenSettings={setSelectedComponent}
								onUpdateComponent={handleUpdateComponent}
								onDeleteComponent={handleDeleteComponent}
								onDrop={handleDrop}
								onDragOver={handleDragOver}
								preview={showPreview}
								showPreview={() => setShowPreview((p) => !p)}
							/>
						</div>
					</div>

					{/* Mobile hint */}
					<div className='lg:hidden flex items-center justify-center gap-2 px-5 py-3 border-t border-border bg-muted/30 text-xs text-muted-foreground'>
						<span>
							Use a desktop browser for the full drag-and-drop experience.
						</span>
					</div>
				</motion.div>
			</div>

			{/* ── Auth gate modal ── */}
			<AnimatePresence>
				{modalMode && (
					<motion.div
						key='overlay'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'
						onClick={() => setModalMode(null)}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 16 }}
							transition={{ duration: 0.22 }}
							onClick={(e) => e.stopPropagation()}
							className='bg-card border border-border rounded-2xl shadow-2xl max-w-sm w-full p-8 relative'
						>
							<button
								onClick={() => setModalMode(null)}
								className='absolute top-4 right-4 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
							>
								<X className='w-4 h-4' />
							</button>

							{/* Icon */}
							<div className='w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5'>
								{modalMode === 'save' ? (
									<Save className='w-6 h-6 text-primary' />
								) : (
									<Link2 className='w-6 h-6 text-primary' />
								)}
							</div>

							<h3 className='text-xl font-black text-foreground mb-2'>
								{modalMode === 'save'
									? 'Sign up to save your survey'
									: 'Sign up to get a sharing link'}
							</h3>
							<p className='text-sm text-muted-foreground leading-relaxed mb-6'>
								Your survey has{' '}
								<strong className='text-foreground'>
									{survey.components.length} question
									{survey.components.length !== 1 ? 's' : ''}
								</strong>
								. Create a free account and it'll be waiting for you — no work
								lost.
							</p>

							<div className='flex flex-col gap-3'>
								<button
									onClick={() => proceedToAuth('signup')}
									className='flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-xl hover:bg-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20'
								>
									<UserPlus className='w-4 h-4' />
									Create free account
									<ArrowRight className='w-4 h-4 ml-auto' />
								</button>
								<button
									onClick={() => proceedToAuth('signin')}
									className='flex items-center justify-center gap-2 w-full border border-border text-foreground font-medium text-sm py-3 rounded-xl hover:bg-accent transition-colors'
								>
									<LogIn className='w-4 h-4' />
									Sign in to existing account
								</button>
							</div>

							<p className='text-center text-xs text-muted-foreground mt-5'>
								Free forever · No credit card · Takes 30 seconds
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
