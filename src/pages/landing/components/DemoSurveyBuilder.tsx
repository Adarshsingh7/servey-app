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
	GripVertical,
	Trash2,
	MousePointerClick,
} from 'lucide-react';
import Icon from '@/components/AppIcon';
import { savePendingSurvey } from '@/utils/pendingSurvey';

// ── Palette data (matches ComponentPalette categories) ─────────────────────

const PALETTE_ITEMS: { icon: string; name: string; type: SurveyComponentType }[] = [
	{ icon: 'Type',         name: 'Text Input',      type: 'text-input' },
	{ icon: 'AlignLeft',    name: 'Text Area',       type: 'textarea' },
	{ icon: 'Hash',         name: 'Number',          type: 'number' },
	{ icon: 'Mail',         name: 'Email',           type: 'email' },
	{ icon: 'Phone',        name: 'Phone',           type: 'phone' },
	{ icon: 'Circle',       name: 'Multiple Choice', type: 'multiple-choice' },
	{ icon: 'CheckSquare',  name: 'Checkboxes',      type: 'checkboxes' },
	{ icon: 'ChevronDown',  name: 'Dropdown',        type: 'dropdown' },
	{ icon: 'ToggleLeft',   name: 'Yes / No',        type: 'yes-no' },
	{ icon: 'Star',         name: 'Star Rating',     type: 'star-rating' },
	{ icon: 'Sliders',      name: 'Scale',           type: 'scale' },
	{ icon: 'TrendingUp',   name: 'NPS Score',       type: 'nps' },
	{ icon: 'Smile',        name: 'Emoji Rating',    type: 'emoji' },
	{ icon: 'Calendar',     name: 'Date Picker',     type: 'date' },
	{ icon: 'Clock',        name: 'Time Picker',     type: 'time' },
	{ icon: 'List',         name: 'Ranking',         type: 'ranking' },
	{ icon: 'Heading',      name: 'Heading',         type: 'heading' },
	{ icon: 'AlignLeft',    name: 'Paragraph',       type: 'paragraph' },
	{ icon: 'Minus',        name: 'Divider',         type: 'divider' },
];

// ── Types ───────────────────────────────────────────────────────────────────

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

// ── Inline Palette ──────────────────────────────────────────────────────────

function DemoPalette() {
	const handleDragStart = (
		e: React.DragEvent,
		item: (typeof PALETTE_ITEMS)[number],
	) => {
		e.dataTransfer.effectAllowed = 'copy';
		e.dataTransfer.setData(
			'component',
			JSON.stringify({ id: item.type, type: item.type, name: item.name, icon: item.icon }),
		);
	};

	return (
		<div className='h-full flex flex-col bg-card'>
			<div className='px-4 py-3 border-b border-border shrink-0'>
				<div className='flex items-center gap-2'>
					<Icon name='Package' size={16} color='var(--color-primary)' />
					<span className='text-sm font-semibold text-foreground'>Components</span>
				</div>
				<p className='text-xs text-muted-foreground mt-0.5'>Drag onto canvas</p>
			</div>

			<div className='flex-1 overflow-y-auto p-2 grid grid-cols-1 gap-1'>
				{PALETTE_ITEMS.map((item) => (
					<div
						key={item.type}
						draggable
						onDragStart={(e) => handleDragStart(e, item)}
						className='group flex items-center gap-2 p-2 rounded-lg border border-border bg-card cursor-grab active:cursor-grabbing hover:bg-accent hover:border-primary/20 transition-all select-none'
					>
						<div className='w-8 h-8 shrink-0 rounded-lg bg-primary/8 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all'>
							<Icon name={item.icon} size={15} color='var(--color-primary)' />
						</div>
						<span className='text-xs font-medium text-foreground truncate'>
							{item.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

// ── Inline Canvas ───────────────────────────────────────────────────────────

function DemoCanvas({
	components,
	selectedId,
	onSelect,
	onUpdate,
	onDelete,
	onDrop,
}: {
	components: SurveyComponent[];
	selectedId: string | null;
	onSelect: (id: string) => void;
	onUpdate: (id: string, updates: Partial<SurveyComponent>) => void;
	onDelete: (id: string) => void;
	onDrop: (e: React.DragEvent, index: number) => void;
}) {
	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

	const handleDrop = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		setDragOverIndex(null);
		onDrop(e, index);
	};

	const handleDragOver = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		setDragOverIndex(index);
	};

	return (
		<div className='h-full flex flex-col bg-background'>
			{/* Canvas header */}
			<div className='px-5 py-3 border-b border-border bg-card shrink-0'>
				<p className='text-sm font-semibold text-foreground'>Canvas</p>
				<p className='text-xs text-muted-foreground'>
					{components.length} question{components.length !== 1 ? 's' : ''}
				</p>
			</div>

			{/* Drop area */}
			<div className='flex-1 overflow-y-auto p-5'>
				<div
					className='max-w-2xl mx-auto space-y-3'
					style={{
						backgroundImage: 'radial-gradient(circle, #8a8f99 0.1px, transparent 1px)',
						backgroundSize: '10px 10px',
					}}
				>
					{components.length === 0 ? (
						<div
							onDrop={(e) => handleDrop(e, 0)}
							onDragOver={(e) => handleDragOver(e, 0)}
							onDragLeave={() => setDragOverIndex(null)}
							className={`flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl transition-colors ${
								dragOverIndex === 0
									? 'border-primary bg-primary/5'
									: 'border-border bg-muted/20'
							}`}
						>
							<div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
								<MousePointerClick className='w-6 h-6 text-primary' />
							</div>
							<p className='text-sm font-semibold text-foreground mb-1'>
								Drop components here
							</p>
							<p className='text-xs text-muted-foreground text-center max-w-xs'>
								Drag any item from the left panel to start building
							</p>
						</div>
					) : (
						<>
							{components.map((comp, i) => (
								<div key={comp.id}>
									{/* Drop zone above */}
									<div
										onDrop={(e) => handleDrop(e, i)}
										onDragOver={(e) => handleDragOver(e, i)}
										onDragLeave={() => setDragOverIndex(null)}
										className={`h-2 rounded-full transition-all ${
											dragOverIndex === i ? 'h-8 bg-primary/20' : ''
										}`}
									/>

									{/* Component card */}
									<div
										draggable
										onDragStart={(e) => {
											e.dataTransfer.setData('moveIndex', String(i));
										}}
										onClick={() => onSelect(comp.id)}
										className={`group relative rounded-xl border bg-card p-4 cursor-pointer transition-all ${
											selectedId === comp.id
												? 'border-primary ring-1 ring-primary/20'
												: 'border-border hover:border-primary/40'
										}`}
									>
										{/* Drag handle */}
										<div className='absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity cursor-grab'>
											<GripVertical className='w-4 h-4 text-muted-foreground' />
										</div>

										{/* Delete */}
										<button
											onClick={(e) => {
												e.stopPropagation();
												onDelete(comp.id);
											}}
											className='absolute top-3 right-3 p-1 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10 transition-all'
										>
											<Trash2 className='w-3.5 h-3.5' />
										</button>

										{/* Label */}
										<input
											type='text'
											value={comp.label || ''}
											onChange={(e) =>
												onUpdate(comp.id, { label: e.target.value })
											}
											onClick={(e) => e.stopPropagation()}
											placeholder='Question text...'
											className='w-full text-sm font-medium text-foreground bg-transparent border-none outline-none focus:ring-0 pr-8 mb-2'
										/>

										{/* Type badge */}
										<span className='inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-full'>
											<Icon name={comp.icon} size={10} color='currentColor' />
											{comp.name}
										</span>

										{/* Inline preview for choice types */}
										{['multiple-choice', 'checkboxes', 'dropdown'].includes(
											comp.type,
										) &&
											Array.isArray(comp.options) && (
												<div className='mt-3 space-y-1.5'>
													{(comp.options as string[]).map((opt, oi) => (
														<div key={oi} className='flex items-center gap-2'>
															<div className='w-3.5 h-3.5 rounded-full border border-border shrink-0' />
															<input
																type='text'
																value={opt}
																onChange={(e) => {
																	const next = [
																		...(comp.options as string[]),
																	];
																	next[oi] = e.target.value;
																	onUpdate(comp.id, { options: next });
																}}
																onClick={(e) => e.stopPropagation()}
																className='text-xs text-muted-foreground bg-transparent border-none outline-none focus:ring-0 w-full'
																placeholder={`Option ${oi + 1}`}
															/>
														</div>
													))}
													<button
														onClick={(e) => {
															e.stopPropagation();
															onUpdate(comp.id, {
																options: [
																	...(comp.options as string[]),
																	`Option ${(comp.options as string[]).length + 1}`,
																],
															});
														}}
														className='text-xs text-primary hover:underline mt-1'
													>
														+ Add option
													</button>
												</div>
											)}
									</div>
								</div>
							))}

							{/* Drop zone at bottom */}
							<div
								onDrop={(e) => handleDrop(e, components.length)}
								onDragOver={(e) => handleDragOver(e, components.length)}
								onDragLeave={() => setDragOverIndex(null)}
								className={`h-2 rounded-full transition-all ${
									dragOverIndex === components.length ? 'h-10 bg-primary/20' : ''
								}`}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

// ── Main component ──────────────────────────────────────────────────────────

export default function DemoSurveyBuilder() {
	const navigate = useNavigate();

	const [survey, setSurvey] = useState<SurveyType>(initSurvey);
	const [history, setHistory] = useState<SurveyComponent[][]>([[]]);
	const [historyIndex, setHistoryIndex] = useState(0);
	const [selectedId, setSelectedId] = useState<string | null>(null);
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
			const data = JSON.parse(componentDataStr);
			const newComp: SurveyComponent = {
				...data,
				id: `comp-${Date.now()}`,
				label: `${data.name} Question`,
				required: false,
				options: ['multiple-choice', 'checkboxes', 'dropdown'].includes(data.type)
					? ['Option 1', 'Option 2', 'Option 3']
					: undefined,
			};
			const next = [...survey.components];
			next.splice(index, 0, newComp);
			setSurvey((c) => ({ ...c, components: next }));
			addToHistory(next);
		}
	};

	const handleUpdate = (id: string, updates: Partial<SurveyComponent>) => {
		const next = survey.components.map((c) =>
			c.id === id ? { ...c, ...updates } : c,
		);
		setSurvey((c) => ({ ...c, components: next }));
		addToHistory(next);
	};

	const handleDelete = (id: string) => {
		const next = survey.components.filter((c) => c.id !== id);
		setSurvey((c) => ({ ...c, components: next }));
		addToHistory(next);
		if (selectedId === id) setSelectedId(null);
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

	const proceedToAuth = (tab: 'signup' | 'signin') => {
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
						sign up to save and share — your work won't be lost.
					</p>
				</motion.div>

				{/* Builder frame */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
					className='rounded-2xl border border-border shadow-xl overflow-hidden bg-card flex flex-col'
					style={{ height: '720px' }}
				>
					{/* ── Toolbar ── */}
					<div className='flex items-center justify-between px-5 py-3 border-b border-border bg-card shrink-0'>
						<div className='flex flex-col gap-0.5 min-w-0 flex-1 mr-4'>
							<input
								type='text'
								value={survey.title}
								onChange={(e) =>
									setSurvey((c) => ({ ...c, title: e.target.value }))
								}
								placeholder='Survey title...'
								className='text-base font-semibold text-foreground bg-transparent border-none outline-none focus:ring-0 placeholder:text-muted-foreground/50 w-full max-w-xs'
							/>
							<input
								type='text'
								value={survey.description}
								onChange={(e) =>
									setSurvey((c) => ({ ...c, description: e.target.value }))
								}
								placeholder='Description...'
								className='text-xs text-muted-foreground bg-transparent border-none outline-none focus:ring-0 placeholder:text-muted-foreground/40 w-full max-w-xs'
							/>
						</div>

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
								onClick={() => setModalMode('share')}
								disabled={!survey.components.length}
								className='inline-flex items-center gap-1.5 text-xs font-medium border border-border px-3 py-1.5 rounded-lg hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
							>
								<Link2 className='w-3.5 h-3.5' />
								Get link
							</button>
							<button
								onClick={() => setModalMode('save')}
								disabled={!survey.components.length}
								className='inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
							>
								<Save className='w-3.5 h-3.5' />
								Save survey
							</button>
						</div>
					</div>

					{/* ── Hint bar ── */}
					{survey.components.length === 0 && (
						<div className='hidden md:flex items-center gap-2 px-5 py-2 bg-primary/5 border-b border-primary/10 text-xs text-primary/80 shrink-0'>
							<ArrowRight className='w-3.5 h-3.5 shrink-0' />
							Drag any component from the left panel — try "Multiple Choice" or
							"Star Rating"
						</div>
					)}

					{/* ── Body: palette + canvas ── */}
					<div className='flex flex-1 min-h-0'>
						{/* Palette */}
						<div className='hidden lg:block w-52 shrink-0 border-r border-border overflow-hidden'>
							<DemoPalette />
						</div>

						{/* Canvas */}
						<div className='flex-1 min-w-0 overflow-hidden'>
							<DemoCanvas
								components={survey.components}
								selectedId={selectedId}
								onSelect={setSelectedId}
								onUpdate={handleUpdate}
								onDelete={handleDelete}
								onDrop={handleDrop}
							/>
						</div>
					</div>

					{/* Mobile hint */}
					<div className='lg:hidden px-5 py-3 border-t border-border bg-muted/30 text-xs text-muted-foreground text-center shrink-0'>
						Use a desktop browser for the full drag-and-drop experience.
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
