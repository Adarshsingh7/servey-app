import LegalPage, { type LegalSection } from '@/pages/legal/LegalPage';

const sections: LegalSection[] = [
	{
		id: 'overview',
		title: 'Overview',
		paragraphs: [
			'This policy explains what Survey Ifnoss collects when you create an account, build surveys, or answer someone else’s survey, and what we do with that information.',
			'Two different people are involved in most surveys: the person who builds it and the people who answer it. We hold the data for both, but the survey owner decides what to ask and who to share results with.',
		],
	},
	{
		id: 'what-we-collect',
		title: 'What we collect',
		bullets: [
			{
				term: 'Account details',
				text: 'Your name, email address, role (teacher or student), and profile photo. If you sign in with Google or through IFNOSS, we receive your name, email, and profile picture from that provider. Passwords for accounts created directly are stored only as a hash.',
			},
			{
				term: 'Survey content',
				text: 'The questions, titles, descriptions, images, and settings of every survey you build.',
			},
			{
				term: 'Responses',
				text: 'The answers submitted to your surveys, the time each response was received, any files uploaded through a file-upload question, and the respondent’s email address where the survey requires sign-in.',
			},
			{
				term: 'Technical data',
				text: 'Basic information your browser sends with each request, such as device and browser type, used to keep the service running and secure.',
			},
			{
				term: 'Messages you send us',
				text: 'The name, email, topic, and message you submit through the contact form.',
			},
		],
	},
	{
		id: 'how-we-use-it',
		title: 'How we use it',
		paragraphs: [
			'We use the data above to run the service and nothing else. Specifically: to create and authenticate your account, to store and display your surveys, to collect and show responses and analytics, to export your data when you ask for it, to process a Premium subscription, and to reply when you contact us.',
			'We do not use survey content or responses to build advertising profiles, and we do not sell personal data to anyone.',
		],
	},
	{
		id: 'responses',
		title: 'Survey responses',
		paragraphs: [
			'Responses to a survey belong to the person or institution that created it. They can view, analyze, and export them, and they decide how long to keep them.',
			'If you are answering a survey, the questions you see were written by that survey’s owner, not by us. Any commitment they made to you about anonymity or how your answers will be used is theirs to keep. If you have a question about a particular survey, contact the person who sent you the link.',
			'If a survey requires sign-in, the owner will see the email address of each respondent alongside their answers. Surveys that do not require sign-in do not record a respondent identity.',
		],
	},
	{
		id: 'cookies-and-storage',
		title: 'Cookies and local storage',
		paragraphs: [
			'When you sign in, we store an authentication token in your browser’s local storage so you stay signed in between visits. Clearing your browser data signs you out.',
			'We also keep a draft of a survey you started before signing in, so it is not lost when you create an account. We do not use advertising or cross-site tracking cookies.',
		],
	},
	{
		id: 'sharing',
		title: 'Who we share data with',
		paragraphs: [
			'We do not sell personal data, and we do not share it for advertising.',
		],
		bullets: [
			{
				term: 'Service providers',
				text: 'Hosting, database, email delivery, and payment providers process data on our behalf so the service can function. They may only use it to provide that service to us.',
			},
			{
				term: 'Your institution',
				text: 'If your account was created through an institutional IFNOSS integration, your institution’s administrators may have access to account and survey information associated with it.',
			},
			{
				term: 'Legal requests',
				text: 'We may disclose data where we are legally required to, and will tell you unless we are prohibited from doing so.',
			},
		],
	},
	{
		id: 'security-and-retention',
		title: 'Security and retention',
		paragraphs: [
			'Data is transmitted over encrypted connections and passwords are hashed, never stored in readable form. No service can promise perfect security, but we work to keep access limited to the people who need it.',
			'We keep your surveys and responses for as long as your account is active. Deleting a survey deletes its responses. Deleting your account removes your account details and the surveys you own; backups may take up to 30 days to cycle out.',
		],
	},
	{
		id: 'your-rights',
		title: 'Your choices and rights',
		paragraphs: [
			'You can view and update your account details from your profile at any time, export the responses to your surveys, delete individual surveys and their responses, or ask us to delete your account entirely.',
			'Depending on where you live, you may also have the right to request a copy of your personal data, to correct it, or to object to how it is processed. Contact us and we will respond within one business day.',
		],
	},
	{
		id: 'children',
		title: 'Students and younger respondents',
		paragraphs: [
			'Survey Ifnoss is built for classrooms, so surveys are often answered by students. Accounts are intended for people aged 13 and over.',
			'Where a school or institution uses Survey Ifnoss with students, that institution is responsible for obtaining any consent its local rules require before asking students to respond, and for deciding what is appropriate to ask.',
		],
	},
	{
		id: 'changes',
		title: 'Changes to this policy',
		paragraphs: [
			'If we change how we handle data, we will update this page and the date at the top. Material changes will be announced in the app before they take effect.',
		],
	},
	{
		id: 'contact',
		title: 'Contact us',
		paragraphs: [
			'For any question about this policy, a data request, or a privacy concern, use the contact form and choose the "General support" topic. We reply within one business day, Monday to Friday.',
		],
	},
];

export default function PrivacyPage() {
	return (
		<LegalPage
			eyebrow='Legal'
			title='Privacy Policy'
			intro='What Survey Ifnoss collects, why, and what you can do about it — in plain language.'
			updated='28 October 2026'
			sections={sections}
		/>
	);
}
