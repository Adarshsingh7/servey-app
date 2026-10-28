import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
	Building2,
	Send,
	ArrowRight,
	CheckCircle2,
	HelpCircle,
	Zap,
	Users,
} from 'lucide-react';
import { PublicNavbar, PublicFooter } from '@/pages/landing/components/PublicLayout';

const contactTopics = [
	{
		icon: HelpCircle,
		title: 'General support',
		desc: 'Questions about using Survey Ifnoss, troubleshooting, or account help.',
		tag: 'support',
	},
	{
		icon: Building2,
		title: 'Institutional access',
		desc: 'IFNOSS sign-in setup, bulk accounts, or custom domain integration.',
		tag: 'institutional',
	},
	{
		icon: Zap,
		title: 'Feature requests',
		desc: 'Tell us what you need. Most of our best features came from user requests.',
		tag: 'feedback',
	},
	{
		icon: Users,
		title: 'Partnership',
		desc: 'Interested in using Survey Ifnoss across your institution or organization?',
		tag: 'partnership',
	},
];

const faqs = [
	{
		q: 'Is Survey Ifnoss really free?',
		a: 'Yes — the Free plan is free forever with no trial period. You get 3 surveys, 50 responses each, and core analytics at no cost.',
	},
	{
		q: 'How do I share a survey with my class?',
		a: 'Every survey gets a unique link and a QR code instantly. Project the QR code, share the link — students can respond from any device.',
	},
	{
		q: 'Can I export my responses?',
		a: 'Yes, with the Premium plan. You can download all responses as CSV or JSON for analysis in Excel, Google Sheets, or any tool you prefer.',
	},
	{
		q: 'What is IFNOSS sign-in?',
		a: 'IFNOSS is an institutional sign-in integration that lets students and teachers authenticate with their institution credentials.',
	},
	{
		q: 'How do I upgrade to Premium?',
		a: 'Go to the Pricing page from your dashboard. Premium is ₹499/month and can be cancelled anytime with no penalties.',
	},
	{
		q: 'Is my data private?',
		a: 'Yes. Survey responses are stored securely and are only accessible to the survey owner. We do not sell or share your data.',
	},
];

export default function ContactPage() {
	const [form, setForm] = useState({
		name: '',
		email: '',
		topic: '',
		message: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [activeFaq, setActiveFaq] = useState<number | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, this would call an API
		setSubmitted(true);
	};

	return (
		<div className='min-h-screen bg-background text-foreground'>
			<PublicNavbar />

			{/* ── Hero ── */}
			<section className='pt-32 pb-20 md:pt-40 md:pb-24'>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='max-w-2xl'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-4'>
							Contact
						</p>
						<h1 className='text-5xl md:text-6xl font-black tracking-tight leading-[1.02] text-foreground mb-5'>
							We'd love to
							<br />
							hear from you.
						</h1>
						<p className='text-xl text-muted-foreground leading-relaxed'>
							Have a question, feedback, or a partnership idea? Send us a message and
							we'll get back to you within one business day.
						</p>
					</motion.div>
				</div>
			</section>

			{/* ── Contact topics ── */}
			<section className='pb-20'>
				<div className='max-w-7xl mx-auto px-6'>
					<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16'>
						{contactTopics.map((topic, i) => (
							<motion.button
								key={topic.tag}
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.08 }}
								onClick={() => setForm((f) => ({ ...f, topic: topic.tag }))}
								className={`rounded-2xl border p-5 text-left transition-all ${
									form.topic === topic.tag
										? 'border-primary bg-primary/10'
										: 'border-border bg-card hover:border-primary/40 hover:bg-accent/50'
								}`}
							>
								<div
									className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
										form.topic === topic.tag
											? 'bg-primary/20'
											: 'bg-muted'
									}`}
								>
									<topic.icon
										className={`w-5 h-5 ${
											form.topic === topic.tag
												? 'text-primary'
												: 'text-muted-foreground'
										}`}
									/>
								</div>
								<h3
									className={`text-sm font-semibold mb-1 ${
										form.topic === topic.tag ? 'text-primary' : 'text-foreground'
									}`}
								>
									{topic.title}
								</h3>
								<p className='text-xs text-muted-foreground leading-relaxed'>
									{topic.desc}
								</p>
							</motion.button>
						))}
					</div>

					{/* ── Main content: form + info ── */}
					<div className='grid lg:grid-cols-[1fr_380px] gap-10'>
						{/* Form */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
							className='rounded-2xl border border-border bg-card p-8'
						>
							{submitted ? (
								<div className='flex flex-col items-center justify-center h-full py-16 text-center'>
									<div className='w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-6'>
										<CheckCircle2 className='w-8 h-8 text-primary' />
									</div>
									<h3 className='text-2xl font-black text-foreground mb-3'>
										Message sent!
									</h3>
									<p className='text-muted-foreground mb-8 max-w-sm'>
										We'll get back to you at{' '}
										<strong>{form.email || 'your email'}</strong> within one business
										day.
									</p>
									<button
										onClick={() => {
											setSubmitted(false);
											setForm({ name: '', email: '', topic: '', message: '' });
										}}
										className='text-sm text-primary hover:underline'
									>
										Send another message
									</button>
								</div>
							) : (
								<form
									onSubmit={handleSubmit}
									className='space-y-5'
								>
									<div>
										<h2 className='text-xl font-black text-foreground mb-1'>
											Send us a message
										</h2>
										<p className='text-sm text-muted-foreground'>
											Fill in the details below and we'll respond promptly.
										</p>
									</div>

									<div className='grid sm:grid-cols-2 gap-4'>
										<div className='space-y-1.5'>
											<label className='text-xs font-medium text-foreground'>
												Full name *
											</label>
											<input
												type='text'
												value={form.name}
												onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
												placeholder='Your name'
												required
												className='w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'
											/>
										</div>
										<div className='space-y-1.5'>
											<label className='text-xs font-medium text-foreground'>
												Email address *
											</label>
											<input
												type='email'
												value={form.email}
												onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
												placeholder='you@example.com'
												required
												className='w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'
											/>
										</div>
									</div>

									<div className='space-y-1.5'>
										<label className='text-xs font-medium text-foreground'>
											Topic
										</label>
										<select
											value={form.topic}
											onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
											className='w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'
										>
											<option value=''>Select a topic</option>
											<option value='support'>General support</option>
											<option value='institutional'>Institutional access</option>
											<option value='feedback'>Feature request</option>
											<option value='partnership'>Partnership</option>
											<option value='other'>Other</option>
										</select>
									</div>

									<div className='space-y-1.5'>
										<label className='text-xs font-medium text-foreground'>
											Message *
										</label>
										<textarea
											value={form.message}
											onChange={(e) =>
												setForm((f) => ({ ...f, message: e.target.value }))
											}
											placeholder='Tell us what you need...'
											required
											rows={5}
											className='w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none'
										/>
									</div>

									<button
										type='submit'
										className='inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20'
									>
										<Send className='w-4 h-4' />
										Send message
									</button>
								</form>
							)}
						</motion.div>

						{/* Side info */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
							className='space-y-6'
						>
							{/* Quick links */}
							<div className='rounded-2xl border border-border bg-card p-6'>
								<h3 className='text-base font-bold text-foreground mb-4'>
									Helpful links
								</h3>
								<div className='space-y-2'>
									{[
										{ label: 'View pricing plans', href: '/pricing-info' },
										{ label: 'About Survey Ifnoss', href: '/about' },
										{ label: 'Create a free account', href: '/auth' },
									].map((l) => (
										<Link
											key={l.label}
											to={l.href}
											className='flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group'
										>
											<span>{l.label}</span>
											<ArrowRight className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity' />
										</Link>
									))}
								</div>
							</div>

							{/* For institutions */}
							<div className='rounded-2xl bg-primary/10 border border-primary/20 p-6'>
								<div className='w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-3'>
									<Building2 className='w-4 h-4 text-primary' />
								</div>
								<h3 className='text-sm font-bold text-foreground mb-2'>
									For institutions
								</h3>
								<p className='text-xs text-muted-foreground leading-relaxed mb-4'>
									Schools, colleges, and organizations get volume access, IFNOSS
									integration, and dedicated support.
								</p>
								<button
									onClick={() => setForm((f) => ({ ...f, topic: 'institutional' }))}
									className='text-xs font-semibold text-primary hover:underline'
								>
									Contact about institutional access →
								</button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ── FAQ ── */}
			<section className='py-24 border-t border-border bg-muted/20'>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='mb-12'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-3'>
							FAQ
						</p>
						<h2 className='text-4xl font-black tracking-tight text-foreground'>
							Common questions
						</h2>
					</motion.div>

					<div className='max-w-3xl space-y-3'>
						{faqs.map((faq, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 12 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.05 }}
								className='rounded-xl border border-border bg-card overflow-hidden'
							>
								<button
									onClick={() => setActiveFaq(activeFaq === i ? null : i)}
									className='w-full flex items-center justify-between px-5 py-4 text-left'
								>
									<span className='text-sm font-semibold text-foreground'>
										{faq.q}
									</span>
									<span
										className={`w-5 h-5 rounded-full border border-border flex items-center justify-center text-muted-foreground text-xs transition-transform shrink-0 ml-4 ${
											activeFaq === i ? 'rotate-45' : ''
										}`}
									>
										+
									</span>
								</button>
								{activeFaq === i && (
									<div className='px-5 pb-4'>
										<p className='text-sm text-muted-foreground leading-relaxed'>
											{faq.a}
										</p>
									</div>
								)}
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<PublicFooter />
		</div>
	);
}
