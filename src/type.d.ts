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
	authRequired: boolean;
	title: string;
	description: string;
	fontStyle: FontTheme;
	primaryColor: ColorTheme;
	status: 'drafted' | 'live' | 'completed';
	user?: string;
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

interface UserType {
	name: string;
	email: string;
	photo: string;
	role: 'teacher' | 'student';
	password: string;
	isActive: boolean;
	_id?: string;
	isVerified?: boolean;
	passwordConfirm?: string;
	phone?: string;
	isGoogleUser?: boolean;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
	passwordChangedAt?: Date;

	correctPassword(
		candidatePassword: string,
		userPassword: string,
	): Promise<boolean>;
	changedPasswordAfter(JWTTimestamp: number): boolean;
	createPasswordResetToken(): string;
}

interface ApiResponse<T> {
	success: boolean;
	error: string | null;
	data: T | null;
}

interface GoogleCredentialResponse {
	credential: string;
	select_by: string;
}

interface Window {
	google?: {
		accounts: {
			id: {
				initialize: (options: {
					client_id: string;
					callback: (response: GoogleCredentialResponse) => void;
				}) => void;
				renderButton: (
					parent: HTMLElement,
					options: {
						theme?: 'outline' | 'filled_blue' | 'filled_black';
						size?: 'large' | 'medium' | 'small';
						text?:
							| 'signin_with'
							| 'signup_with'
							| 'continue_with'
							| 'signin';
						shape?: 'rectangular' | 'pill' | 'circle' | 'square';
						width?: number;
						logo_alignment?: 'left' | 'center';
					},
				) => void;
			};
		};
	};
}

interface ResponseComponent {
	_id: string;
	questionId: string;
	answer: string;
}

interface SurveyResponseType {
	surveyId: Schema.Types.ObjectId;
	_id: string;
	email: string;
	createdAt: string;
	components: [ResponseComponent];
}

type ColorTheme = 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'pink';
type FontTheme = 'classic' | 'modern' | 'playful';
