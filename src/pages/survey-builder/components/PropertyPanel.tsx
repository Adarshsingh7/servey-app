import { type FC, type ChangeEvent } from 'react';
import Icon from '../../../components/AppIcon';
import { Input } from '../../../components/ui/input';
import Select from '../../../components/ui/select';
import { Button } from '@/components/ui/button';

interface PropertyPanelProps {
	component: SurveyComponent | null;
	onUpdate: (updates: Partial<SurveyComponent>) => void;
	onClose: () => void;
}

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

	const logicOptions = [
		{ value: 'none', label: 'No logic' },
		{ value: 'show-if', label: 'Show if...' },
		{ value: 'hide-if', label: 'Hide if...' },
		{ value: 'skip-to', label: 'Skip to...' },
	];

	return (
		<div className='fixed inset-0 z-modal lg:z-dropdown'>
			<div
				className='absolute inset-0 bg-background lg:bg-transparent'
				onClick={onClose}
			/>
			<div className='absolute bottom-0 left-0 right-0 lg:bottom-auto lg:left-auto lg:top-20 lg:right-6 w-full lg:w-96 max-h-[85vh] bg-card border border-border rounded-t-xl lg:rounded-lg shadow-elevation-5 overflow-hidden flex flex-col'>
				{/* Header */}
				<div className='p-4 lg:p-6 border-b border-border'>
					<div className='flex items-center justify-between mb-2'>
						<div className='flex items-center gap-2'>
							<Icon
								name={component?.icon || 'QuestionMarkCircle'}
								size={20}
								color='var(--color-primary)'
							/>
							<h3 className='text-base lg:text-lg font-heading font-semibold text-foreground'>
								Component Properties
							</h3>
						</div>
						<button
							onClick={onClose}
							className='p-2 rounded-lg hover:bg-muted transition-smooth'
						>
							<Icon
								name='X'
								size={20}
							/>
						</button>
					</div>
					<p className='text-xs lg:text-sm text-muted-foreground'>
						{component?.name}
					</p>
				</div>

				{/* Content */}
				<div className='flex-1 overflow-y-auto p-4 lg:p-6 max-h-screen space-y-4 lg:space-y-6'>
					{/* Basic Settings */}
					<div>
						<h4 className='text-sm font-heading font-semibold text-foreground mb-3 lg:mb-4'>
							Basic Settings
						</h4>
						<div className='space-y-3 lg:space-y-4'>
							<Input
								label='Question Label'
								type='text'
								value={component?.label}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									onUpdate({ label: e.target.value })
								}
								placeholder='Enter question text'
							/>
							<Input
								label='Description'
								type='text'
								value={component?.description || ''}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									onUpdate({ description: e.target.value })
								}
								placeholder='Add helpful description (optional)'
							/>
							<Input
								label='Placeholder'
								type='text'
								value={component?.placeholder || ''}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									onUpdate({ placeholder: e.target.value })
								}
								placeholder='Enter placeholder text'
							/>
						</div>
					</div>

					{/* Validation */}
					<div>
						<h4 className='text-sm font-heading font-semibold text-foreground mb-3 lg:mb-4'>
							Validation
						</h4>
						<div className='space-y-3 lg:space-y-4'>
							<div className='flex gap-2'>
								<input
									type='checkbox'
									id='required-field-checkbox'
									checked={component?.required ?? false}
									onChange={(e) => onUpdate({ required: e.target.checked })}
								/>
								<label htmlFor='required-field-checkbox'>Required field</label>
							</div>
							{['text-input', 'email', 'number']?.includes(component?.type) && (
								<Select
									label='Validation Type'
									options={validationOptions}
									value={component?.validation || 'none'}
									onChange={(value: TextValidation) =>
										onUpdate({ validation: value })
									}
								/>
							)}
							{['text-input', 'email', 'number'].includes(component?.type) && (
								<>
									<Input
										label='Minimum Length'
										type='number'
										value={component?.min || ''}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											onUpdate({ min: +e.target.value })
										}
										placeholder={component.min?.toString() || 'No minimum'}
									/>
									<Input
										label='Maximum Length'
										type='number'
										value={component?.max || ''}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											onUpdate({ max: +e.target.value })
										}
										placeholder={component.max?.toString() || 'Unlimited'}
									/>
								</>
							)}
							{[
								'multiple-choice',
								'checkboxes',
								'dropdown',
								'ranking',
							].includes(component?.type) && (
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
													const newOptions = [...(component?.options || [])];
													newOptions[optIndex] = e?.target?.value;
													onUpdate({
														options: newOptions,
													});
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
													onUpdate({
														options: newOptions,
													});
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
											onUpdate({
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
							)}
						</div>
					</div>

					{/* Conditional Logic */}
					{/* <div>
						<h4 className='text-sm font-heading font-semibold text-foreground mb-3 lg:mb-4'>
							Conditional Logic
						</h4>
						<div className='space-y-3 lg:space-y-4'>
							<Select
								label='Logic Type'
								description='Control when this question appears'
								options={logicOptions}
								value={component?.logic || 'none'}
								onChange={(value: string) => onUpdate({ logic: value })}
							/>
							{component?.logic && component?.logic !== 'none' && (
								<div className='p-3 lg:p-4 bg-muted rounded-lg'>
									<p className='text-xs lg:text-sm text-muted-foreground'>
										Configure logic conditions in the advanced settings panel
									</p>
								</div>
							)}
						</div>
					</div> */}

					{/* Display Options */}
					{/* <div>
						<h4 className='text-sm font-heading font-semibold text-foreground mb-3 lg:mb-4'>
							Display Options
						</h4>
						<div className='space-y-3 lg:space-y-4'>
							<Checkbox
								label='Show question number'
								checked={component?.showNumber !== false}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									onUpdate({ showNumber: e.target.checked })
								}
							/>
							<Checkbox
								label='Allow comments'
								description='Add optional comment field'
								checked={component?.allowComments || false}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									onUpdate({ allowComments: e.target.checked })
								}
							/>
							{['multiple-choice', 'checkboxes']?.includes(component?.type) && (
								<Checkbox
									label='Randomize options'
									description='Show options in random order'
									checked={component?.randomize || false}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										onUpdate({ randomize: e.target.checked })
									}
								/>
							)}
						</div>
					</div> */}
				</div>

				{/* Footer */}
				<div className='p-4 lg:p-6 border-t border-border'>
					<button
						onClick={onClose}
						className='w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth'
					>
						Apply Changes
					</button>
				</div>
			</div>
		</div>
	);
};

export default PropertyPanel;
