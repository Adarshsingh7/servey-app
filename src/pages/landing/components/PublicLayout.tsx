import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, BarChart3 } from 'lucide-react';

const navLinks = [
	{ label: 'Features', href: '/#features' },
	{ label: 'How It Works', href: '/#how-it-works' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
];

export function PublicNavbar() {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	const isActive = (href: string) => location.pathname === href;

	return (
		<nav className='fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50'>
			<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
				{/* Logo */}
				<Link
					to='/'
					className='flex items-center gap-2 group'
				>
					<div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform'>
						<BarChart3 className='w-4 h-4 text-primary-foreground' />
					</div>
					<span className='text-lg font-bold tracking-tight text-foreground'>
						Survey Ifnoss
					</span>
				</Link>

				{/* Desktop nav */}
				<div className='hidden md:flex items-center gap-1'>
					{navLinks.map((link) => (
						<Link
							key={link.label}
							to={link.href}
							className={`px-4 py-2 text-sm rounded-md transition-colors ${
								isActive(link.href)
									? 'text-primary bg-primary/10 font-medium'
									: 'text-muted-foreground hover:text-foreground hover:bg-accent'
							}`}
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* CTA buttons */}
				<div className='hidden md:flex items-center gap-3'>
					<Link
						to='/auth'
						className='text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2'
					>
						Sign in
					</Link>
					<Link
						to='/auth'
						className='text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'
					>
						Get started free
					</Link>
				</div>

				{/* Mobile toggle */}
				<button
					className='md:hidden p-2 text-muted-foreground hover:text-foreground'
					onClick={() => setOpen(!open)}
					aria-label='Toggle menu'
				>
					{open ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
				</button>
			</div>

			{/* Mobile menu */}
			{open && (
				<div className='md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-2'>
					{navLinks.map((link) => (
						<Link
							key={link.label}
							to={link.href}
							onClick={() => setOpen(false)}
							className='py-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
						>
							{link.label}
						</Link>
					))}
					<div className='pt-3 mt-1 border-t border-border flex flex-col gap-2'>
						<Link
							to='/auth'
							onClick={() => setOpen(false)}
							className='py-2 text-sm text-center text-muted-foreground border border-border rounded-lg hover:bg-accent transition-colors'
						>
							Sign in
						</Link>
						<Link
							to='/auth'
							onClick={() => setOpen(false)}
							className='py-2 text-sm text-center font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'
						>
							Get started free
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}

export function PublicFooter() {
	return (
		<footer className='border-t border-border bg-muted/30'>
			<div className='max-w-7xl mx-auto px-6 py-14'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-10 mb-12'>
					<div className='col-span-2 md:col-span-1'>
						<Link
							to='/'
							className='flex items-center gap-2 mb-4'
						>
							<div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center'>
								<BarChart3 className='w-4 h-4 text-primary-foreground' />
							</div>
							<span className='text-base font-bold text-foreground'>Survey Ifnoss</span>
						</Link>
						<p className='text-sm text-muted-foreground leading-relaxed max-w-xs'>
							Professional survey builder for educators and teams. Create, share,
							and analyze surveys in minutes.
						</p>
					</div>

					<div>
						<p className='text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4'>
							Product
						</p>
						<div className='flex flex-col gap-2'>
							{[
								{ label: 'Features', href: '/#features' },
								{ label: 'How It Works', href: '/#how-it-works' },
							].map((l) => (
								<Link
									key={l.label}
									to={l.href}
									className='text-sm text-muted-foreground hover:text-foreground transition-colors'
								>
									{l.label}
								</Link>
							))}
						</div>
					</div>

					<div>
						<p className='text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4'>
							Company
						</p>
						<div className='flex flex-col gap-2'>
							{[
								{ label: 'About', href: '/about' },
								{ label: 'Contact', href: '/contact' },
							].map((l) => (
								<Link
									key={l.label}
									to={l.href}
									className='text-sm text-muted-foreground hover:text-foreground transition-colors'
								>
									{l.label}
								</Link>
							))}
						</div>
					</div>

					<div>
						<p className='text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4'>
							Get Started
						</p>
						<div className='flex flex-col gap-2'>
							{[
								{ label: 'Create account', href: '/auth' },
								{ label: 'Sign in', href: '/auth' },
							].map((l) => (
								<Link
									key={l.label}
									to={l.href}
									className='text-sm text-muted-foreground hover:text-foreground transition-colors'
								>
									{l.label}
								</Link>
							))}
						</div>
					</div>
				</div>

				<div className='pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4'>
					<p className='text-xs text-muted-foreground'>
						© 2025 Survey Ifnoss. Built for educators and teams.
					</p>
					<div className='flex items-center gap-6'>
						<Link
							to='/about'
							className='text-xs text-muted-foreground hover:text-foreground transition-colors'
						>
							Privacy
						</Link>
						<Link
							to='/about'
							className='text-xs text-muted-foreground hover:text-foreground transition-colors'
						>
							Terms
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
