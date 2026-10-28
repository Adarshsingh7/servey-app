import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PublicNavbar, PublicFooter } from '@/pages/landing/components/PublicLayout';

export type LegalBullet = {
	term?: string;
	text: string;
};

export type LegalSection = {
	id: string;
	title: string;
	paragraphs?: string[];
	bullets?: LegalBullet[];
};

type LegalPageProps = {
	eyebrow: string;
	title: string;
	intro: string;
	updated: string;
	sections: LegalSection[];
};

export default function LegalPage({
	eyebrow,
	title,
	intro,
	updated,
	sections,
}: LegalPageProps) {
	return (
		<div className='min-h-screen bg-background text-foreground'>
			<PublicNavbar />

			{/* ── Hero ── */}
			<section className='pt-32 pb-12 md:pt-40 md:pb-16'>
				<div className='max-w-7xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='max-w-2xl'
					>
						<p className='text-xs uppercase tracking-widest font-semibold text-primary mb-4'>
							{eyebrow}
						</p>
						<h1 className='text-5xl md:text-6xl font-black tracking-tight leading-[1.02] text-foreground mb-5'>
							{title}
						</h1>
						<p className='text-xl text-muted-foreground leading-relaxed mb-6'>
							{intro}
						</p>
						<p className='text-xs text-muted-foreground'>Last updated {updated}</p>
					</motion.div>
				</div>
			</section>

			{/* ── Body ── */}
			<section className='pb-24'>
				<div className='max-w-7xl mx-auto px-6'>
					<div className='grid lg:grid-cols-[220px_1fr] gap-10'>
						{/* On-this-page nav */}
						<nav className='hidden lg:block'>
							<div className='sticky top-28'>
								<p className='text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4'>
									On this page
								</p>
								<div className='flex flex-col gap-2'>
									{sections.map((s) => (
										<a
											key={s.id}
											href={`#${s.id}`}
											className='text-sm text-muted-foreground hover:text-foreground transition-colors'
										>
											{s.title}
										</a>
									))}
								</div>
							</div>
						</nav>

						<div className='max-w-3xl space-y-10'>
							{sections.map((section, i) => (
								<motion.div
									key={section.id}
									id={section.id}
									initial={{ opacity: 0, y: 12 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: Math.min(i * 0.04, 0.2) }}
									className='scroll-mt-28'
								>
									<h2 className='text-xl font-black tracking-tight text-foreground mb-3'>
										{section.title}
									</h2>

									{section.paragraphs?.map((p, j) => (
										<p
											key={j}
											className='text-sm text-muted-foreground leading-relaxed mb-3'
										>
											{p}
										</p>
									))}

									{section.bullets && (
										<ul className='space-y-2 mt-4'>
											{section.bullets.map((b, j) => (
												<li
													key={j}
													className='flex gap-3 text-sm text-muted-foreground leading-relaxed'
												>
													<span className='w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-[0.45rem]' />
													<span>
														{b.term && (
															<strong className='font-semibold text-foreground'>
																{b.term}:{' '}
															</strong>
														)}
														{b.text}
													</span>
												</li>
											))}
										</ul>
									)}
								</motion.div>
							))}

							{/* Questions */}
							<div className='rounded-2xl bg-primary/10 border border-primary/20 p-6'>
								<h3 className='text-sm font-bold text-foreground mb-2'>
									Questions about this page?
								</h3>
								<p className='text-xs text-muted-foreground leading-relaxed mb-4'>
									Send us a message and we'll get back to you within one business day.
								</p>
								<Link
									to='/contact'
									className='inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline'
								>
									Contact us
									<ArrowRight className='w-3 h-3' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			<PublicFooter />
		</div>
	);
}
