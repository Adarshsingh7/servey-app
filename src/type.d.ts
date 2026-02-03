// types/survey.ts
type SurveyComponentType =
	| 'text-input'
	| 'email'
	| 'phone'
	| 'number'
	| 'textarea'
	| 'multiple-choice'
	| 'checkboxes'
	| 'dropdown'
	| 'star-rating'
	| 'scale'
	| 'nps'
	| 'date'
	| 'matrix'
	| 'ranking'
	| 'emoji'
	| 'yes-no'
	| 'time'
	| 'file-upload'
	| 'heading'
	| 'paragraph'
	| 'divider'
	| 'image';

type TextValidation = 'email' | 'number' | 'phone' | 'url' | 'none';

interface SurveyType {
	title: string;
	description: string;
	_id?: string;
	components: SurveyComponent[];
}

interface SurveyComponent {
	id: string;
	type: SurveyComponentType;
	name: string;
	icon: string;
	min?: number;
	max?: number;
	label?: string;
	required?: boolean;
	placeholder?: string;
	description?: string;
	options?: SurveyComponentOption;
	imageUrl?: string;
	items?: string[];
	validation?: TextValidation;
	// options: SurveyComponentOption[];
}

interface ApiResponse<T> {
	success: boolean;
	error: string | null;
	data: T | null;
}
