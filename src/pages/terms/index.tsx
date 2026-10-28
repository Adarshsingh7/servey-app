import LegalPage, { type LegalSection } from '@/pages/legal/LegalPage';

const sections: LegalSection[] = [
	{
		id: 'agreement',
		title: 'The agreement',
		paragraphs: [
			'These terms apply when you use Survey Ifnoss — the website, the survey builder, and the pages where people answer your surveys. By creating an account or submitting a response, you agree to them.',
			'If you are accepting on behalf of a school, college, or organization, you confirm you are allowed to do so and that these terms bind that institution.',
		],
	},
	{
		id: 'accounts',
		title: 'Your account',
		bullets: [
			{
				term: 'Eligibility',
				text: 'You must be at least 13 years old to hold an account. Institutional accounts are created and managed by the institution.',
			},
			{
				term: 'Accurate details',
				text: 'Keep your name and email current so we can reach you about your account.',
			},
			{
				term: 'Security',
				text: 'You are responsible for what happens under your account. Keep your password private and tell us promptly if you think someone else has access.',
			},
			{
				term: 'One person per account',
				text: 'Accounts are personal. Do not share sign-in credentials with others.',
			},
		],
	},
	{
		id: 'plans-and-billing',
		title: 'Plans and billing',
		paragraphs: [
			'The Free plan is free indefinitely and covers 3 active surveys with up to 50 responses each. There is no trial period and no card required.',
			'Premium costs ₹499 per month and lifts those limits. It renews monthly until you cancel, and you can cancel at any time from the app — your Premium features stay available until the end of the period you have already paid for. We do not pro-rate partial months.',
			'If we change the price of a plan, we will tell you before it applies to your next renewal. Taxes may be added where required.',
		],
	},
	{
		id: 'acceptable-use',
		title: 'Acceptable use',
		paragraphs: ['You agree not to use Survey Ifnoss to:'],
		bullets: [
			{
				text: 'collect data through deception, including impersonating another person, organization, or Survey Ifnoss itself;',
			},
			{
				text: 'phish for passwords, payment details, government identifiers, or other credentials;',
			},
			{
				text: 'send unsolicited bulk messages, or distribute malware or harmful links;',
			},
			{
				text: 'harass, threaten, or target an individual, or publish unlawful content;',
			},
			{
				text: 'attempt to break, overload, or gain unauthorized access to the service or anyone else’s data;',
			},
			{
				text: 'scrape or automate the service in ways that disrupt it for others.',
			},
		],
	},
	{
		id: 'your-content',
		title: 'Your surveys and data',
		paragraphs: [
			'Your surveys and the responses you collect remain yours. You give us only the permission we need to host, process, and display them so the service works — nothing more, and only for as long as you keep them with us.',
			'You can export your responses and delete your surveys at any time.',
		],
	},
	{
		id: 'respondents',
		title: 'Responsibility for respondents',
		paragraphs: [
			'When you run a survey, you decide what to ask and who to ask. That makes you responsible for how the data is collected and used, including obtaining any consent your institution or local law requires.',
			'Tell respondents what you will do with their answers, and honour it. Do not use Survey Ifnoss to collect passwords, payment card numbers, government identifiers, or health records unless you have a lawful basis and the appropriate safeguards in place.',
		],
	},
	{
		id: 'availability',
		title: 'Availability and changes',
		paragraphs: [
			'We work to keep Survey Ifnoss running, but we do not guarantee uninterrupted access. Maintenance, outages, and changes to features happen. We will give notice before removing something you rely on where we reasonably can.',
			'The service is provided as it is, without warranties beyond those the law requires us to give.',
		],
	},
	{
		id: 'suspension',
		title: 'Suspension and termination',
		paragraphs: [
			'You can close your account whenever you like. We may suspend or close an account that breaches these terms, puts other users at risk, or is used unlawfully — ordinarily after telling you and giving you a chance to put it right, unless the problem is urgent.',
			'If we close your account, you can ask us to export your data for 30 days afterwards.',
		],
	},
	{
		id: 'liability',
		title: 'Limits of liability',
		paragraphs: [
			'To the extent the law allows, Survey Ifnoss is not liable for indirect or consequential losses, lost profits, or lost data arising from your use of the service. Where liability cannot be excluded, it is limited to the amount you paid us in the twelve months before the claim.',
			'Nothing here limits liability for fraud, or for anything that cannot lawfully be limited.',
		],
	},
	{
		id: 'changes-to-terms',
		title: 'Changes to these terms',
		paragraphs: [
			'We may update these terms as the service changes. The date at the top of the page shows when they last changed, and we will announce material changes in the app before they take effect. Continuing to use Survey Ifnoss after that means you accept the updated terms.',
		],
	},
	{
		id: 'governing-law',
		title: 'Governing law',
		paragraphs: [
			'These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute arising from them.',
		],
	},
	{
		id: 'contact',
		title: 'Contact us',
		paragraphs: [
			'Questions about these terms, a billing issue, or a report of misuse: use the contact form and pick the topic that fits. We reply within one business day, Monday to Friday.',
		],
	},
];

export default function TermsPage() {
	return (
		<LegalPage
			eyebrow='Legal'
			title='Terms of Service'
			intro='The rules for using Survey Ifnoss — what you can expect from us, and what we expect from you.'
			updated='28 October 2026'
			sections={sections}
		/>
	);
}
