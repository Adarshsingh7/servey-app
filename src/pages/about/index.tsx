import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Heart, Globe, Lightbulb, Users, Shield } from 'lucide-react';
import { PublicNavbar, PublicFooter } from '@/pages/landing/components/PublicLayout';

const values = [
	{
		icon: Target,
		title: 'Purposeful simplicity',
		desc: 'We strip away everything that slows you down. Every feature earns its place by making survey creation faster or results clearer.',
	},
	{
		icon: Heart,
		title: 'Built for educators first',
		desc: 'Teachers and students shaped every design decision. The QR sharing, the response gates, the analytics — all born from classroom needs.',
	},
	{
		icon: Shield,
		title: 'Honest pricing',
		desc: 'Free means free. No trial traps, no surprise limits, no dark patterns. Premium is transparent and cancellable any time.',
	},
	{
		icon: Globe,
		title: 'Accessible by default',
		desc: 'Forms work on any device, in any browser. Designed to reach respondents wherever they are, without friction.',
	},
	{
		icon: Lightbulb,
		title: 'Continuous improvement',
		desc: 'Survey Ifnoss ships updates based on real user feedback. When educators ask for something, we build it.',
	},
	{
		icon: Users,
		title: 'Community-driven',
		desc: 'Built alongside a community of thousands of educators and researchers who use Survey Ifnoss daily.',
	},
];

const team = [
	{
		name: 'Adarsh Singh',
		role: 'Founder & Developer',
		initials: 'AS',
		bio: 'Full-stack developer with a focus on building tools that solve real problems in education and data collection.',
	},
	{
		name: 'Product Team',
		role: 'Design & Development',
		initials: 'PT',
		bio: 'A small, focused team building Survey Ifnoss with care — choosing quality over speed at every step.',
	},
	{
		name: 'Our Users',
		role: 'The real co-creators',
		initials: 'U',
		bio: 'Every feature in Survey Ifnoss was shaped by feedback from educators, students, and teams who use it every week.',
	},
];

const milestones = [
	{ year: '2024', event: 'Survey Ifnoss launched with core survey builder' },
	{ year: '2024', event: 'Added real-time analytics and QR code sharing' },
	{ year: '2025', event: 'Premium plan launched with team collaboration' },
	{ year: '2025', event: 'IFNOSS institutional integration rolled out' },
	{ year: '2025', event: 'Crossed 10,000 surveys and 2M+ responses' },
];

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
	show: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
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
							About Survey Ifnoss
						</p>
						<h1 className='text-5xl md:text-7xl font-black tracking-tight leading-[1.02] text-foreground mb-6'>
							We build tools
							<br />
							educators love.
						</h1>
						<p className='text-xl text-muted-foreground leading-relaxed'>
							Survey Ifnoss started as a side project by developers who were frustrated with
							bloated survey tools. We wanted something clean, fast, and actually free
							— so we built it.
						</p>
					</motion.div>
				</div>
			</section>

			{/* ── Mission ── */}
			<section
				id='mission'
				className='py-16 border-y border-border bg-muted/20'
			>
				<div className='max-w-7xl mx-auto px-6'>
					<div className='grid md:grid-cols-2 gap-12 items-center'>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-4'>
								Our mission
							</p>
							<h2 className='text-3xl md:text-4xl font-black tracking-tight text-foreground mb-5'>
								Make data collection
								<br />
								simple and honest.
							</h2>
							<p className='text-muted-foreground leading-relaxed mb-4'>
								Most survey tools are designed to extract maximum revenue from users
								through confusing limits and paywalls. We believe survey creation should
								be straightforward: build, share, analyze. That's it.
							</p>
							<p className='text-muted-foreground leading-relaxed'>
								Survey Ifnoss is built specifically for classrooms, institutions, and teams
								that need reliable data collection without an enterprise budget or a
								computer science degree.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className='grid grid-cols-2 gap-4'
						>
							{[
								{ value: '10K+', label: 'Surveys created' },
								{ value: '2M+', label: 'Responses collected' },
								{ value: '150+', label: 'Institutions' },
								{ value: '98%', label: 'Satisfaction' },
							].map((s) => (
								<div
									key={s.label}
									className='rounded-2xl border border-border bg-card p-6 text-center'
								>
									<p className='text-4xl font-black text-primary tabular-nums'>
										{s.value}
									</p>
									<p className='text-sm text-muted-foreground mt-1'>{s.label}</p>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			{/* ── Values ── */}
			<section
				id='values'
				className='py-24 md:py-32'
			>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='mb-14'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-3'>
							What we believe
						</p>
						<h2 className='text-4xl font-black tracking-tight text-foreground'>
							Our values
						</h2>
					</motion.div>

					<motion.div
						variants={stagger}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true }}
						className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
					>
						{values.map((v) => (
							<motion.div
								key={v.title}
								variants={fadeUp}
								className='rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors'
							>
								<div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4'>
									<v.icon className='w-5 h-5 text-primary' />
								</div>
								<h3 className='text-base font-semibold text-foreground mb-2'>
									{v.title}
								</h3>
								<p className='text-sm text-muted-foreground leading-relaxed'>
									{v.desc}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* ── Timeline ── */}
			<section
				id='story'
				className='py-24 bg-muted/20 border-y border-border'
			>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='mb-14'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-3'>
							Our journey
						</p>
						<h2 className='text-4xl font-black tracking-tight text-foreground'>
							How we got here
						</h2>
					</motion.div>

					<div className='max-w-2xl space-y-0'>
						{milestones.map((m, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className='flex gap-6 pb-8 last:pb-0 relative'
							>
								<div className='flex flex-col items-center'>
									<div className='w-3 h-3 rounded-full bg-primary mt-1.5 shrink-0 relative z-10' />
									{i < milestones.length - 1 && (
										<div className='w-px flex-1 bg-border mt-2' />
									)}
								</div>
								<div className='pb-2'>
									<span className='text-xs font-mono font-bold text-primary/70 uppercase tracking-widest'>
										{m.year}
									</span>
									<p className='text-base text-foreground mt-1'>{m.event}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ── Team ── */}
			<section
				id='team'
				className='py-24 md:py-32'
			>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='mb-14'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-3'>
							The people
						</p>
						<h2 className='text-4xl font-black tracking-tight text-foreground'>
							Built with care.
						</h2>
					</motion.div>

					<div className='grid md:grid-cols-3 gap-6'>
						{team.map((member, i) => (
							<motion.div
								key={member.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className='rounded-2xl border border-border bg-card p-6'
							>
								<div className='w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center text-primary font-black text-lg mb-4'>
									{member.initials}
								</div>
								<h3 className='text-base font-bold text-foreground'>{member.name}</h3>
								<p className='text-xs text-primary/80 font-medium mb-3'>
									{member.role}
								</p>
								<p className='text-sm text-muted-foreground leading-relaxed'>
									{member.bio}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ── CTA ── */}
			<section className='py-16 border-t border-border bg-muted/20'>
				<div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8'>
					<div>
						<h2 className='text-2xl font-black text-foreground'>
							Ready to try it yourself?
						</h2>
						<p className='text-muted-foreground mt-1'>
							Start free — no credit card, no time limits.
						</p>
					</div>
					<div className='flex items-center gap-4 shrink-0'>
						<Link
							to='/contact'
							className='text-sm text-muted-foreground border border-border rounded-xl px-6 py-2.5 hover:bg-accent transition-colors'
						>
							Contact us
						</Link>
						<Link
							to='/auth'
							className='inline-flex items-center gap-2 text-sm font-semibold bg-primary text-primary-foreground rounded-xl px-6 py-2.5 hover:bg-primary/90 transition-colors'
						>
							Get started free
							<ArrowRight className='w-4 h-4' />
						</Link>
					</div>
				</div>
			</section>

			<PublicFooter />
		</div>
	);
}
