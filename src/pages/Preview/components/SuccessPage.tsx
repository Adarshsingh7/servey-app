import { useState } from 'react';
import { Check, LogOut, Share2, RotateCcw, CopyCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function SuccessPage() {
	const { id } = useParams();
	const router = useNavigate();
	const [copied, setCopied] = useState(false);

	// Modern Share Functionality
	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);

			// Reset "Copied" state after 2 seconds
			setTimeout(() => setCopied(false), 2000);

			// Note: In a real Google app, you'd trigger a Toast component here
			toast.success('link copied to clipboard');
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	const handleResubmitSurvey = function () {
		window.open(`${import.meta.env.VITE_FRONTEND_URL}/preview/${id}`);
	};

	return (
		<div className='min-h-screen bg-background flex items-center justify-center p-6 font-sans antialiased'>
			<div className='w-full max-w-120 bg-card border border-border rounded-3xl p-10 shadow-sm transition-all duration-300 ease-in-out'>
				{/* Success Icon - MD3 Tonal Palette style */}
				<div className='flex justify-center mb-8'>
					<div className='w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center animate-in zoom-in duration-500'>
						<Check className='w-8 h-8 stroke-3' />
					</div>
				</div>

				{/* Header Section */}
				<div className='text-center space-y-3 mb-12'>
					<h1 className='text-3xl font-medium tracking-tight text-foreground'>
						Thank you!
					</h1>
					<p className='text-sm text-muted-foreground max-w-70 mx-auto leading-relaxed'>
						Your response has been recorded and submitted to the cloud
						successfully.
					</p>
				</div>

				{/* Action Grid */}
				<div className='flex flex-col gap-3'>
					<button
						onClick={handleResubmitSurvey} // Simulating a resubmit/reset
						className='group flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.97] hover:opacity-90'
					>
						<RotateCcw className='w-4 h-4 group-hover:-rotate-45 transition-transform' />
						Resubmit Survey
					</button>

					<div className='grid grid-cols-2 gap-3'>
						<button
							onClick={handleShare}
							className={`flex items-center justify-center gap-2 border h-12 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
								copied
									? 'bg-green-500/10 border-green-500/50 text-green-600'
									: 'bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary'
							}`}
						>
							{copied ? (
								<>
									<CopyCheck className='w-4 h-4' />
									Copied
								</>
							) : (
								<>
									<Share2 className='w-4 h-4' />
									Share
								</>
							)}
						</button>

						<button
							onClick={() => window.close()} // Standard exit behavior
							className='flex items-center justify-center gap-2 bg-transparent text-muted-foreground h-12 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.97] hover:bg-muted/50'
						>
							<LogOut className='w-4 h-4' />
							Exit
						</button>
					</div>
				</div>

				{/* Footer Hint */}
				<div className='mt-8 pt-8 border-t border-border/50'>
					<p className='text-center text-[11px] uppercase tracking-widest text-muted-foreground/60 font-bold'>
						Ifnoss Survey • Form ID:{' '}
						<span className='text-foreground/80'>{id || 'OFFLINE'}</span>
					</p>
				</div>
			</div>
		</div>
	);
}
