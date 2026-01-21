/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

// Mock components - replace with your actual imports
const Button = ({ children, fullWidth, size }: any) => (
	<button
		className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${fullWidth ? 'w-full' : ''} ${size === 'lg' ? 'text-lg py-3' : ''}`}
	>
		{children}
	</button>
);

interface QuestionWrapperProps {
	label?: string;
	required?: boolean;
	description?: string;
	children: React.ReactNode;
}

interface TextInputProps {
	component: SurveyComponent;
	value: string;
	onChange: (val: string) => void;
}

interface DropdownProps {
	options?: string[];
}

interface RadioGroupProps {
	name: string;
	options?: string[];
}

interface CheckboxProps {
	options?: string[];
}

interface LivePreviewProps {
	components: SurveyComponent[];
	surveyTitle: string;
	surveyDescription: string;
}

const QuestionWrapper = ({
	label,
	required,
	description,
	children,
}: QuestionWrapperProps) => {
	if (!label && !description) return <>{children}</>;

	return (
		<div className='space-y-2'>
			{label && (
				<label className='block text-sm font-medium text-gray-900'>
					{label}
					{required && <span className='text-red-600 ml-1'>*</span>}
				</label>
			)}
			{description && <p className='text-xs text-gray-600'>{description}</p>}
			{children}
		</div>
	);
};

export const TextInput = ({ component, value, onChange }: TextInputProps) => {
	const { type = 'text', placeholder, validation, min, max } = component;
	// const [value, setValue] = useState('');
	const [error, setError] = useState('');

	function isEmail(value: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	function isPhone(value: string): boolean {
		// Supports international numbers, optional +, spaces, dashes, parentheses
		return /^\+?[0-9\s\-()]{7,15}$/.test(value);
	}

	function isUrl(value: string): boolean {
		try {
			new URL(value);
			return true;
		} catch {
			return false;
		}
	}

	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		if (validation === 'none' || !validation) {
			onChange(inputValue);
			// setError('');
			return;
		}

		if (validation === 'number') {
			const numericValue = inputValue.replace(/[^0-9]/g, '');
			onChange(numericValue);
			setError('');
			return;
		}

		if (validation === 'email') {
			if (isEmail(inputValue) || inputValue === '') {
				setError('');
			} else {
				setError('Invalid email format');
			}
			onChange(inputValue);
			return;
		}

		if (validation === 'phone') {
			if (isPhone(inputValue) || inputValue === '') {
				setError('');
			} else {
				setError('Invalid phone number');
			}
			onChange(inputValue);
			return;
		}

		if (validation === 'url') {
			if (!isUrl(inputValue)) {
				setError('Invalid URL format');
			}
		}

		// Default case (no validation)
		onChange(inputValue);
	};

	return (
		<div>
			<input
				type={type}
				placeholder={placeholder || 'Your answer'}
				value={value}
				onChange={handleChangeValue}
				className='w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none'
			/>
			{validation === 'number' && (
				<p className='text-xs text-gray-500 mt-1'>Enter the numeric value</p>
			)}
			{value && (min || max) && (
				<p className='text-xs text-gray-500 mt-1'>
					{min ? `Min: ${min} ` : ''}
					{max ? `Max: ${max}` : ''}
				</p>
			)}
			<p className='text-red-500 text-xs'>{error}</p>
		</div>
	);
};

const Textarea = ({ placeholder }: { placeholder?: string }) => (
	<textarea
		rows={4}
		placeholder={placeholder || 'Your answer'}
		className='w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500/20 outline-none'
	/>
);

const Dropdown = ({ options = [] }: DropdownProps) => (
	<select className='w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none'>
		<option value=''>Select an option</option>
		{options.map((opt, i) => (
			<option
				key={i}
				value={opt}
			>
				{opt}
			</option>
		))}
	</select>
);

const RadioGroup = ({ name, options = [] }: RadioGroupProps) => (
	<div className='space-y-2'>
		{options.map((opt, i) => (
			<label
				key={i}
				className='flex items-center gap-3 cursor-pointer'
			>
				<input
					type='radio'
					name={name}
					className='accent-blue-600'
				/>
				<span className='text-sm'>{opt}</span>
			</label>
		))}
	</div>
);

const CheckboxGroup = ({ options = [] }: CheckboxProps) => (
	<div className='space-y-2'>
		{options.map((opt, i) => (
			<label
				key={i}
				className='flex items-center gap-3 cursor-pointer'
			>
				<input
					type='checkbox'
					className='accent-blue-600'
				/>
				<span className='text-sm'>{opt}</span>
			</label>
		))}
	</div>
);

const StarRating = () => {
	const [value, setValue] = useState(0);

	return (
		<div className='flex gap-1'>
			{[1, 2, 3, 4, 5].map((n) => (
				<button
					key={n}
					type='button'
					onClick={() => setValue(n)}
					className='transition-transform hover:scale-110'
				>
					<span
						className='text-2xl'
						style={{ color: n <= value ? '#fbbf24' : '#d1d5db' }}
					>
						★
					</span>
				</button>
			))}
		</div>
	);
};

const YesNo = ({ name }: { name: string }) => (
	<div className='flex gap-4'>
		<label className='flex items-center gap-2 cursor-pointer'>
			<input
				type='radio'
				name={name}
				className='accent-blue-600'
			/>
			<span className='text-sm font-medium'>Yes</span>
		</label>
		<label className='flex items-center gap-2 cursor-pointer'>
			<input
				type='radio'
				name={name}
				className='accent-blue-600'
			/>
			<span className='text-sm font-medium'>No</span>
		</label>
	</div>
);

const Scale = ({ min = 1, max = 10 }: { min?: number; max?: number }) => {
	const [value, setValue] = useState(min);

	return (
		<div className='space-y-3'>
			<div className='flex justify-between items-center'>
				{Array.from({ length: max - min + 1 }, (_, i) => i + min).map((n) => (
					<button
						key={n}
						type='button'
						onClick={() => setValue(n)}
						className={`w-10 h-10 rounded-lg border-2 transition-all ${
							n === value
								? 'bg-blue-600 text-white border-blue-600'
								: 'bg-white border-gray-300 hover:border-blue-400'
						}`}
					>
						{n}
					</button>
				))}
			</div>
			<div className='flex justify-between text-xs text-gray-600'>
				<span>Not likely</span>
				<span>Very likely</span>
			</div>
		</div>
	);
};

const NPSScore = () => {
	const [value, setValue] = useState<number | null>(null);

	return (
		<div className='space-y-3'>
			<div className='grid grid-cols-11 gap-2'>
				{Array.from({ length: 11 }, (_, i) => i).map((n) => (
					<button
						key={n}
						type='button'
						onClick={() => setValue(n)}
						className={`h-12 rounded-lg border-2 text-sm font-medium transition-all ${
							n === value
								? 'bg-blue-600 text-white border-blue-600'
								: 'bg-white border-gray-300 hover:border-blue-400'
						}`}
					>
						{n}
					</button>
				))}
			</div>
			<div className='flex justify-between text-xs text-gray-600'>
				<span>Not at all likely</span>
				<span>Extremely likely</span>
			</div>
		</div>
	);
};

const EmojiRating = () => {
	const [value, setValue] = useState<number | null>(null);
	const emojis = ['😞', '😕', '😐', '🙂', '😄'];

	return (
		<div className='flex gap-4 justify-center'>
			{emojis.map((emoji, i) => (
				<button
					key={i}
					type='button'
					onClick={() => setValue(i)}
					className={`text-4xl transition-all hover:scale-110 ${
						i === value ? 'scale-125' : 'opacity-60'
					}`}
				>
					{emoji}
				</button>
			))}
		</div>
	);
};

const DatePicker = () => (
	<input
		type='date'
		className='w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none'
	/>
);

const TimePicker = () => (
	<input
		type='time'
		className='w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none'
	/>
);

const FileUpload = () => {
	const [fileName, setFileName] = useState<string>('');

	return (
		<div className='space-y-2'>
			<label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors'>
				<div className='flex flex-col items-center justify-center pt-5 pb-6'>
					<svg
						className='w-8 h-8 mb-2 text-gray-500'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
						/>
					</svg>
					<p className='text-sm text-gray-600'>
						Click to upload or drag and drop
					</p>
					<p className='text-xs text-gray-500'>PDF, PNG, JPG up to 10MB</p>
				</div>
				<input
					type='file'
					className='hidden'
					onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
				/>
			</label>
			{fileName && (
				<p className='text-sm text-gray-700'>Selected: {fileName}</p>
			)}
		</div>
	);
};

const Matrix = ({
	rows = [],
	columns = [],
}: {
	rows?: string[];
	columns?: string[];
}) => {
	const defaultRows = rows.length > 0 ? rows : ['Row 1', 'Row 2', 'Row 3'];
	const defaultColumns =
		columns.length > 0 ? columns : ['Column 1', 'Column 2', 'Column 3'];

	return (
		<div className='overflow-x-auto'>
			<table className='w-full border-collapse'>
				<thead>
					<tr>
						<th className='p-2 border border-gray-300 bg-gray-50'></th>
						{defaultColumns.map((col, i) => (
							<th
								key={i}
								className='p-2 border border-gray-300 bg-gray-50 text-sm font-medium'
							>
								{col}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{defaultRows.map((row, rowIdx) => (
						<tr key={rowIdx}>
							<td className='p-2 border border-gray-300 bg-gray-50 text-sm font-medium'>
								{row}
							</td>
							{defaultColumns.map((_, colIdx) => (
								<td
									key={colIdx}
									className='p-2 border border-gray-300 text-center'
								>
									<input
										type='radio'
										name={`matrix-row-${rowIdx}`}
										className='accent-blue-600'
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const Ranking = ({ options = [] }: { options?: string[] }) => {
	const [items, setItems] = useState(
		options.length > 0 ? options : ['Option 1', 'Option 2', 'Option 3'],
	);
	const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

	const handleDragStart = (idx: number) => {
		setDraggedIdx(idx);
	};

	const handleDragOver = (e: React.DragEvent, idx: number) => {
		e.preventDefault();
		if (draggedIdx === null || draggedIdx === idx) return;

		const newItems = [...items];
		const draggedItem = newItems[draggedIdx];
		newItems.splice(draggedIdx, 1);
		newItems.splice(idx, 0, draggedItem);

		setItems(newItems);
		setDraggedIdx(idx);
	};

	return (
		<div className='space-y-2'>
			{items.map((item, idx) => (
				<div
					key={idx}
					draggable
					onDragStart={() => handleDragStart(idx)}
					onDragOver={(e) => handleDragOver(e, idx)}
					className='flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg cursor-move hover:border-blue-400 transition-colors'
				>
					<div className='flex flex-col gap-0.5'>
						<span className='w-4 h-0.5 bg-gray-400 rounded'></span>
						<span className='w-4 h-0.5 bg-gray-400 rounded'></span>
						<span className='w-4 h-0.5 bg-gray-400 rounded'></span>
					</div>
					<span className='text-sm font-medium text-gray-700'>{idx + 1}</span>
					<span className='text-sm'>{item}</span>
				</div>
			))}
		</div>
	);
};

const ImageDisplay = ({ imageUrl }: { imageUrl?: string }) => (
	<div className='w-full'>
		{imageUrl ? (
			<img
				src={imageUrl}
				alt='Survey content'
				className='w-full h-auto rounded-lg'
			/>
		) : (
			<div className='w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center'>
				<div className='text-center text-gray-500'>
					<svg
						className='w-12 h-12 mx-auto mb-2'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
						/>
					</svg>
					<p className='text-sm'>Image preview</p>
				</div>
			</div>
		)}
	</div>
);

const PreviewRenderer = ({
	component,
	key,
}: {
	component: SurveyComponent;
	key: number;
}) => {
	const content = (() => {
		switch (component.type) {
			case 'text-input':
			case 'email':
			case 'phone':
			case 'number':
				return null;
				// <TextInput
				// 	key={key}
				// 	type={component.type === 'text-input' ? 'text' : component.type}
				// 	placeholder={component.placeholder}
				// 	validation={component.validation}
				// 	min={component.min || 0}
				// 	max={component.max || 10000}
				// />

			case 'textarea':
				return <Textarea placeholder={component.placeholder} />;

			case 'dropdown':
				return <Dropdown options={component.options} />;

			case 'multiple-choice':
				return (
					<RadioGroup
						name={component.id}
						options={component.options}
					/>
				);

			case 'checkboxes':
				return <CheckboxGroup options={component.options} />;

			case 'yes-no':
				return <YesNo name={component.id} />;

			case 'star-rating':
				return <StarRating />;

			case 'scale':
				return (
					<Scale
						min={component.min}
						max={component.max}
					/>
				);

			case 'nps':
				return <NPSScore />;

			case 'emoji':
				return <EmojiRating />;

			case 'date':
				return <DatePicker />;

			case 'time':
				return <TimePicker />;

			case 'file-upload':
				return <FileUpload />;

			case 'ranking':
				return <Ranking options={component.options} />;

			case 'divider':
				return <hr className='border-gray-300' />;

			case 'heading':
				return <h3 className='text-xl font-semibold'>{component.label}</h3>;

			case 'paragraph':
				return <p className='text-sm text-gray-700'>{component.label}</p>;

			case 'image':
				return <ImageDisplay imageUrl={component.imageUrl} />;

			default:
				return null;
		}
	})();

	// Content-only components don't need wrapper
	if (['divider', 'heading', 'paragraph', 'image'].includes(component.type)) {
		return <>{content}</>;
	}

	return (
		<QuestionWrapper
			label={component.label}
			required={component.required}
			description={component.description}
		>
			{content}
		</QuestionWrapper>
	);
};

const LivePreviewPanel = ({
	components,
	surveyTitle,
	surveyDescription,
}: LivePreviewProps) => {
	return (
		<div className='h-screen flex flex-col bg-white border-l border-gray-200'>
			{/* header */}
			<div className='p-4 lg:p-6 border-b border-border bg-card'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-lg lg:text-xl font-heading font-semibold text-foreground mb-1'>
							Live Preview
						</h2>
						<p className='text-xs lg:text-sm text-muted-foreground'>
							See how your survey looks to respondents
						</p>
					</div>
				</div>
			</div>

			<div className='flex-1 overflow-y-auto p-6 bg-gray-50'>
				<div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200'>
					<h1 className='text-2xl font-bold mb-2'>
						{surveyTitle || 'Untitled Survey'}
					</h1>
					{surveyDescription && (
						<p className='text-gray-600 mb-6'>{surveyDescription}</p>
					)}

					<div className='space-y-6'>
						{components.map((c, i) => (
							<PreviewRenderer
								key={i}
								component={c}
							/>
						))}
					</div>

					{components.length > 0 && (
						<div className='mt-8'>
							<Button
								fullWidth
								size='lg'
							>
								Submit Survey
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LivePreviewPanel;
