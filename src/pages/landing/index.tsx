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
	MousePointerClick,
	Sparkles,
	Activity,
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
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
	show: { transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
	return (
		<div className='min-h-screen bg-background text-foreground overflow-x-hidden'>
			<PublicNavbar />

			{/* ── Hero ── */}
			<section className='relative pt-28 pb-0 md:pt-36 overflow-hidden'>

				{/* Ambient background glows */}
				<div className='pointer-events-none absolute inset-0 overflow-hidden'>
					<div
						className='absolute -top-60 right-0 w-[800px] h-[800px] rounded-full opacity-[0.10]'
						style={{
							background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 65%)',
						}}
					/>
					<div
						className='absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05]'
						style={{
							background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
						}}
					/>
					{/* Subtle grid */}
					<div
						className='absolute inset-0 opacity-[0.025]'
						style={{
							backgroundImage:
								'linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)',
							backgroundSize: '64px 64px',
						}}
					/>
				</div>

				<div className='relative max-w-7xl mx-auto px-6'>
					<div className='grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center'>

						{/* ── Left: text ── */}
						<div className='max-w-xl'>

							{/* Announcement chip */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4 }}
								className='mb-7'
							>
								<span className='inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full pl-1.5 pr-3.5 py-1.5'>
									<span className='flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider'>
										<Sparkles className='w-2.5 h-2.5' />
										New
									</span>
									Team collaboration is now live
								</span>
							</motion.div>

							{/* Headline */}
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.55, delay: 0.08 }}
								className='text-5xl md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-black tracking-tight leading-[1.05] text-foreground mb-6'
							>
								The survey tool
								<br />
								<span
									style={{
										background:
											'linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 60%, #a78bfa) 100%)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										backgroundClip: 'text',
									}}
								>
									people actually
								</span>
								<br />
								complete.
							</motion.h1>

							{/* Sub */}
							<motion.p
								initial={{ opacity: 0, y: 18 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.16 }}
								className='text-lg text-muted-foreground leading-relaxed mb-8 max-w-md'
							>
								Drag-and-drop builder, real-time analytics, QR sharing — all in one
								tool built for educators, institutions, and teams.
							</motion.p>

							{/* CTAs */}
							<motion.div
								initial={{ opacity: 0, y: 18 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.22 }}
								className='flex flex-wrap items-center gap-3 mb-10'
							>
								<Link
									to='/auth'
									className='group inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-semibold px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 text-[15px]'
								>
									Start building free
									<ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-0.5' />
								</Link>
								<Link
									to='/#how-it-works'
									className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[15px] border border-border rounded-xl px-6 py-3.5 hover:bg-accent font-medium'
								>
									See how it works
									<ChevronRight className='w-4 h-4' />
								</Link>
							</motion.div>

							{/* Trust row */}
							<motion.div
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								className='flex items-center gap-4 pb-4'
							>
								<div className='flex -space-x-2.5'>
									{['AS', 'PM', 'RK', 'AB', 'VN'].map((init, i) => (
										<div
											key={i}
											className='w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[9px] font-black text-white'
											style={{ background: `hsl(${215 + i * 18}, 75%, ${40 + i * 5}%)` }}
										>
											{init}
										</div>
									))}
								</div>
								<div>
									<div className='flex items-center gap-0.5 mb-0.5'>
										{[...Array(5)].map((_, i) => (
											<Star key={i} className='w-3 h-3 fill-yellow-400 text-yellow-400' />
										))}
										<span className='text-xs font-bold text-foreground ml-1'>4.9</span>
									</div>
									<p className='text-xs text-muted-foreground'>
										Trusted by{' '}
										<span className='font-semibold text-foreground'>10,000+</span>{' '}
										educators & teams
									</p>
								</div>
							</motion.div>
						</div>

						{/* ── Right: App preview ── */}
						<motion.div
							initial={{ opacity: 0, x: 32, y: 8 }}
							animate={{ opacity: 1, x: 0, y: 0 }}
							transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' as const }}
							className='relative hidden lg:block pt-8 pb-12'
						>
							{/* Main browser mockup */}
							<div className='relative rounded-2xl border border-border/80 bg-card shadow-[0_32px_80px_-12px_rgba(0,0,0,0.18)] overflow-hidden'>
								{/* Browser chrome */}
								<div className='flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/60 backdrop-blur-sm'>
									<span className='w-2.5 h-2.5 rounded-full bg-red-400/90' />
									<span className='w-2.5 h-2.5 rounded-full bg-yellow-400/90' />
									<span className='w-2.5 h-2.5 rounded-full bg-green-400/90' />
									<div className='flex-1 mx-3'>
										<div className='bg-background/70 border border-border rounded-md px-3 py-1 text-[11px] text-muted-foreground flex items-center gap-2 w-56'>
											<div className='w-1.5 h-1.5 rounded-full bg-green-400 shrink-0' />
											formlab.app/create
										</div>
									</div>
								</div>

								{/* App shell */}
								<div className='flex bg-background' style={{ height: '380px' }}>
									{/* Component palette sidebar */}
									<div className='w-44 shrink-0 border-r border-border bg-card/80 p-3 flex flex-col gap-1'>
										<p className='text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-2 mb-2 mt-1'>
											Components
										</p>
										{[
											{ emoji: '✏️', name: 'Text Input', active: false },
											{ emoji: '⭐', name: 'Star Rating', active: true },
											{ emoji: '☑️', name: 'Checkboxes', active: false },
											{ emoji: '📅', name: 'Date Picker', active: false },
											{ emoji: '📊', name: 'NPS Score', active: false },
											{ emoji: '🔢', name: 'Number', active: false },
										].map((item, i) => (
											<div
												key={i}
												className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs cursor-pointer transition-colors select-none ${
													item.active
														? 'bg-primary/12 text-primary font-semibold border border-primary/20'
														: 'text-muted-foreground hover:text-foreground hover:bg-accent'
												}`}
											>
												<span className='text-sm leading-none'>{item.emoji}</span>
												{item.name}
											</div>
										))}
									</div>

									{/* Canvas */}
									<div className='flex-1 p-5 flex flex-col gap-3 overflow-hidden'>
										<div className='mb-2'>
											<p className='text-sm font-bold text-foreground leading-tight'>
												Student Satisfaction Survey
											</p>
											<p className='text-xs text-muted-foreground mt-0.5'>
												3 questions · Draft
											</p>
										</div>

										{[
											{
												type: 'Short text',
												label: 'What did you enjoy most this semester?',
												active: false,
											},
											{
												type: 'Star rating',
												label: 'Rate the overall course quality',
												active: true,
											},
											{
												type: 'Multiple choice',
												label: 'Would you recommend this course?',
												active: false,
											},
										].map((q, i) => (
											<div
												key={i}
												className={`rounded-xl border p-3.5 transition-all ${
													q.active
														? 'border-primary/40 bg-primary/5 shadow-sm shadow-primary/8'
														: 'border-border bg-card/60'
												}`}
											>
												<p className='text-[9px] uppercase tracking-widest font-bold text-muted-foreground/60 mb-1.5'>
													{q.type}
												</p>
												<p className='text-[13px] font-semibold text-foreground leading-snug'>
													{q.label}
												</p>
												{q.active && (
													<div className='flex items-center gap-1 mt-3'>
														{[1, 2, 3, 4, 5].map((n) => (
															<div
																key={n}
																className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
																	n <= 4
																		? 'bg-primary/15 border-primary/30 text-primary'
																		: 'border-border text-muted-foreground/40'
																}`}
															>
																{n}
															</div>
														))}
													</div>
												)}
											</div>
										))}

										<div className='flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-primary/25 text-primary/60 text-xs cursor-pointer hover:bg-primary/5 transition-colors mt-auto'>
											<span className='text-base leading-none font-bold'>+</span>
											Add question
										</div>
									</div>
								</div>
							</div>

							{/* Floating card — live responses */}
							<motion.div
								initial={{ opacity: 0, y: 14, x: 10 }}
								animate={{ opacity: 1, y: 0, x: 0 }}
								transition={{ delay: 0.75, duration: 0.5 }}
								className='absolute -bottom-4 -left-8 bg-card border border-border rounded-2xl shadow-xl p-4 flex items-center gap-3 z-10 w-56'
							>
								<div className='w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0'>
									<Activity className='w-5 h-5 text-emerald-500' />
								</div>
								<div>
									<p className='text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5'>
										Live responses
									</p>
									<div className='flex items-baseline gap-1.5'>
										<p className='text-2xl font-black text-foreground tabular-nums'>248</p>
										<span className='text-xs font-bold text-emerald-500'>↑ 12%</span>
									</div>
								</div>
							</motion.div>

							{/* Floating card — completion */}
							<motion.div
								initial={{ opacity: 0, y: -14, x: -10 }}
								animate={{ opacity: 1, y: 0, x: 0 }}
								transition={{ delay: 0.9, duration: 0.5 }}
								className='absolute -top-4 -right-6 bg-card border border-border rounded-2xl shadow-xl p-4 z-10 w-52'
							>
								<p className='text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2'>
									Completion rate
								</p>
								<div className='flex items-center gap-3'>
									<p className='text-2xl font-black text-primary tabular-nums'>91%</p>
									<div className='flex-1 bg-muted rounded-full h-2 overflow-hidden'>
										<motion.div
											initial={{ width: 0 }}
											animate={{ width: '91%' }}
											transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' as const }}
											className='h-2 rounded-full bg-primary'
										/>
									</div>
								</div>
							</motion.div>

							{/* Floating pill — drag hint */}
							<motion.div
								initial={{ opacity: 0, scale: 0.88 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 1.05, duration: 0.4 }}
								className='absolute top-1/2 -right-5 -translate-y-8 bg-card border border-border rounded-xl shadow-lg px-3 py-2.5 flex items-center gap-2 z-10'
							>
								<MousePointerClick className='w-4 h-4 text-primary' />
								<span className='text-xs font-semibold text-foreground whitespace-nowrap'>
									Drag & drop
								</span>
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Bottom gradient fade */}
				<div className='relative mt-20 h-20 pointer-events-none overflow-hidden'>
					<div
						className='absolute inset-x-0 bottom-0 h-20 opacity-30'
						style={{
							background:
								'radial-gradient(ellipse 70% 100% at 50% 100%, var(--color-primary) 0%, transparent 70%)',
						}}
					/>
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
