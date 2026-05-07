'use client';

import { type FC, type ChangeEvent } from 'react';
import Icon from '../../../components/AppIcon';
import { Input } from '../../../components/ui/input';
import Select from '../../../components/ui/select';
import { Button } from '@/components/ui/button';
import RichTextInput from '@/components/RichTextInput';

interface PropertyPanelProps {
	component: SurveyComponent | null;
	onUpdate: (updates: Partial<SurveyComponent>) => void;
	onClose: () => void;
}

/**
 * PropertyPanel Refactor
 * Style: Modern SaaS (Linear/Vercel inspired)
 * Focus: Compact hierarchy, OKLCH colors, and refined micro-interactions.
 **/
const PropertyPanel: FC<PropertyPanelProps> = ({
	component,
	onUpdate,
	onClose,
}) => {
	if (!component) return null;

	const validationOptions = [
		{ value: 'none', label: 'No validation' },
		{ value: 'email', label: 'Email format' },
		{ value: 'url', label: 'URL format' },
		{ value: 'number', label: 'Numbers only' },
		{ value: 'phone', label: 'Phone number' },
	];

	return (
		<div className='fixed inset-0 z-modal lg:z-dropdown flex items-end justify-end transition-all duration-200'>
			{/* Backdrop */}
			<div
				className='absolute inset-0'
				onClick={onClose}
			/>

			{/* Panel Container */}
			<div className='relative bottom-0 right-0 w-full lg:mr-6 lg:mb-6 lg:w-80 max-h-[90vh] bg-card border border-border rounded-t-xl lg:rounded-xl shadow-xl overflow-hidden flex flex-col transition-all duration-200 animate-in slide-in-from-right-4'>
				{/* Header */}
				<div className='px-4 py-3 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2.5 overflow-hidden'>
							<div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0'>
								<Icon
									name={component?.icon || 'QuestionMarkCircle'}
									size={16}
								/>
							</div>
							<div className='flex flex-col truncate'>
								<h3 className='text-sm font-semibold tracking-tight text-foreground truncate'>
									Properties
								</h3>
								<span className='text-[10px] uppercase tracking-wider font-medium text-muted-foreground truncate'>
									{component?.name}
								</span>
							</div>
						</div>
						<button
							onClick={onClose}
							className='p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 active:scale-95'
						>
							<Icon
								name='X'
								size={16}
							/>
						</button>
					</div>
				</div>

				{/* Content Area */}
				<div className='flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar'>
					{/* Section: Basic Settings */}
					<section className='space-y-3'>
						<header className='flex items-center justify-between'>
							<h4 className='text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70'>
								Configuration
							</h4>
						</header>
						<div className='space-y-3'>
							<div className='space-y-1.5'>
								<label className='text-sm font-medium leading-none'>
									Question Label
								</label>
								<RichTextInput
									initialContent={component?.label}
									onChange={(html: string) => onUpdate({ label: html })}
									placeholder='What is your question?'
								/>
							</div>
							<Input
								label='Description'
								className='rounded-xl border-border bg-background'
								type='text'
								value={component?.description || ''}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									onUpdate({ description: e.target.value })
								}
								placeholder='Subtext or instructions...'
							/>
							<Input
								label='Placeholder'
								className='rounded-xl border-border bg-background'
								type='text'
								value={component?.placeholder || ''}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									onUpdate({ placeholder: e.target.value })
								}
								placeholder='Input hint...'
							/>
						</div>
					</section>

					{/* Section: Validation */}
					<section className='space-y-3'>
						<header className='flex items-center'>
							<h4 className='text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70'>
								Validation Rules
							</h4>
						</header>

						<div className='space-y-3'>
							<div className='flex items-center justify-between p-3 rounded-xl border border-border bg-background/50 hover:bg-muted/30 transition-colors group'>
								<label
									htmlFor='required-field-checkbox'
									className='text-sm font-medium cursor-pointer'
								>
									Required entry
								</label>
								<input
									type='checkbox'
									id='required-field-checkbox'
									className='w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer'
									checked={component?.required ?? false}
									onChange={(e) => onUpdate({ required: e.target.checked })}
								/>
							</div>

							{['text-input', 'email', 'number']?.includes(component?.type) && (
								<Select
									label='Input Format'
									options={validationOptions}
									value={component?.validation || 'none'}
									onChange={(value: any) => onUpdate({ validation: value })}
								/>
							)}

							{['text-input', 'email', 'number', 'date', 'time'].includes(
								component?.type,
							) && (
								<div className='grid grid-cols-2 gap-2'>
									<Input
										label={
											['date', 'time', 'number'].includes(component.type)
												? 'Min Val'
												: 'Min Len'
										}
										type={
											['date', 'time'].includes(component.type)
												? component.type
												: 'number'
										}
										value={component?.min || ''}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											onUpdate({
												min: ['date', 'time'].includes(component.type)
													? e.target.value || undefined
													: e.target.value === ''
														? undefined
														: +e.target.value,
											})
										}
										placeholder='Min'
									/>
									<Input
										label={
											['date', 'time', 'number'].includes(component.type)
												? 'Max Val'
												: 'Max Len'
										}
										type={
											['date', 'time'].includes(component.type)
												? component.type
												: 'number'
										}
										value={component?.max || ''}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											onUpdate({
												max: ['date', 'time'].includes(component.type)
													? e.target.value || undefined
													: e.target.value === ''
														? undefined
														: +e.target.value,
											})
										}
										placeholder='Max'
									/>
								</div>
							)}
						</div>
					</section>

					{/* Section: Options Management */}
					{['multiple-choice', 'checkboxes', 'dropdown', 'ranking'].includes(
						component?.type,
					) && (
						<section className='space-y-3'>
							<h4 className='text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70'>
								Answer Options
							</h4>
							<div className='space-y-2'>
								{component?.options?.map((option, optIndex) => (
									<div
										key={optIndex}
										className='group flex items-center gap-2 p-1 pl-2 bg-background border border-border rounded-lg focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-200'
									>
										<div
											className={`w-2 h-2 shrink-0 ${component?.type === 'multiple-choice' ? 'rounded-full' : 'rounded-sm'} bg-border group-focus-within:bg-primary transition-colors`}
										/>
										<input
											type='text'
											value={option}
											onChange={(e) => {
												if (!component?.options) return;
												const newOptions = [...component.options];
												newOptions[optIndex] = e.target.value;
												onUpdate({ options: newOptions });
											}}
											onClick={(e) => e.stopPropagation()}
											className='flex-1 text-xs bg-transparent border-none outline-none py-1.5'
											placeholder={`Option ${optIndex + 1}`}
										/>
										<button
											onClick={(e) => {
												e.stopPropagation();
												const newOptions = component?.options?.filter(
													(_, i) => i !== optIndex,
												);
												onUpdate({ options: newOptions });
											}}
											className='opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-destructive transition-all'
										>
											<Icon
												name='X'
												size={12}
											/>
										</button>
									</div>
								))}
								<Button
									variant='ghost'
									size='sm'
									onClick={(e) => {
										e.stopPropagation();
										onUpdate({
											options: [
												...(component?.options || []),
												`Option ${(component?.options?.length || 0) + 1}`,
											],
										});
									}}
									className='w-full mt-1 border border-dashed border-border rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 h-9'
								>
									<Icon
										name='Plus'
										size={14}
										className='mr-2'
									/>
									<span className='text-xs'>Add Option</span>
								</Button>
							</div>
						</section>
					)}
				</div>

				{/* Footer */}
				<div className='p-4 border-t border-border bg-card/80 backdrop-blur-md'>
					<button
						onClick={onClose}
						className='w-full flex items-center justify-center h-10 bg-primary text-primary-foreground rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:bg-primary/90 active:scale-95 transition-all duration-200'
					>
						Apply Changes
					</button>
				</div>
			</div>
		</div>
	);
};

export default PropertyPanel;
