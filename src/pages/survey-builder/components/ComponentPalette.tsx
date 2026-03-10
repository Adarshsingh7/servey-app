import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { GripVertical } from 'lucide-react';

// interface SurveyComponent {
// 	id: string;
// 	type: string;
// 	name: string;
// 	icon: string;
// 	description: string;
// }

interface Category {
	id: string;
	name: string;
	icon: string;
	components: SurveyComponent[];
}

interface ComponentPaletteProps {
	onDragStart: (component: SurveyComponent) => void;
}

const ComponentPalette = ({ onDragStart }: ComponentPaletteProps) => {
	const [activeCategory, setActiveCategory] = useState<string>('basic');

	const componentCategories: Category[] = [
		{
			id: 'basic',
			name: 'Basic',
			icon: 'Type',
			components: [
				{
					id: 'text-input',
					type: 'text-input',
					name: 'Text Input',
					min: 1,
					max: 100,
					icon: 'Type',
					validation: 'none',
					description: 'Single line text field',
				},
				{
					id: 'textarea',
					type: 'textarea',
					name: 'Text Area',
					icon: 'AlignLeft',
					min: 1,
					max: 5000,
					validation: 'none',
					description: 'Multi-line text field',
				},
				{
					id: 'number',
					type: 'number',
					name: 'Number',
					icon: 'Hash',
					min: 0,
					max: 1000000,
					description: 'Numeric input field',
				},
				{
					id: 'email',
					type: 'email',
					name: 'Email',
					icon: 'Mail',
					validation: 'email',
					description: 'Email address field',
				},
				{
					id: 'phone',
					type: 'phone',
					name: 'Phone',
					min: 7,
					max: 15,
					validation: 'number',
					icon: 'Phone',
					description: 'Phone number field',
				},
			],
		},
		{
			id: 'choice',
			name: 'Choice',
			icon: 'CheckSquare',
			components: [
				{
					id: 'multiple-choice',
					type: 'multiple-choice',
					name: 'Multiple Choice',
					icon: 'Circle',
					description: 'Single selection from options',
				},
				{
					id: 'checkboxes',
					type: 'checkboxes',
					name: 'Checkboxes',
					icon: 'CheckSquare',
					description: 'Multiple selections allowed',
				},
				{
					id: 'dropdown',
					type: 'dropdown',
					name: 'Dropdown',
					icon: 'ChevronDown',
					description: 'Select from dropdown list',
				},
				{
					id: 'yes-no',
					type: 'yes-no',
					name: 'Yes/No',
					icon: 'ToggleLeft',
					description: 'Binary choice question',
				},
			],
		},
		{
			id: 'rating',
			name: 'Rating',
			icon: 'Star',
			components: [
				{
					id: 'star-rating',
					type: 'star-rating',
					name: 'Star Rating',
					icon: 'Star',
					description: '1-5 star rating scale',
				},
				{
					id: 'scale',
					type: 'scale',
					name: 'Scale',
					icon: 'Sliders',
					description: 'Numeric rating scale',
				},
				{
					id: 'nps',
					type: 'nps',
					name: 'NPS Score',
					icon: 'TrendingUp',
					description: 'Net Promoter Score (0-10)',
				},
				{
					id: 'emoji',
					type: 'emoji',
					name: 'Emoji Rating',
					icon: 'Smile',
					description: 'Emoji-based feedback',
				},
			],
		},
		{
			id: 'advanced',
			name: 'Advanced',
			icon: 'Zap',
			components: [
				{
					id: 'date',
					type: 'date',
					name: 'Date Picker',
					icon: 'Calendar',
					description: 'Date selection field',
				},
				{
					id: 'time',
					type: 'time',
					name: 'Time Picker',
					icon: 'Clock',
					description: 'Time selection field',
				},
				// {
				// 	id: 'file-upload',
				// 	type: 'file-upload',
				// 	name: 'File Upload',
				// 	icon: 'Upload',
				// 	description: 'File attachment field',
				// },
				// {
				// 	id: 'matrix',
				// 	type: 'matrix',
				// 	name: 'Matrix',
				// 	icon: 'Grid',
				// 	description: 'Grid of questions',
				// },
				{
					id: 'ranking',
					type: 'ranking',
					name: 'Ranking',
					icon: 'List',
					description: 'Drag to rank items',
				},
			],
		},
		{
			id: 'content',
			name: 'Content',
			icon: 'FileText',
			components: [
				{
					id: 'heading',
					type: 'heading',
					name: 'Heading',
					icon: 'Heading',
					description: 'Section heading text',
				},
				{
					id: 'paragraph',
					type: 'paragraph',
					name: 'Paragraph',
					icon: 'AlignLeft',
					description: 'Descriptive text block',
				},
				{
					id: 'image',
					type: 'image',
					name: 'Image',
					icon: 'Image',
					description: 'Display an image',
				},
				{
					id: 'divider',
					type: 'divider',
					name: 'Divider',
					icon: 'Minus',
					description: 'Visual separator line',
				},
			],
		},
	];

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		component: SurveyComponent,
	) => {
		e.dataTransfer.effectAllowed = 'copy';
		e.dataTransfer.setData('component', JSON.stringify(component));
		onDragStart(component);
	};

	return (
		<div className='h-screen w-full max-w-sm flex flex-col bg-card border-r border-border'>
			{/* Header */}
			<div className='p-4 lg:p-6 border-b border-border bg-card'>
				<div className='flex items-center justify-between'>
					<div className='flex gap-2 items-center'>
						<Icon
							name='Package'
							size={20}
							color='var(--color-primary)'
						/>
						<h2 className='text-base lg:text-lg font-heading font-semibold text-foreground'>
							Components
						</h2>
					</div>
				</div>
				<p className='text-xs lg:text-sm text-muted-foreground'>
					Drag components to canvas
				</p>
			</div>
			{/* Category Tabs */}
			{/* <div className='flex overflow-x-auto border-b border-border scrollbar-hide'>
				{componentCategories?.map((category) => (
					<button
						key={category?.id}
						onClick={() => setActiveCategory(category?.id)}
						className={`
              flex items-center gap-2 px-3 lg:px-4 py-2.5 lg:py-3 whitespace-nowrap
              border-b-2 transition-smooth shrink-0
              ${
								activeCategory === category?.id
									? 'border-primary text-primary bg-primary/5'
									: 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
							}
            `}
					>
						<Icon
							name={category?.icon}
							size={16}
						/>
						<span className='text-xs lg:text-sm font-medium'>
							{category?.name}
						</span>
					</button>
				))}
			</div> */}
			{/* Components List */}
			<div className='overflow-y-auto p-3 lg:p-4 space-y-2 grid grid-cols-2 gap-1'>
				{componentCategories
					// ?.find((cat) => cat?.id === activeCategory)
					.map((componentcategory) =>
						componentcategory.components?.map((component) => (
							<div
								key={component.id}
								draggable
								onDragStart={(e) => handleDragStart(e, component)}
								className='group relative flex items-center gap-2 p-1 
										bg-card border border-border rounded-lg
										cursor-grab active:cursor-grabbing active:scale-[0.98]
										hover:bg-accent hover:border-primary/20 hover:shadow-sm
										transition-all duration-200 ease-out
										font-sans select-none'
							>
								{/* Visual Indicator: Drag Handle (Standard Google UX) */}
								{/* <div className='text-muted-foreground/30 group-hover:text-primary/50 transition-colors'>
									<GripVertical size={18} />
								</div> */}

								{/* Icon Wrapper: M3 Container Style */}
								<div className='flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200'>
									<Icon
										name={component.icon}
										size={20}
									/>
								</div>

								{/* Content: Optimized for scannability */}
								<div className='flex-1 min-w-0 flex flex-col justify-center'>
									<div className='flex items-center justify-between'>
										<h3 className='text-sm font-medium text-foreground tracking-tight leading-none'>
											{component.name}
										</h3>
									</div>

									{/* {component.description && (
										<p className='mt-1 text-xs text-muted-foreground line-clamp-1 group-hover:text-foreground/70 transition-colors'>
											{component.description}
										</p>
									)} */}
								</div>

								{/* Hover State Secondary Action (Optional/Ghost) */}
								<div className='opacity-0 group-hover:opacity-100 transition-opacity pr-2'>
									<div className='h-2 w-2 rounded-full bg-primary' />
								</div>
							</div>
						)),
					)}
			</div>
		</div>
	);
};

export default ComponentPalette;
