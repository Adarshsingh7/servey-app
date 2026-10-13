import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
	ArrowRight,
	BarChart3,
	QrCode,
	Layers,
	Lock,
	Download,
	Users,
	Zap,
	ChevronRight,
	Check,
	Star,
	PenLine,
	Share2,
	TrendingUp,
} from 'lucide-react';
import { PublicNavbar, PublicFooter } from './components/PublicLayout';
import DemoSurveyBuilder from './components/DemoSurveyBuilder';

const features = [
	{
		icon: PenLine,
		title: 'Drag & Drop Builder',
		desc: 'Build surveys visually with text fields, multiple choice, ratings, and more. No code required.',
	},
	{
		icon: BarChart3,
		title: 'Real-time Analytics',
		desc: 'Understand responses at a glance with live charts, response counts, and completion rates.',
	},
	{
		icon: QrCode,
		title: 'QR Code Sharing',
		desc: 'Instant QR codes for every survey. Print, project, or share digitally in one click.',
	},
	{
		icon: Download,
		title: 'Export Responses',
		desc: 'Download your data as CSV or JSON. Connect it to your existing workflows easily.',
	},
	{
		icon: Lock,
		title: 'Auth Gate',
		desc: 'Restrict survey access to authenticated users. Perfect for in-class assessments.',
	},
	{
		icon: Users,
		title: 'Team Collaboration',
		desc: 'Invite up to 10 team members on Premium. Manage surveys together, seamlessly.',
	},
];

const steps = [
	{
		icon: Layers,
		step: '01',
		title: 'Build your survey',
		desc: 'Pick from a library of question types and arrange them in minutes using the visual editor.',
	},
	{
		icon: Share2,
		step: '02',
		title: 'Share with your audience',
		desc: 'Distribute via link, QR code, or embed it anywhere. Control who can respond.',
	},
	{
		icon: TrendingUp,
		step: '03',
		title: 'Analyze the results',
		desc: 'View real-time charts and export raw data. Turn responses into decisions fast.',
	},
];

const testimonials = [
	{
		name: 'Priya Mehta',
		role: 'Teacher, Delhi',
		text: 'I use FormLab every week for quick quizzes. The QR code feature means my students can start in seconds — no login needed.',
		rating: 5,
	},
	{
		name: 'Rohan Sharma',
		role: 'Student, IIT Bombay',
		text: 'We ran our entire college fest feedback through FormLab. Analytics were surprisingly powerful for a free tier.',
		rating: 5,
	},
	{
		name: 'Anika Bose',
		role: 'HR Manager',
		text: 'Clean interface, no bloat. The CSV export alone saved our team hours every month.',
		rating: 5,
	},
];

const stats = [
	{ value: '10K+', label: 'Surveys created' },
	{ value: '2M+', label: 'Responses collected' },
	{ value: '98%', label: 'Satisfaction rate' },
	{ value: '150+', label: 'Institutions using it' },
];

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
	show: { transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
	return (
		<div className='min-h-screen bg-background text-foreground overflow-x-hidden'>
			<PublicNavbar />

			{/* ── Hero ── */}
			<section className='pt-32 pb-20 md:pt-40 md:pb-28'>
				<div className='max-w-7xl mx-auto px-6'>
					<div className='max-w-3xl'>
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
						>
							<span className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 mb-6'>
								<Zap className='w-3 h-3' />
								Free to start — No credit card
							</span>
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className='text-5xl md:text-7xl font-black tracking-tight leading-[1.02] text-foreground mb-6'
						>
							Surveys that
							<br />
							<span className='text-primary'>actually get</span>
							<br />
							answered.
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl'
						>
							Build beautiful surveys in minutes. Share via link or QR code. Get
							analytics that matter. Built for educators, teams, and institutions.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className='flex flex-wrap items-center gap-4'
						>
							<Link
								to='/auth'
								className='inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 text-base'
							>
								Start building free
								<ArrowRight className='w-4 h-4' />
							</Link>
							<Link
								to='/#how-it-works'
								className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-base border border-border rounded-xl px-6 py-3 hover:bg-accent'
							>
								See how it works
								<ChevronRight className='w-4 h-4' />
							</Link>
						</motion.div>
					</div>

					{/* Hero visual — abstract survey mockup */}
					<motion.div
						initial={{ opacity: 0, scale: 0.97 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.7, delay: 0.35 }}
						className='mt-16 md:mt-20'
					>
						<div className='relative rounded-2xl border border-border bg-card shadow-xl overflow-hidden max-w-4xl'>
							{/* Browser bar */}
							<div className='flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/40'>
								<span className='w-3 h-3 rounded-full bg-red-400/70' />
								<span className='w-3 h-3 rounded-full bg-yellow-400/70' />
								<span className='w-3 h-3 rounded-full bg-green-400/70' />
								<div className='flex-1 ml-3'>
									<div className='bg-background border border-border rounded px-3 py-1 text-xs text-muted-foreground w-48'>
										formlab.app/survey/...
									</div>
								</div>
							</div>
							{/* Mockup content */}
							<div className='p-6 md:p-8 grid md:grid-cols-2 gap-6'>
								{/* Left: builder */}
								<div className='space-y-3'>
									<p className='text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4'>
										Survey Builder
									</p>
									{[
										{ type: 'Short text', label: 'Your full name' },
										{ type: 'Multiple choice', label: 'Rate your experience' },
										{ type: 'Long text', label: 'Additional feedback' },
									].map((item, i) => (
										<div
											key={i}
											className='rounded-lg border border-border bg-background p-3 flex items-center gap-3'
										>
											<div className='w-2 h-2 rounded-full bg-primary/50 shrink-0' />
											<div className='flex-1 min-w-0'>
												<p className='text-xs text-muted-foreground mb-1'>
													{item.type}
												</p>
												<p className='text-sm font-medium text-foreground truncate'>
													{item.label}
												</p>
											</div>
											<div className='w-4 h-4 text-muted-foreground/30'>⋮⋮</div>
										</div>
									))}
									<button className='w-full rounded-lg border border-dashed border-primary/30 bg-primary/5 text-primary text-sm py-2.5 hover:bg-primary/10 transition-colors'>
										+ Add question
									</button>
								</div>

								{/* Right: analytics */}
								<div className='space-y-4'>
									<p className='text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4'>
										Live Analytics
									</p>
									<div className='grid grid-cols-2 gap-3'>
										{[
											{ label: 'Responses', value: '248' },
											{ label: 'Completion', value: '91%' },
										].map((s) => (
											<div
												key={s.label}
												className='rounded-lg border border-border bg-background p-3'
											>
												<p className='text-xs text-muted-foreground'>{s.label}</p>
												<p className='text-2xl font-black text-primary mt-1'>
													{s.value}
												</p>
											</div>
										))}
									</div>
									{/* Mini bar chart */}
									<div className='rounded-lg border border-border bg-background p-3'>
										<p className='text-xs text-muted-foreground mb-3'>
											Responses over time
										</p>
										<div className='flex items-end gap-1 h-12'>
											{[30, 55, 40, 70, 85, 60, 95, 75, 88, 100, 72, 90].map(
												(h, i) => (
													<div
														key={i}
														className='flex-1 bg-primary/20 rounded-sm transition-all hover:bg-primary/40'
														style={{ height: `${h}%` }}
													/>
												),
											)}
										</div>
									</div>
									<div className='rounded-lg border border-primary/20 bg-primary/5 p-3 flex items-center gap-3'>
										<QrCode className='w-8 h-8 text-primary shrink-0' />
										<div>
											<p className='text-xs font-medium text-foreground'>
												QR code ready
											</p>
											<p className='text-xs text-muted-foreground'>
												Share instantly
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* ── Live Demo ── */}
			<DemoSurveyBuilder />

			{/* ── Stats ── */}
			<section className='py-16 border-y border-border bg-muted/30'>
				<div className='max-w-7xl mx-auto px-6'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
						{stats.map((s, i) => (
							<motion.div
								key={s.label}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.08 }}
								className='text-center'
							>
								<p className='text-4xl md:text-5xl font-black text-primary tabular-nums'>
									{s.value}
								</p>
								<p className='text-sm text-muted-foreground mt-1'>{s.label}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ── Features ── */}
			<section
				id='features'
				className='py-24 md:py-32'
			>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='max-w-2xl mb-16'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-3'>
							Features
						</p>
						<h2 className='text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4'>
							Everything you need.
							<br />
							Nothing you don't.
						</h2>
						<p className='text-muted-foreground text-lg leading-relaxed'>
							FormLab keeps survey creation simple while giving you professional-grade
							tools when you need them.
						</p>
					</motion.div>

					<motion.div
						variants={stagger}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true }}
						className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
					>
						{features.map((f) => (
							<motion.div
								key={f.title}
								variants={fadeUp}
								className='rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-md transition-all group'
							>
								<div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors'>
									<f.icon className='w-5 h-5 text-primary' />
								</div>
								<h3 className='text-base font-semibold text-foreground mb-2'>
									{f.title}
								</h3>
								<p className='text-sm text-muted-foreground leading-relaxed'>
									{f.desc}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* ── How it works ── */}
			<section
				id='how-it-works'
				className='py-24 md:py-32 bg-muted/20 border-y border-border'
			>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='max-w-xl mx-auto text-center mb-16'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-3'>
							How it works
						</p>
						<h2 className='text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4'>
							Live in three steps.
						</h2>
						<p className='text-muted-foreground text-lg'>
							From idea to collected responses in under five minutes.
						</p>
					</motion.div>

					<div className='grid md:grid-cols-3 gap-8 relative'>
						{/* connector line — desktop only */}
						<div className='hidden md:block absolute top-9 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-border' />

						{steps.map((s, i) => (
							<motion.div
								key={s.step}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.15 }}
								className='flex flex-col items-center text-center relative'
							>
								<div className='w-16 h-16 rounded-2xl border-2 border-primary bg-primary/10 flex items-center justify-center mb-6 relative z-10'>
									<s.icon className='w-7 h-7 text-primary' />
								</div>
								<span className='text-xs font-mono font-bold text-muted-foreground/50 mb-1'>
									{s.step}
								</span>
								<h3 className='text-xl font-bold text-foreground mb-3'>{s.title}</h3>
								<p className='text-sm text-muted-foreground leading-relaxed max-w-xs'>
									{s.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ── Pricing teaser ── */}
			<section className='py-24 md:py-32'>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-center mb-14'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-3'>
							Pricing
						</p>
						<h2 className='text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4'>
							One tool. Two speeds.
						</h2>
						<p className='text-muted-foreground text-lg max-w-md mx-auto'>
							Start free. Upgrade when your surveys grow.
						</p>
					</motion.div>

					<div className='grid md:grid-cols-2 gap-6 max-w-3xl mx-auto'>
						{/* Free */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className='rounded-2xl border border-border bg-card p-8 flex flex-col'
						>
							<div className='mb-6'>
								<p className='text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2'>
									Free
								</p>
								<div className='flex items-baseline gap-1'>
									<span className='text-5xl font-black text-foreground'>₹0</span>
									<span className='text-sm text-muted-foreground'>forever</span>
								</div>
							</div>
							<ul className='space-y-3 mb-8 flex-1'>
								{[
									'3 active surveys',
									'50 responses per survey',
									'5 components per survey',
									'Basic analytics',
									'Survey preview & sharing',
								].map((f) => (
									<li
										key={f}
										className='flex items-center gap-3 text-sm'
									>
										<Check className='w-4 h-4 text-foreground/40 shrink-0' />
										<span>{f}</span>
									</li>
								))}
							</ul>
							<Link
								to='/auth'
								className='block text-center text-sm font-medium border border-border rounded-xl py-2.5 hover:bg-accent transition-colors'
							>
								Get started free
							</Link>
						</motion.div>

						{/* Premium */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className='rounded-2xl bg-primary p-8 flex flex-col relative overflow-hidden'
						>
							<div className='absolute -top-20 -right-20 w-64 h-64 rounded-full border border-primary-foreground/10' />
							<div className='absolute -top-8 -right-8 w-40 h-40 rounded-full border border-primary-foreground/10' />
							<div className='mb-6 relative'>
								<div className='flex items-center gap-2 mb-2'>
									<p className='text-xs uppercase tracking-widest font-semibold text-primary-foreground/70'>
										Premium
									</p>
									<span className='text-[10px] font-bold bg-primary-foreground/15 text-primary-foreground/80 px-2 py-0.5 rounded-full uppercase tracking-wide'>
										Popular
									</span>
								</div>
								<div className='flex items-baseline gap-1'>
									<span className='text-5xl font-black text-primary-foreground'>
										₹499
									</span>
									<span className='text-sm text-primary-foreground/60'>/ month</span>
								</div>
							</div>
							<ul className='space-y-3 mb-8 flex-1 relative'>
								{[
									'Unlimited surveys',
									'Unlimited responses',
									'Advanced analytics',
									'CSV & JSON export',
									'Authentication gate',
									'Up to 10 team members',
									'Priority support',
								].map((f) => (
									<li
										key={f}
										className='flex items-center gap-3 text-sm'
									>
										<Check className='w-4 h-4 text-primary-foreground/70 shrink-0' />
										<span className='text-primary-foreground'>{f}</span>
									</li>
								))}
							</ul>
							<Link
								to='/pricing-info'
								className='relative block text-center text-sm font-semibold bg-primary-foreground text-primary rounded-xl py-2.5 hover:bg-primary-foreground/90 transition-colors'
							>
								View full pricing
							</Link>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ── Testimonials ── */}
			<section className='py-24 md:py-32 bg-muted/20 border-y border-border'>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-center mb-14'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-3'>
							Testimonials
						</p>
						<h2 className='text-4xl font-black tracking-tight text-foreground'>
							Trusted by educators & teams.
						</h2>
					</motion.div>

					<motion.div
						variants={stagger}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true }}
						className='grid md:grid-cols-3 gap-6'
					>
						{testimonials.map((t) => (
							<motion.div
								key={t.name}
								variants={fadeUp}
								className='rounded-2xl border border-border bg-card p-6'
							>
								<div className='flex items-center gap-0.5 mb-4'>
									{Array.from({ length: t.rating }).map((_, i) => (
										<Star
											key={i}
											className='w-4 h-4 fill-primary text-primary'
										/>
									))}
								</div>
								<p className='text-sm text-foreground leading-relaxed mb-5'>
									"{t.text}"
								</p>
								<div className='flex items-center gap-3'>
									<div className='w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary'>
										{t.name[0]}
									</div>
									<div>
										<p className='text-sm font-semibold text-foreground'>
											{t.name}
										</p>
										<p className='text-xs text-muted-foreground'>{t.role}</p>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* ── Final CTA ── */}
			<section className='py-24 md:py-32'>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='rounded-3xl bg-primary p-10 md:p-16 text-center relative overflow-hidden'
					>
						<div className='absolute inset-0 opacity-10'>
							<div className='absolute -top-32 -left-32 w-96 h-96 rounded-full border-2 border-primary-foreground' />
							<div className='absolute -bottom-32 -right-32 w-96 h-96 rounded-full border-2 border-primary-foreground' />
						</div>
						<div className='relative'>
							<h2 className='text-4xl md:text-6xl font-black text-primary-foreground tracking-tight mb-4'>
								Start building
								<br />
								for free, today.
							</h2>
							<p className='text-primary-foreground/70 text-lg mb-8 max-w-md mx-auto'>
								No credit card. No time limits. Just better surveys.
							</p>
							<Link
								to='/auth'
								className='inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-primary-foreground/90 transition-all text-base hover:-translate-y-0.5 hover:shadow-xl'
							>
								Create your account
								<ArrowRight className='w-4 h-4' />
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			<PublicFooter />
		</div>
	);
}
