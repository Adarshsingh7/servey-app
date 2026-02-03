/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable no-unsafe-optional-chaining */

import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Button } from '../../../components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { surveyQueryId } from '@/queries/survey.query';

interface CanvasWorkspaceProps {
	components: SurveyComponent[];
	selectedComponent: SurveyComponent | null;
	onSelectComponent: (component: SurveyComponent) => void;
	onUpdateComponent: (id: string, updates: Partial<SurveyComponent>) => void;
	onDeleteComponent: (id: string) => void;
	onDrop: (e: React.DragEvent, index: number) => void;
	onDragOver: (e: React.DragEvent) => void;
}

const CanvasWorkspace: React.FC<CanvasWorkspaceProps> = ({
	components,
	selectedComponent,
	onSelectComponent,
	onUpdateComponent,
	onDeleteComponent,
	onDrop,
	onDragOver,
}) => {
	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

	const { data } = useQuery(surveyQueryId('69808a8757698c73140ad643'));

	const handleDrop = (e: React.DragEvent, index: number): void => {
		e?.preventDefault();
		setDragOverIndex(null);
		onDrop(e, index);
	};

	const handleDragOver = (e: React.DragEvent, index: number): void => {
		e?.preventDefault();
		setDragOverIndex(index);
		onDragOver(e);
	};

	const handleDragLeave = (): void => {
		setDragOverIndex(null);
	};

	return (
		<div className='h-screen flex flex-col bg-background'>
			{/* Canvas Header */}
			<div className='p-4 lg:p-6 border-b border-border bg-card'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-lg lg:text-xl font-heading font-semibold text-foreground mb-1'>
							Survey Canvas
						</h2>
						<p className='text-xs lg:text-sm text-muted-foreground'>
							{components?.length} component
							{components?.length !== 1 ? 's' : ''} added
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<Button
							variant='outline'
							size='sm'
							onClick={() =>
								window.open(`/preview/${data?.data?._id}`, '_blank')
							}
							className='hidden lg:flex'
						>
							Preview
						</Button>
					</div>
				</div>
			</div>
			{/* Canvas Area */}
			<div className='flex-1 overflow-y-auto p-4 lg:p-6 max-h-screen'>
				<div className='max-w-3xl mx-auto space-y-4 lg:space-y-6'>
					{components?.length === 0 ? (
						<div
							onDrop={(e) => handleDrop(e, 0)}
							onDragOver={(e) => handleDragOver(e, 0)}
							onDragLeave={handleDragLeave}
							className='flex flex-col items-center justify-center py-16 lg:py-24 px-4 border-2 border-dashed border-border rounded-lg bg-muted/30'
						>
							<div className='w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 lg:mb-6'>
								<Icon
									name='MousePointerClick'
									size={32}
									color='var(--color-primary)'
								/>
							</div>
							<h3 className='text-base lg:text-lg font-heading font-semibold text-foreground mb-2'>
								Start Building Your Survey
							</h3>
							<p className='text-sm lg:text-base text-muted-foreground text-center max-w-md'>
								Drag and drop components from the left panel to begin creating
								your survey
							</p>
						</div>
					) : (
						<>
							{components?.map((component) => (
								<React.Fragment key={component?.id}>
									<div
										onDrop={(e) => handleDrop(e, components.indexOf(component))}
										onDragOver={(e) =>
											handleDragOver(e, components.indexOf(component))
										}
										onDragLeave={handleDragLeave}
										className={`
						 h-10
						 transition-smooth bg-[radial-gradient(circle,#8a8f99_0.1px,transparent_1px)] bg-size-[10px_10px]
						${dragOverIndex === components.indexOf(component) ? 'bg-primary/20 h-12' : ''}
						`}
									/>
									{renderComponent(
										component,
										selectedComponent,
										onSelectComponent,
										onUpdateComponent,
										onDeleteComponent,
									)}
								</React.Fragment>
							))}
							<div
								onDrop={(e) => handleDrop(e, components?.length)}
								onDragOver={(e) => handleDragOver(e, components?.length)}
								onDragLeave={handleDragLeave}
								className={`
					h-2 transition-smooth
					${dragOverIndex === components?.length ? 'bg-primary/20 h-12' : ''}
					`}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CanvasWorkspace;
// ============================================================================
// MISSING COMPONENT RENDERERS
// Add these to your CanvasWorkspace.tsx file
// ============================================================================

// Dropdown Component Renderer
const renderDropdown = (
	component: SurveyComponent,
	onUpdateComponent: (id: string, updates: Partial<SurveyComponent>) => void,
) => (
	<div className='space-y-3'>
		<select
			disabled
			className='w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-muted border border-border rounded-lg text-sm text-muted-foreground'
		>
			<option>Select an option</option>
			{component?.options?.map((opt, i) => (
				<option key={i}>{opt}</option>
			))}
		</select>
		<div className='space-y-2 pt-2 border-t border-border'>
			<p className='text-xs text-muted-foreground font-medium'>Edit Options:</p>
			{component?.options?.map((option, optIndex) => (
				<div
					key={optIndex}
					className='flex items-center gap-2 lg:gap-3'
				>
					<Icon
						name='GripVertical'
						size={14}
						color='var(--color-muted-foreground)'
					/>
					<input
						type='text'
						value={option}
						onChange={(e) => {
							const newOptions = [...component?.options!];
							newOptions[optIndex] = e?.target?.value;
							onUpdateComponent(component?.id, { options: newOptions });
						}}
						onClick={(e) => e?.stopPropagation()}
						className='flex-1 text-sm bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1'
						placeholder={`Option ${optIndex + 1}`}
					/>
					<button
						onClick={(e) => {
							e?.stopPropagation();
							const newOptions = component?.options?.filter(
								(_, i) => i !== optIndex,
							);
							onUpdateComponent(component?.id, { options: newOptions });
						}}
						className='p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth'
					>
						<Icon
							name='X'
							size={14}
						/>
					</button>
				</div>
			))}
			<Button
				variant='ghost'
				size='sm'
				// iconName='Plus'
				// iconPosition='left'
				// iconSize={14}
				onClick={(e) => {
					e?.stopPropagation();
					onUpdateComponent(component?.id, {
						options: [
							...(component?.options || []),
							`Option ${(component?.options?.length || 0) + 1}`,
						],
					});
				}}
				className='mt-2'
			>
				<Icon
					name='Plus'
					size={14}
				/>
				Add Option
			</Button>
		</div>
	</div>
);

// Yes/No Component Renderer
const renderYesNo = (_component: SurveyComponent) => (
	<div className='flex gap-4'>
		<div className='flex items-center gap-2'>
			<div className='w-4 h-4 lg:w-5 lg:h-5 border-2 border-border rounded-full shrink-0' />
			<span className='text-sm text-muted-foreground'>Yes</span>
		</div>
		<div className='flex items-center gap-2'>
			<div className='w-4 h-4 lg:w-5 lg:h-5 border-2 border-border rounded-full shrink-0' />
			<span className='text-sm text-muted-foreground'>No</span>
		</div>
	</div>
);

// NPS Score Renderer
const renderNPS = (_component: SurveyComponent) => (
	<div className='space-y-3'>
		<div className='grid grid-cols-11 gap-1'>
			{Array.from({ length: 11 }, (_, i) => i).map((num) => (
				<button
					key={num}
					disabled
					className='h-10 lg:h-12 rounded-lg border border-border text-xs lg:text-sm font-medium text-muted-foreground hover:border-primary/50 transition-smooth'
				>
					{num}
				</button>
			))}
		</div>
		<div className='flex justify-between text-xs text-muted-foreground'>
			<span>Not at all likely</span>
			<span>Extremely likely</span>
		</div>
		<div className='grid grid-cols-3 gap-2 text-xs pt-2'>
			<div className='px-2 py-1 bg-red-50 rounded border border-red-200 text-red-700 text-center'>
				0-6 Detractors
			</div>
			<div className='px-2 py-1 bg-yellow-50 rounded border border-yellow-200 text-yellow-700 text-center'>
				7-8 Passives
			</div>
			<div className='px-2 py-1 bg-green-50 rounded border border-green-200 text-green-700 text-center'>
				9-10 Promoters
			</div>
		</div>
	</div>
);

// Emoji Rating Renderer
const renderEmojiRating = (_component: SurveyComponent) => {
	const emojis = ['😞', '😕', '😐', '🙂', '😄'];
	return (
		<div className='flex gap-4 justify-center py-2'>
			{emojis.map((emoji, i) => (
				<span
					key={i}
					className='text-3xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer'
				>
					{emoji}
				</span>
			))}
		</div>
	);
};

// Date Picker Renderer
const renderDatePicker = (_component: SurveyComponent) => (
	<input
		type='date'
		disabled
		className='w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-muted border border-border rounded-lg text-sm text-muted-foreground'
	/>
);

// Time Picker Renderer
const renderTimePicker = (_component: SurveyComponent) => (
	<input
		type='time'
		disabled
		className='w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-muted border border-border rounded-lg text-sm text-muted-foreground'
	/>
);

// File Upload Renderer
const renderFileUpload = (_component: SurveyComponent) => (
	<div className='border-2 border-dashed border-border rounded-lg p-6 lg:p-8 text-center bg-muted/30 hover:border-primary/50 transition-smooth'>
		<Icon
			name='Upload'
			size={32}
			color='var(--color-muted-foreground)'
			className='mx-auto mb-2'
		/>
		<p className='text-sm text-muted-foreground mb-1'>
			Click to upload or drag and drop
		</p>
		<p className='text-xs text-muted-foreground'>PDF, PNG, JPG up to 10MB</p>
	</div>
);

// Matrix Renderer
const renderMatrix = (
	_component: SurveyComponent,
	_onUpdateComponent: (id: string, updates: Partial<SurveyComponent>) => void,
) => {
	return null;
};

// Ranking Renderer
const renderRanking = (
	component: SurveyComponent,
	onUpdateComponent: (id: string, updates: Partial<SurveyComponent>) => void,
) => (
	<div className='space-y-2'>
		{component?.options?.map((option, optIndex) => (
			<div
				key={optIndex}
				className='flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-muted/30 border border-border rounded-lg hover:border-primary/50 transition-smooth'
			>
				<Icon
					name='GripVertical'
					size={16}
					color='var(--color-muted-foreground)'
				/>
				<span className='text-sm font-medium text-muted-foreground w-6'>
					{optIndex + 1}
				</span>
				<input
					type='text'
					value={option}
					onChange={(e) => {
						const newOptions = [...component?.options!];
						newOptions[optIndex] = e?.target?.value;
						onUpdateComponent(component?.id, { options: newOptions });
					}}
					onClick={(e) => e?.stopPropagation()}
					className='flex-1 text-sm bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1'
					placeholder={`Item ${optIndex + 1}`}
				/>
				<button
					onClick={(e) => {
						e?.stopPropagation();
						const newOptions = component?.options?.filter(
							(_, i) => i !== optIndex,
						);
						onUpdateComponent(component?.id, { options: newOptions });
					}}
					className='p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth'
				>
					<Icon
						name='X'
						size={14}
					/>
				</button>
			</div>
		))}
		<Button
			variant='ghost'
			size='sm'
			// iconName='Plus'
			// iconPosition='left'
			// iconSize={14}
			onClick={(e) => {
				e?.stopPropagation();
				onUpdateComponent(component?.id, {
					options: [
						...(component?.options || []),
						`Item ${(component?.options?.length || 0) + 1}`,
					],
				});
			}}
			className='mt-2'
		>
			<Icon
				name='Plus'
				size={14}
			/>
			Add Item
		</Button>
	</div>
);

// Heading Renderer
const renderHeading = (
	component: SurveyComponent,
	onUpdateComponent: (id: string, updates: Partial<SurveyComponent>) => void,
) => (
	<input
		type='text'
		value={component?.label || 'Heading Text'}
		onChange={(e) =>
			onUpdateComponent(component?.id, { label: e?.target?.value })
		}
		onClick={(e) => e?.stopPropagation()}
		className='w-full text-xl lg:text-2xl font-bold text-foreground bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1'
		placeholder='Enter heading'
	/>
);

// Paragraph Renderer
const renderParagraph = (
	component: SurveyComponent,
	onUpdateComponent: (id: string, updates: Partial<SurveyComponent>) => void,
) => (
	<textarea
		value={component?.label || 'Paragraph text goes here...'}
		onChange={(e) =>
			onUpdateComponent(component?.id, { label: e?.target?.value })
		}
		onClick={(e) => e?.stopPropagation()}
		rows={3}
		className='w-full text-sm text-muted-foreground bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1 resize-none'
		placeholder='Enter paragraph text'
	/>
);

// Image Renderer
const renderImage = (
	component: SurveyComponent,
	onUpdateComponent: (id: string, updates: Partial<SurveyComponent>) => void,
) => (
	<div className='space-y-2'>
		{component?.imageUrl ? (
			<img
				src={component.imageUrl}
				alt='Survey content'
				className='w-full max-h-54 object-contain h-auto rounded-lg border border-border'
			/>
		) : (
			<div className='w-full h-48 bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center'>
				<div className='text-center'>
					<Icon
						name='Image'
						size={32}
						color='var(--color-muted-foreground)'
						className='mx-auto mb-2'
					/>
					<p className='text-sm text-muted-foreground'>Image preview</p>
				</div>
			</div>
		)}
		<input
			type='text'
			value={component?.imageUrl || ''}
			onChange={(e) =>
				onUpdateComponent(component?.id, { imageUrl: e?.target?.value })
			}
			onClick={(e) => e?.stopPropagation()}
			className='w-full px-3 py-2 text-xs border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-background'
			placeholder='Enter image URL'
		/>
	</div>
);

// Divider Renderer
const renderDivider = (_component: SurveyComponent) => (
	<hr className='border-border' />
);

const renderComponent = (
	component: SurveyComponent,
	selectedComponent: SurveyComponent | null,
	onSelectComponent: (component: SurveyComponent) => void,
	onUpdateComponent: (id: string, updates: Partial<SurveyComponent>) => void,
	onDeleteComponent: (id: string) => void,
): React.ReactNode => {
	const isSelected = selectedComponent?.id === component?.id;
	const isContentOnly = ['heading', 'paragraph', 'image', 'divider'].includes(
		component?.type,
	);

	// Render content based on component type
	const renderContent = () => {
		switch (component?.type) {
			case 'text-input':
			case 'email':
			case 'phone':
			case 'number':
				return (
					<input
						type='text'
						placeholder={
							component.placeholder
								? component.placeholder
								: 'Answer will appear here'
						}
						disabled
						className='w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-muted border border-border rounded-lg text-sm text-muted-foreground'
					/>
				);

			case 'textarea':
				return (
					<textarea
						placeholder={
							component.placeholder
								? component.placeholder
								: 'Answer will appear here'
						}
						disabled
						rows={3}
						className='w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-muted border border-border rounded-lg text-sm text-muted-foreground resize-none'
					/>
				);

			case 'dropdown':
				return renderDropdown(component, onUpdateComponent);

			case 'multiple-choice':
			case 'checkboxes':
				return (
					<div className='space-y-2'>
						{component?.options?.map((option, optIndex) => (
							<div
								key={optIndex}
								className='flex items-center gap-2 lg:gap-3'
							>
								<div
									className={`w-4 h-4 lg:w-5 lg:h-5 border-2 border-border shrink-0 ${
										component?.type === 'multiple-choice'
											? 'rounded-full'
											: 'rounded'
									}`}
								/>
								<input
									type='text'
									value={option}
									onChange={(e) => {
										if (!component?.options) return;
										const newOptions = [...component?.options];
										newOptions[optIndex] = e?.target?.value;
										onUpdateComponent(component?.id, { options: newOptions });
									}}
									onClick={(e) => e?.stopPropagation()}
									className='flex-1 text-sm bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1'
									placeholder={`Option ${optIndex + 1}`}
								/>
								<button
									onClick={(e) => {
										e?.stopPropagation();
										const newOptions = component?.options?.filter(
											(_, i) => i !== optIndex,
										);
										onUpdateComponent(component?.id, { options: newOptions });
									}}
									className='p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth'
								>
									<Icon
										name='X'
										size={14}
									/>
								</button>
							</div>
						))}
						<Button
							variant='ghost'
							size='sm'
							onClick={(e) => {
								e?.stopPropagation();
								onUpdateComponent(component?.id, {
									options: [
										...(component?.options || []),
										`Option ${(component?.options?.length || 0) + 1}`,
									],
								});
							}}
							className='mt-2'
						>
							<Icon
								name='Plus'
								size={14}
							/>
							Add Option
						</Button>
					</div>
				);

			case 'yes-no':
				return renderYesNo(component);

			case 'star-rating':
				return (
					<div className='flex items-center gap-1 lg:gap-2'>
						{[1, 2, 3, 4, 5]?.map((star) => (
							<Icon
								key={star}
								name='Star'
								size={24}
								color='var(--color-muted)'
							/>
						))}
					</div>
				);

			case 'scale':
				return (
					<div className='space-y-3'>
						<div className='flex items-center justify-between gap-1'>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((num) => (
								<button
									key={num}
									disabled
									className='flex-1 h-10 lg:h-12 rounded-lg border border-border text-sm font-medium text-muted-foreground'
								>
									{num}
								</button>
							))}
						</div>
						<div className='flex items-center gap-2 text-xs text-muted-foreground'>
							<input
								type='number'
								value={component?.min || 1}
								onChange={(e) =>
									onUpdateComponent(component?.id, {
										min: parseInt(e.target.value) || 1,
									})
								}
								onClick={(e) => e?.stopPropagation()}
								className='w-16 px-2 py-1 border border-border rounded text-center bg-background'
								placeholder='Min'
							/>
							<span>to</span>
							<input
								type='number'
								value={component?.max || 10}
								onChange={(e) =>
									onUpdateComponent(component?.id, {
										max: parseInt(e.target.value) || 10,
									})
								}
								onClick={(e) => e?.stopPropagation()}
								className='w-16 px-2 py-1 border border-border rounded text-center bg-background'
								placeholder='Max'
							/>
						</div>
					</div>
				);

			case 'nps':
				return renderNPS(component);

			case 'emoji':
				return renderEmojiRating(component);

			case 'date':
				return renderDatePicker(component);

			case 'time':
				return renderTimePicker(component);

			case 'file-upload':
				return renderFileUpload(component);

			case 'matrix':
				return renderMatrix(component, onUpdateComponent);

			case 'ranking':
				return renderRanking(component, onUpdateComponent);

			case 'heading':
				return renderHeading(component, onUpdateComponent);

			case 'paragraph':
				return renderParagraph(component, onUpdateComponent);

			case 'image':
				return renderImage(component, onUpdateComponent);

			case 'divider':
				return renderDivider(component);

			default:
				return null;
		}
	};

	return (
		<div
			key={component?.id}
			onClick={() => onSelectComponent(component)}
			className={`
				relative p-4 lg:p-6 bg-card border-2 rounded-lg transition-smooth cursor-pointer
				${isSelected ? 'border-primary shadow-elevation-3' : 'border-border hover:border-primary/50 hover:shadow-elevation-2'}
			`}
		>
			{/* Component Header - Only for non-content components */}
			{!isContentOnly && (
				<div className='flex items-start justify-between mb-3 lg:mb-4'>
					<div className='flex items-center gap-2 lg:gap-3 flex-1 min-w-0'>
						<div className='flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 text-primary shrink-0'>
							<Icon
								name={component?.icon}
								size={18}
							/>
						</div>
						<div className='flex-1 min-w-0'>
							<input
								type='text'
								value={component?.label || ''}
								onChange={(e) =>
									onUpdateComponent(component?.id, { label: e?.target?.value })
								}
								onClick={(e) => e?.stopPropagation()}
								className='w-full text-sm lg:text-base font-medium text-foreground bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1'
								placeholder='Question text'
							/>
							{component?.required && (
								<span className='text-xs text-destructive ml-2'>*</span>
							)}
						</div>
					</div>
					<div className='flex items-center gap-1 lg:gap-2 shrink-0'>
						<button
							onClick={(e) => {
								e?.stopPropagation();
								onUpdateComponent(component?.id, {
									required: !component?.required,
								});
							}}
							className={`
								p-1.5 lg:p-2 rounded-lg transition-smooth
								${component?.required ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground hover:text-foreground'}
							`}
							title={component?.required ? 'Required' : 'Optional'}
						>
							<Icon
								name='Asterisk'
								size={14}
							/>
						</button>
						<button
							onClick={(e) => {
								e?.stopPropagation();
								onDeleteComponent(component?.id);
							}}
							className='p-1.5 lg:p-2 rounded-lg bg-muted text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth'
						>
							<Icon
								name='Trash2'
								size={14}
							/>
						</button>
					</div>
				</div>
			)}

			{/* Component Description - Only for non-content components */}
			{!isContentOnly && (
				<div className='space-y-2 lg:space-y-3 mb-3'>
					<input
						type='text'
						value={component?.description || ''}
						onChange={(e) =>
							onUpdateComponent(component?.id, {
								description: e?.target?.value,
							})
						}
						onClick={(e) => e?.stopPropagation()}
						className='w-full text-xs lg:text-sm text-muted-foreground bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1'
						placeholder='Add description (optional)'
					/>
				</div>
			)}

			{/* Component Content */}
			{renderContent()}

			{/* Delete button for content-only components */}
			{isContentOnly && (
				<button
					onClick={(e) => {
						e?.stopPropagation();
						onDeleteComponent(component?.id);
					}}
					className='absolute top-2 right-2 p-1.5 lg:p-2 rounded-lg bg-muted text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth'
				>
					<Icon
						name='Trash2'
						size={14}
					/>
				</button>
			)}

			{/* Selection Indicator */}
			{/* {isSelected && (
				<div className='absolute -top-1 -right-1 w-6 h-6 lg:w-8 lg:h-8 bg-primary rounded-full flex items-center justify-center shadow-elevation-3'>
					<Icon
						name='Check'
						size={14}
						color='var(--color-primary-foreground)'
					/>
				</div>
			)} */}
		</div>
	);
};
