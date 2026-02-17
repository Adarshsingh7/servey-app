import {
	Check,
	X,
	ArrowRight,
	Sparkles,
	Infinity as Endless,
	ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/* ─────────────── types ─────────────── */
interface PlanFeature {
	label: string;
	free: string | boolean;
	premium: string | boolean;
}

/* ─────────────── feature matrix ─────────────── */
const featureMatrix: PlanFeature[] = [
	{ label: 'Surveys', free: '3 surveys', premium: 'Unlimited' },
	{ label: 'Responses', free: '50 / survey', premium: 'Unlimited' },
	{
		label: 'Components per survey',
		free: '5 components',
		premium: 'Unlimited',
	},
	{ label: 'Analytics', free: 'Basic view', premium: 'Full dashboard' },
	{ label: 'Response export', free: false, premium: 'CSV & JSON' },
	{ label: 'Authentication gate', free: false, premium: true },
	{ label: 'Custom branding', free: false, premium: true },
	{
		label: 'Survey status control',
		free: 'Draft → Live',
		premium: 'Full workflow',
	},
	{ label: 'Team members', free: 'Solo only', premium: 'Up to 10' },
	{ label: 'API access', free: false, premium: true },
	{ label: 'Priority support', free: false, premium: true },
	{ label: 'Custom domain embed', free: false, premium: true },
];

/* ─────────────── cell ─────────────── */
function Cell({
	value,
	isPremium,
}: {
	value: string | boolean;
	isPremium?: boolean;
}) {
	if (value === false) {
		return <X className='h-4 w-4 text-muted-foreground/30 mx-auto' />;
	}
	if (value === true) {
		return (
			<Check
				className={`h-4 w-4 mx-auto ${isPremium ? 'text-primary' : 'text-foreground/60'}`}
				strokeWidth={2.5}
			/>
		);
	}
	return (
		<span
			className={`text-sm ${isPremium ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
		>
			{value}
		</span>
	);
}

/* ═══════════════ PAGE ═══════════════ */
export default function PricingPage() {
	const navigate = useNavigate();
	const handleFree = () => {
		navigate('/profile');
	};
	const handlePremium = () => {
		toast.info('feature on progress');
	};

	return (
		<div className='min-h-screen bg-background text-foreground'>
			{/* ── Header ── */}
			<div className='max-w-6xl mx-auto px-6 pt-20 pb-16'>
				<span>
					<Link
						to='/profile'
						className='my-5 flex gap-2 text-gray-600 hover:underline'
					>
						<ArrowLeft className='w-4' /> <span>back</span>
					</Link>
				</span>
				<div className='max-w-xl'>
					<p className='text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4'>
						Pricing
					</p>
					<h1 className='text-6xl font-bold tracking-tight leading-[1.05] text-foreground mb-5'>
						One tool.
						<br />
						Two speeds.
					</h1>
					<p className='text-base text-muted-foreground leading-relaxed'>
						Start building surveys for free. When you need more — responses,
						analytics, control — Premium has you covered.
					</p>
				</div>
			</div>

			<Separator className='bg-border' />

			{/* ── Plan cards ── */}
			<div className='max-w-6xl mx-auto px-6 py-16'>
				<div className='grid lg:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border'>
					{/* ─ FREE ─ */}
					<div className='bg-card p-10 flex flex-col'>
						<div className='flex-1'>
							<div className='mb-8'>
								<p className='text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-1'>
									Free
								</p>
								<div className='flex items-baseline gap-1'>
									<span className='text-5xl font-bold text-foreground'>₹0</span>
									<span className='text-sm text-muted-foreground'>forever</span>
								</div>
							</div>

							<p className='text-sm text-muted-foreground mb-10 leading-relaxed'>
								For individuals exploring survey tools. No card needed, no time
								limit.
							</p>

							<div className='space-y-3.5'>
								{[
									'3 active surveys',
									'50 responses per survey',
									'5 components per survey',
									'Basic analytics dashboard',
									'Survey preview & sharing',
									'Draft → Live workflow',
								].map((f) => (
									<div
										key={f}
										className='flex items-center gap-3'
									>
										<Check
											className='h-4 w-4 text-foreground/40 shrink-0'
											strokeWidth={2.5}
										/>
										<span className='text-sm text-foreground'>{f}</span>
									</div>
								))}
								{['Response export', 'Authentication gate', 'API access'].map(
									(f) => (
										<div
											key={f}
											className='flex items-center gap-3'
										>
											<X className='h-4 w-4 text-muted-foreground/25 shrink-0' />
											<span className='text-sm text-muted-foreground'>{f}</span>
										</div>
									),
								)}
							</div>
						</div>

						<div className='mt-10'>
							<Button
								variant='outline'
								className='w-full h-11'
								onClick={handleFree}
							>
								Get started free
							</Button>
						</div>
					</div>

					{/* ─ PREMIUM ─ */}
					<div className='bg-primary p-10 flex flex-col relative overflow-hidden'>
						{/* decorative rings */}
						<div className='absolute -top-24 -right-24 h-72 w-72 rounded-full border border-primary-foreground/10 pointer-events-none' />
						<div className='absolute -top-12 -right-12 h-48 w-48 rounded-full border border-primary-foreground/10 pointer-events-none' />

						<div className='flex-1 relative'>
							<div className='flex items-start justify-between mb-8'>
								<div>
									<div className='flex items-center gap-2 mb-1'>
										<p className='text-xs uppercase tracking-[0.2em] text-primary-foreground/70 font-medium'>
											Premium
										</p>
										<div className='flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2 py-0.5'>
											<Sparkles className='h-3 w-3 text-primary-foreground/70' />
											<span className='text-[10px] text-primary-foreground/70 font-medium uppercase tracking-wide'>
												Popular
											</span>
										</div>
									</div>
									<div className='flex items-baseline gap-1'>
										<span className='text-5xl font-bold text-primary-foreground'>
											₹499
										</span>
										<span className='text-sm text-primary-foreground/60'>
											/ month
										</span>
									</div>
								</div>
								<div className='rounded-xl bg-primary-foreground/10 p-2.5'>
									<Endless className='h-6 w-6 text-primary-foreground/70' />
								</div>
							</div>

							<p className='text-sm text-primary-foreground/70 mb-10 leading-relaxed'>
								For teams and professionals who need scale, depth, and full
								control over their surveys.
							</p>

							<div className='space-y-3.5'>
								{[
									'Unlimited surveys',
									'Unlimited responses',
									'Unlimited components',
									'Advanced analytics & charts',
									'Response export (CSV & JSON)',
									'Authentication gate control',
									'Custom branding & embed',
									'Full status workflow control',
									'Up to 10 team members',
									'REST API access',
									'Priority support',
								].map((f) => (
									<div
										key={f}
										className='flex items-center gap-3'
									>
										<Check
											className='h-4 w-4 text-primary-foreground/70 shrink-0'
											strokeWidth={2.5}
										/>
										<span className='text-sm text-primary-foreground'>{f}</span>
									</div>
								))}
							</div>
						</div>

						<div className='mt-10 relative'>
							<Button
								variant='secondary'
								className='w-full h-11 gap-2 font-semibold'
								onClick={handlePremium}
							>
								Upgrade to Premium
								<ArrowRight className='h-4 w-4' />
							</Button>
							<p className='text-center text-xs text-primary-foreground/50 mt-3'>
								Cancel anytime · No hidden fees
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* ── Comparison table ── */}
			<div className='max-w-6xl mx-auto px-6 pb-20'>
				<div className='mb-8'>
					<h2 className='text-2xl font-bold text-foreground'>Compare plans</h2>
					<p className='text-sm text-muted-foreground mt-1'>
						Every feature, side by side.
					</p>
				</div>

				<div className='rounded-2xl border border-border overflow-hidden'>
					{/* thead */}
					<div className='grid grid-cols-[1fr_160px_160px] bg-muted/40 border-b border-border'>
						<div className='px-6 py-4' />
						<div className='px-6 py-4 border-l border-border text-center'>
							<p className='text-xs uppercase tracking-widest font-semibold text-muted-foreground'>
								Free
							</p>
						</div>
						<div className='px-6 py-4 border-l border-border text-center bg-primary/5'>
							<p className='text-xs uppercase tracking-widest font-semibold text-primary'>
								Premium
							</p>
						</div>
					</div>

					{/* rows */}
					{featureMatrix.map((row, i) => (
						<div
							key={row.label}
							className={`grid grid-cols-[1fr_160px_160px] border-b border-border last:border-0 transition-colors hover:bg-accent/30 ${
								i % 2 === 0 ? 'bg-card' : 'bg-muted/20'
							}`}
						>
							<div className='px-6 py-4 flex items-center'>
								<span className='text-sm text-foreground'>{row.label}</span>
							</div>
							<div className='px-6 py-4 border-l border-border flex items-center justify-center'>
								<Cell value={row.free} />
							</div>
							<div className='px-6 py-4 border-l border-border flex items-center justify-center bg-primary/5'>
								<Cell
									value={row.premium}
									isPremium
								/>
							</div>
						</div>
					))}
				</div>

				{/* ── CTA footer ── */}
				<div className='mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-border bg-card px-8 py-8'>
					<div>
						<h3 className='text-lg font-semibold text-foreground'>
							Ready to collect better responses?
						</h3>
						<p className='text-sm text-muted-foreground mt-1'>
							Start free today. Upgrade when your surveys grow.
						</p>
					</div>
					<div className='flex items-center gap-3 shrink-0'>
						<Button
							variant='ghost'
							onClick={handleFree}
						>
							Stay on Free
						</Button>
						<Button
							onClick={handlePremium}
							className='gap-2'
						>
							Upgrade now
							<ArrowRight className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
