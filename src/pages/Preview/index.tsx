import React, { useState, useCallback, useMemo } from 'react';
import { Star, Upload, X } from 'lucide-react';
// import { TextInput } from '../survey-builder/components/LivePreviewPanel';

// Field Components
export const TextInputField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label
			htmlFor={component.id}
			className='block text-sm font-medium text-slate-700'
		>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<input
			type='text'
			id={component.id}
			value={value || ''}
			onChange={(e) => onChange(component.id, e.target.value)}
			placeholder={component.placeholder}
			className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
		/>
		{error && <p className='text-xs text-red-500'>{error}</p>}
	</div>
);

export const EmailField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label
			htmlFor={component.id}
			className='block text-sm font-medium text-slate-700'
		>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<input
			type='email'
			id={component.id}
			value={value || ''}
			onChange={(e) => onChange(component.id, e.target.value)}
			placeholder={component.placeholder}
			className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
		/>
		{error && <p className='text-xs text-red-500'>{error}</p>}
	</div>
);

export const PhoneField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label
			htmlFor={component.id}
			className='block text-sm font-medium text-slate-700'
		>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<input
			type='tel'
			id={component.id}
			value={value || ''}
			onChange={(e) => onChange(component.id, e.target.value)}
			placeholder={component.placeholder}
			className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
		/>
		{error && <p className='text-xs text-red-500'>{error}</p>}
	</div>
);

export const NumberField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label
			htmlFor={component.id}
			className='block text-sm font-medium text-slate-700'
		>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<input
			type='number'
			id={component.id}
			value={value || ''}
			onChange={(e) => onChange(component.id, e.target.value)}
			placeholder={component.placeholder}
			min={component.min}
			max={component.max}
			className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
		/>
		{error && <p className='text-xs text-red-500'>{error}</p>}
	</div>
);

export const TextareaField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label
			htmlFor={component.id}
			className='block text-sm font-medium text-slate-700'
		>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<textarea
			id={component.id}
			value={value || ''}
			onChange={(e) => onChange(component.id, e.target.value)}
			placeholder={component.placeholder}
			rows={4}
			className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y'
		/>
		{error && <p className='text-xs text-red-500'>{error}</p>}
	</div>
);

export const MultipleChoiceField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label className='block text-sm font-medium text-slate-700'>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<div className='space-y-2'>
			{component.options?.map((option, idx) => (
				<label
					key={idx}
					className='flex items-center space-x-2.5 cursor-pointer group'
				>
					<input
						type='radio'
						name={component.id}
						value={option}
						checked={value === option}
						onChange={(e) => onChange(component.id, e.target.value)}
						className='w-4 h-4 text-blue-600 border-slate-300 focus:ring-2 focus:ring-blue-500'
					/>
					<span className='text-sm text-slate-700 group-hover:text-slate-900'>
						{option}
					</span>
				</label>
			))}
		</div>
		{error && <p className='text-xs text-red-500 mt-1.5'>{error}</p>}
	</div>
);

export const CheckboxesField = ({ component, value, onChange, error }) => {
	const selectedValues = value || [];

	const handleToggle = (option) => {
		const newValues = selectedValues.includes(option)
			? selectedValues.filter((v) => v !== option)
			: [...selectedValues, option];
		onChange(component.id, newValues);
	};

	return (
		<div className='space-y-1.5'>
			<label className='block text-sm font-medium text-slate-700'>
				{component.label}
				{component.required && <span className='text-red-500 ml-1'>*</span>}
			</label>
			{component.description && (
				<p className='text-xs text-slate-500'>{component.description}</p>
			)}
			<div className='space-y-2'>
				{component.options?.map((option, idx) => (
					<label
						key={idx}
						className='flex items-center space-x-2.5 cursor-pointer group'
					>
						<input
							type='checkbox'
							checked={selectedValues.includes(option)}
							onChange={() => handleToggle(option)}
							className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500'
						/>
						<span className='text-sm text-slate-700 group-hover:text-slate-900'>
							{option}
						</span>
					</label>
				))}
			</div>
			{error && <p className='text-xs text-red-500 mt-1.5'>{error}</p>}
		</div>
	);
};

export const DropdownField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label
			htmlFor={component.id}
			className='block text-sm font-medium text-slate-700'
		>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<select
			id={component.id}
			value={value || ''}
			onChange={(e) => onChange(component.id, e.target.value)}
			className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
		>
			<option value=''>Select an option...</option>
			{component.options?.map((option, idx) => (
				<option
					key={idx}
					value={option}
				>
					{option}
				</option>
			))}
		</select>
		{error && <p className='text-xs text-red-500'>{error}</p>}
	</div>
);

export const StarRatingField = ({ component, value, onChange, error }) => {
	const maxStars = component.max || 5;
	const [hover, setHover] = useState(0);

	return (
		<div className='space-y-1.5'>
			<label className='block text-sm font-medium text-slate-700'>
				{component.label}
				{component.required && <span className='text-red-500 ml-1'>*</span>}
			</label>
			{component.description && (
				<p className='text-xs text-slate-500'>{component.description}</p>
			)}
			<div className='flex items-center space-x-1'>
				{[...Array(maxStars)].map((_, idx) => {
					const starValue = idx + 1;
					return (
						<button
							key={idx}
							type='button'
							onClick={() => onChange(component.id, starValue)}
							onMouseEnter={() => setHover(starValue)}
							onMouseLeave={() => setHover(0)}
							className='focus:outline-none focus:ring-2 focus:ring-blue-500 rounded'
						>
							<Star
								className={`w-7 h-7 transition-colors ${
									starValue <= (hover || value || 0)
										? 'fill-yellow-400 text-yellow-400'
										: 'text-slate-300'
								}`}
							/>
						</button>
					);
				})}
				{value > 0 && (
					<span className='ml-2 text-sm text-slate-600'>
						{value}/{maxStars}
					</span>
				)}
			</div>
			{error && <p className='text-xs text-red-500 mt-1.5'>{error}</p>}
		</div>
	);
};

export const ScaleField = ({ component, value, onChange, error }) => {
	const min = component.min || 1;
	const max = component.max || 10;
	const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);

	return (
		<div className='space-y-1.5'>
			<label className='block text-sm font-medium text-slate-700'>
				{component.label}
				{component.required && <span className='text-red-500 ml-1'>*</span>}
			</label>
			{component.description && (
				<p className='text-xs text-slate-500'>{component.description}</p>
			)}
			<div className='flex flex-wrap gap-2'>
				{options.map((num) => (
					<button
						key={num}
						type='button'
						onClick={() => onChange(component.id, num)}
						className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							value === num
								? 'bg-blue-600 text-white border-blue-600'
								: 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
						}`}
					>
						{num}
					</button>
				))}
			</div>
			{error && <p className='text-xs text-red-500 mt-1.5'>{error}</p>}
		</div>
	);
};

export const NPSField = ({ component, value, onChange, error }) => {
	const options = Array.from({ length: 11 }, (_, i) => i);

	return (
		<div className='space-y-1.5'>
			<label className='block text-sm font-medium text-slate-700'>
				{component.label}
				{component.required && <span className='text-red-500 ml-1'>*</span>}
			</label>
			{component.description && (
				<p className='text-xs text-slate-500'>{component.description}</p>
			)}
			<div className='space-y-2'>
				<div className='flex flex-wrap gap-2'>
					{options.map((num) => (
						<button
							key={num}
							type='button'
							onClick={() => onChange(component.id, num)}
							className={`w-10 h-10 text-sm font-medium rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
								value === num
									? 'bg-blue-600 text-white border-blue-600'
									: 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
							}`}
						>
							{num}
						</button>
					))}
				</div>
				<div className='flex justify-between text-xs text-slate-500'>
					<span>Not likely at all</span>
					<span>Extremely likely</span>
				</div>
			</div>
			{error && <p className='text-xs text-red-500 mt-1.5'>{error}</p>}
		</div>
	);
};

export const DateField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label
			htmlFor={component.id}
			className='block text-sm font-medium text-slate-700'
		>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<input
			type='date'
			id={component.id}
			value={value || ''}
			onChange={(e) => onChange(component.id, e.target.value)}
			className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
		/>
		{error && <p className='text-xs text-red-500'>{error}</p>}
	</div>
);

export const TimeField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label
			htmlFor={component.id}
			className='block text-sm font-medium text-slate-700'
		>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<input
			type='time'
			id={component.id}
			value={value || ''}
			onChange={(e) => onChange(component.id, e.target.value)}
			className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
		/>
		{error && <p className='text-xs text-red-500'>{error}</p>}
	</div>
);

export const YesNoField = ({ component, value, onChange, error }) => (
	<div className='space-y-1.5'>
		<label className='block text-sm font-medium text-slate-700'>
			{component.label}
			{component.required && <span className='text-red-500 ml-1'>*</span>}
		</label>
		{component.description && (
			<p className='text-xs text-slate-500'>{component.description}</p>
		)}
		<div className='flex gap-3'>
			<button
				type='button'
				onClick={() => onChange(component.id, 'yes')}
				className={`flex-1 px-6 py-2.5 text-sm font-medium rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
					value === 'yes'
						? 'bg-blue-600 text-white border-blue-600'
						: 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
				}`}
			>
				Yes
			</button>
			<button
				type='button'
				onClick={() => onChange(component.id, 'no')}
				className={`flex-1 px-6 py-2.5 text-sm font-medium rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
					value === 'no'
						? 'bg-blue-600 text-white border-blue-600'
						: 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
				}`}
			>
				No
			</button>
		</div>
		{error && <p className='text-xs text-red-500 mt-1.5'>{error}</p>}
	</div>
);

export const EmojiField = ({ component, value, onChange, error }) => {
	const emojis = component.options || ['😢', '😕', '😐', '🙂', '😄'];

	return (
		<div className='space-y-1.5'>
			<label className='block text-sm font-medium text-slate-700'>
				{component.label}
				{component.required && <span className='text-red-500 ml-1'>*</span>}
			</label>
			{component.description && (
				<p className='text-xs text-slate-500'>{component.description}</p>
			)}
			<div className='flex gap-3 justify-center'>
				{emojis.map((emoji, idx) => (
					<button
						key={idx}
						type='button'
						onClick={() => onChange(component.id, emoji)}
						className={`text-4xl p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							value === emoji
								? 'bg-blue-100 scale-110'
								: 'hover:bg-slate-100 hover:scale-105'
						}`}
					>
						{emoji}
					</button>
				))}
			</div>
			{error && <p className='text-xs text-red-500 mt-1.5'>{error}</p>}
		</div>
	);
};

export const FileUploadField = ({ component, value, onChange, error }) => {
	const [fileName, setFileName] = useState(value?.name || '');

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setFileName(file.name);
			onChange(component.id, file);
		}
	};

	const clearFile = () => {
		setFileName('');
		onChange(component.id, null);
	};

	return (
		<div className='space-y-1.5'>
			<label className='block text-sm font-medium text-slate-700'>
				{component.label}
				{component.required && <span className='text-red-500 ml-1'>*</span>}
			</label>
			{component.description && (
				<p className='text-xs text-slate-500'>{component.description}</p>
			)}
			<div className='relative'>
				{!fileName ? (
					<label
						htmlFor={component.id}
						className='flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors'
					>
						<div className='text-center'>
							<Upload className='w-8 h-8 mx-auto text-slate-400 mb-2' />
							<span className='text-sm text-slate-600'>
								Click to upload or drag and drop
							</span>
						</div>
						<input
							type='file'
							id={component.id}
							onChange={handleFileChange}
							className='hidden'
						/>
					</label>
				) : (
					<div className='flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg'>
						<span className='text-sm text-slate-700 truncate'>{fileName}</span>
						<button
							type='button'
							onClick={clearFile}
							className='ml-2 p-1 hover:bg-slate-200 rounded transition-colors'
						>
							<X className='w-4 h-4 text-slate-500' />
						</button>
					</div>
				)}
			</div>
			{error && <p className='text-xs text-red-500'>{error}</p>}
		</div>
	);
};

export const MatrixField = ({ component, value, onChange, error }) => {
	const answers = value || {};

	const handleChange = (row, column) => {
		onChange(component.id, { ...answers, [row]: column });
	};

	return (
		<div className='space-y-1.5'>
			<label className='block text-sm font-medium text-slate-700'>
				{component.label}
				{component.required && <span className='text-red-500 ml-1'>*</span>}
			</label>
			{component.description && (
				<p className='text-xs text-slate-500'>{component.description}</p>
			)}
			<div className='overflow-x-auto'>
				<table className='w-full text-sm border-collapse'>
					<thead>
						<tr>
							<th className='p-2 text-left'></th>
							{component.columns?.map((col, idx) => (
								<th
									key={idx}
									className='p-2 text-center font-medium text-slate-700'
								>
									{col}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{component.rows?.map((row, rowIdx) => (
							<tr
								key={rowIdx}
								className='border-t border-slate-200'
							>
								<td className='p-2 font-medium text-slate-700'>{row}</td>
								{component.columns?.map((col, colIdx) => (
									<td
										key={colIdx}
										className='p-2 text-center'
									>
										<input
											type='radio'
											name={`${component.id}-${row}`}
											checked={answers[row] === col}
											onChange={() => handleChange(row, col)}
											className='w-4 h-4 text-blue-600 border-slate-300 focus:ring-2 focus:ring-blue-500'
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{error && <p className='text-xs text-red-500 mt-1.5'>{error}</p>}
		</div>
	);
};

export const RankingField = ({ component, value, onChange, error }) => {
	const [items, setItems] = useState(value || component.options || []);

	const moveItem = (fromIndex, toIndex) => {
		const newItems = [...items];
		const [movedItem] = newItems.splice(fromIndex, 1);
		newItems.splice(toIndex, 0, movedItem);
		setItems(newItems);
		onChange(component.id, newItems);
	};

	return (
		<div className='space-y-1.5'>
			<label className='block text-sm font-medium text-slate-700'>
				{component.label}
				{component.required && <span className='text-red-500 ml-1'>*</span>}
			</label>
			{component.description && (
				<p className='text-xs text-slate-500'>{component.description}</p>
			)}
			<div className='space-y-2'>
				{items.map((item, idx) => (
					<div
						key={idx}
						className='flex items-center gap-3 p-3 bg-white border border-slate-300 rounded-lg'
					>
						<span className='flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full text-sm font-medium text-slate-700'>
							{idx + 1}
						</span>
						<span className='flex-1 text-sm text-slate-700'>{item}</span>
						<div className='flex gap-1'>
							<button
								type='button'
								onClick={() => moveItem(idx, idx - 1)}
								disabled={idx === 0}
								className='px-2 py-1 text-xs text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed'
							>
								↑
							</button>
							<button
								type='button'
								onClick={() => moveItem(idx, idx + 1)}
								disabled={idx === items.length - 1}
								className='px-2 py-1 text-xs text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed'
							>
								↓
							</button>
						</div>
					</div>
				))}
			</div>
			{error && <p className='text-xs text-red-500 mt-1.5'>{error}</p>}
		</div>
	);
};

// Non-input components
export const HeadingComponent = ({ component }) => (
	<h2 className='text-xl font-semibold text-slate-800'>{component.label}</h2>
);

export const ParagraphComponent = ({ component }) => (
	<p className='text-sm text-slate-600 leading-relaxed'>{component.content}</p>
);

export const DividerComponent = () => (
	<hr className='border-t border-slate-200' />
);

export const ImageComponent = ({ component }) =>
	component.imageUrl ? (
		<img
			src={component.imageUrl}
			alt={component.label || 'Survey image'}
			className='max-w-full h-auto rounded-lg'
		/>
	) : null;

// Main Renderer
export const Preview = ({ survey }: { survey: SavedSurvey }) => {
	const [answers, setAnswers] = useState({});
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = useCallback((id, value) => {
		setAnswers((prev) => ({ ...prev, [id]: value }));
		setErrors((prev) => ({ ...prev, [id]: '' }));
	}, []);

	const validateField = (component) => {
		const value = answers[component.id];

		if (component.required) {
			if (
				value === undefined ||
				value === null ||
				value === '' ||
				(Array.isArray(value) && value.length === 0)
			) {
				return 'This field is required';
			}
		}

		if (component.type === 'email' && value) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				return 'Please enter a valid email address';
			}
		}

		if (component.type === 'number' && value) {
			if (component.min !== undefined && Number(value) < component.min) {
				return `Minimum value is ${component.min}`;
			}
			if (component.max !== undefined && Number(value) > component.max) {
				return `Maximum value is ${component.max}`;
			}
		}

		if (component.validation?.pattern && value) {
			const regex = new RegExp(component.validation.pattern);
			if (!regex.test(value)) {
				return component.validation.message || 'Invalid format';
			}
		}

		return '';
	};

	const isFormValid = useMemo(() => {
		return survey.components
			.filter(
				(c) =>
					c.required &&
					!['heading', 'paragraph', 'divider', 'image'].includes(c.type),
			)
			.every((c) => {
				const value = answers[c.id];
				return (
					value !== undefined &&
					value !== null &&
					value !== '' &&
					(!Array.isArray(value) || value.length > 0)
				);
			});
	}, [answers, survey.components]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newErrors = {};
		let hasErrors = false;

		survey.components.forEach((component) => {
			if (
				!['heading', 'paragraph', 'divider', 'image'].includes(component.type)
			) {
				const error = validateField(component);
				if (error) {
					newErrors[component.id] = error;
					hasErrors = true;
				}
			}
		});

		if (hasErrors) {
			setErrors(newErrors);
			return;
		}

		setSubmitted(true);
		console.log('Survey submitted:', answers);
	};

	const renderField = (component: SurveyComponent) => {
		const props = {
			component,
			value: answers[component.id],
			onChange: handleChange,
			error: errors[component.id],
		};

		switch (component.type) {
			case 'text-input':
				return <TextInputField {...props} />;
			case 'email':
				return <EmailField {...props} />;
			case 'phone':
				return <PhoneField {...props} />;
			case 'number':
				return <NumberField {...props} />;
			case 'textarea':
				return <TextareaField {...props} />;
			case 'multiple-choice':
				return <MultipleChoiceField {...props} />;
			case 'checkboxes':
				return <CheckboxesField {...props} />;
			case 'dropdown':
				return <DropdownField {...props} />;
			case 'star-rating':
				return <StarRatingField {...props} />;
			case 'scale':
				return <ScaleField {...props} />;
			case 'nps':
				return <NPSField {...props} />;
			case 'date':
				return <DateField {...props} />;
			case 'time':
				return <TimeField {...props} />;
			case 'yes-no':
				return <YesNoField {...props} />;
			case 'emoji':
				return <EmojiField {...props} />;
			case 'file-upload':
				return <FileUploadField {...props} />;
			case 'matrix':
				return <MatrixField {...props} />;
			case 'ranking':
				return <RankingField {...props} />;
			case 'heading':
				return <HeadingComponent component={component} />;
			case 'paragraph':
				return <ParagraphComponent component={component} />;
			case 'divider':
				return <DividerComponent />;
			case 'image':
				return <ImageComponent component={component} />;
			default:
				return null;
		}
	};

	if (submitted) {
		return (
			<div className='min-h-screen bg-slate-50 py-8 px-4'>
				<div className='max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center'>
					<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
						<svg
							className='w-8 h-8 text-green-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
							/>
						</svg>
					</div>
					<h2 className='text-2xl font-semibold text-slate-800 mb-2'>
						Thank you!
					</h2>
					<p className='text-slate-600'>
						Your response has been submitted successfully.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-slate-50 py-8 px-4'>
			<form
				onSubmit={handleSubmit}
				className='max-w-2xl mx-auto'
			>
				<div className='bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-6'>
					<h1 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-2'>
						{survey.title}
					</h1>
					{survey.description && (
						<p className='text-slate-600 text-sm sm:text-base leading-relaxed'>
							{survey.description}
						</p>
					)}
				</div>

				<div className='bg-white rounded-xl shadow-sm p-6 sm:p-8 space-y-6'>
					{survey.components.map((component) => (
						<div key={component.id}>{renderField(component)}</div>
					))}

					<div className='pt-4'>
						<button
							type='submit'
							disabled={!isFormValid}
							className='w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							Submit Survey
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Preview;
