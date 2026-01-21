import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Button } from '../../../components/ui/button';

const FloatingToolbar = ({
	onSave,
	onUndo,
	onRedo,
	onTheme,
	canUndo,
	canRedo,
	isSaving,
}) => {
	const [showThemePanel, setShowThemePanel] = useState(false);

	const themeColors = [
		{ name: 'Blue', value: '#2563EB', bg: 'bg-blue-600' },
		{ name: 'Purple', value: '#9333EA', bg: 'bg-purple-600' },
		{ name: 'Green', value: '#059669', bg: 'bg-emerald-600' },
		{ name: 'Orange', value: '#F97316', bg: 'bg-orange-500' },
		{ name: 'Red', value: '#DC2626', bg: 'bg-red-600' },
		{ name: 'Pink', value: '#EC4899', bg: 'bg-pink-500' },
	];

	return (
		<>
			{/* Desktop Toolbar */}
			<div className='hidden lg:flex fixed top-20 right-6 z-sticky flex-col gap-2 bg-card border border-border rounded-lg shadow-elevation-4 p-2'>
				<Button
					variant='ghost'
					size='icon'
					// iconName='Save'
					// iconSize={20}
					onClick={onSave}
					disabled={isSaving}
					title='Save survey'
				>
					<Icon
						name='Save'
						size={20}
					/>
				</Button>
				<div className='h-px bg-border' />
				<Button
					variant='ghost'
					size='icon'
					// iconName='Undo'
					// iconSize={20}
					onClick={onUndo}
					disabled={!canUndo}
					title='Undo'
				>
					<Icon
						name='Undo'
						size={20}
					/>
				</Button>
				<Button
					variant='ghost'
					size='icon'
					// iconName='Redo'
					// iconSize={20}
					onClick={onRedo}
					disabled={!canRedo}
					title='Redo'
				>
					<Icon
						name='Redo'
						size={20}
					/>
				</Button>
				<div className='h-px bg-border' />
				<Button
					variant='ghost'
					size='icon'
					// iconName='Palette'
					// iconSize={20}
					onClick={() => setShowThemePanel(!showThemePanel)}
					title='Theme'
				>
					<Icon
						name='Palette'
						size={20}
					/>
				</Button>
			</div>
			{/* Mobile Toolbar */}
			<div className='lg:hidden fixed bottom-1 left-4 right-4 z-sticky'>
				<div className='bg-card border border-border rounded-lg shadow-elevation-4 p-3'>
					<div className='flex items-center justify-between gap-2'>
						<Button
							variant='ghost'
							size='sm'
							// iconName='Save'
							// iconPosition='left'
							// iconSize={18}
							onClick={onSave}
							disabled={isSaving}
						>
							<Icon
								name='Save'
								size={20}
							/>
							Save
						</Button>
						<div className='flex items-center gap-1'>
							<Button
								variant='ghost'
								size='icon'
								// iconName='Undo'
								// iconSize={18}
								onClick={onUndo}
								disabled={!canUndo}
							>
								<Icon
									name='Undo'
									size={20}
								/>
							</Button>
							<Button
								variant='ghost'
								size='icon'
								// iconName='Redo'
								// iconSize={18}
								onClick={onRedo}
								disabled={!canRedo}
							>
								<Icon
									name='Redo'
									size={20}
								/>
							</Button>
						</div>
						<Button
							variant='ghost'
							size='sm'
							// iconName='Palette'
							// iconPosition='left'
							// iconSize={18}
							onClick={() => setShowThemePanel(!showThemePanel)}
						>
							Theme
							<Icon
								name='Palette'
								size={20}
							/>
						</Button>
					</div>
				</div>
			</div>
			{/* Theme Panel */}
			{showThemePanel && (
				<div className='fixed inset-0 z-modal lg:z-dropdown'>
					<div
						className='absolute inset-0 bg-background lg:bg-transparent'
						onClick={() => setShowThemePanel(false)}
					/>
					<div className='absolute bottom-0 left-0 right-0 lg:bottom-auto lg:left-auto lg:top-20 lg:right-24 w-full lg:w-80 bg-card border border-border rounded-t-xl lg:rounded-lg shadow-elevation-5 p-4 lg:p-6'>
						<div className='flex items-center justify-between mb-4 lg:mb-6'>
							<div className='flex items-center gap-2'>
								<Icon
									name='Palette'
									size={20}
									color='var(--color-primary)'
								/>
								<h3 className='text-base lg:text-lg font-heading font-semibold text-foreground'>
									Survey Theme
								</h3>
							</div>
							<button
								onClick={() => setShowThemePanel(false)}
								className='p-2 rounded-lg hover:bg-muted transition-smooth'
							>
								<Icon
									name='X'
									size={20}
								/>
							</button>
						</div>

						<div className='space-y-4 lg:space-y-6'>
							{/* Primary Color */}
							<div>
								<label className='block text-sm font-medium text-foreground mb-3'>
									Primary Color
								</label>
								<div className='grid grid-cols-3 gap-2 lg:gap-3'>
									{themeColors?.map((color) => (
										<button
											key={color?.value}
											onClick={() => onTheme({ primaryColor: color?.value })}
											className='flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary transition-smooth'
										>
											<div
												className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full ${color?.bg}`}
											/>
											<span className='text-xs text-foreground'>
												{color?.name}
											</span>
										</button>
									))}
								</div>
							</div>

							{/* Font Style */}
							<div>
								<label className='block text-sm font-medium text-foreground mb-3'>
									Font Style
								</label>
								<div className='space-y-2'>
									{['Modern', 'Classic', 'Playful']?.map((font) => (
										<button
											key={font}
											onClick={() =>
												onTheme({ fontStyle: font?.toLowerCase() })
											}
											className='w-full p-3 text-left rounded-lg border border-border hover:border-primary transition-smooth'
										>
											<span className='text-sm font-medium text-foreground'>
												{font}
											</span>
										</button>
									))}
								</div>
							</div>

							{/* Background Style */}
							<div>
								<label className='block text-sm font-medium text-foreground mb-3'>
									Background
								</label>
								<div className='grid grid-cols-2 gap-2 lg:gap-3'>
									<button
										onClick={() => onTheme({ background: 'light' })}
										className='p-4 rounded-lg border border-border hover:border-primary transition-smooth bg-white'
									>
										<span className='text-sm font-medium text-gray-900'>
											Light
										</span>
									</button>
									<button
										onClick={() => onTheme({ background: 'dark' })}
										className='p-4 rounded-lg border border-border hover:border-primary transition-smooth bg-gray-900'
									>
										<span className='text-sm font-medium text-white'>Dark</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FloatingToolbar;
