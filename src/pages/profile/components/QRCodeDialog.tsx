'use client';

import * as React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import QRCode from 'react-qr-code';
import { Check, Copy } from 'lucide-react'; // Standard icons
import { Button } from '@/components/ui/button';

interface QRCodeDialogProps {
	responseId: string | null;
	onOpenChange: (open: boolean) => void;
}

export default function QRCodeDialog({
	responseId,
	onOpenChange,
}: QRCodeDialogProps) {
	const [copied, setCopied] = React.useState(false);
	const isOpen = Boolean(responseId);

	const previewUrl = `${import.meta.env.VITE_FRONTEND_URL}/preview/${responseId}`;

	const handleCopy = async () => {
		if (!previewUrl) return;
		try {
			await navigator.clipboard.writeText(previewUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='sm:max-w-md flex flex-col items-center justify-center gap-6 py-10'>
				<DialogHeader className='text-center'>
					<DialogTitle className='text-xl font-semibold'>
						Scan QR Code
					</DialogTitle>
					<p className='text-sm text-muted-foreground'>
						Scan this to preview the response on your mobile device.
					</p>
				</DialogHeader>

				{/* Clickable QR Code Area */}
				<div
					className='bg-white p-4 rounded-xl shadow-inner border cursor-pointer hover:opacity-90 transition-opacity relative group'
					onClick={handleCopy}
					title='Click to copy link'
				>
					{responseId && (
						<QRCode
							size={256}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={previewUrl}
							viewBox={`0 0 256 256`}
						/>
					)}
				</div>

				{/* Link and Copy Button Section */}
				<div className='flex flex-col items-center gap-3 w-full'>
					<div
						className='text-xs text-muted-foreground break-all px-4 text-center cursor-pointer hover:text-foreground transition-colors'
						onClick={handleCopy}
					>
						{previewUrl}
					</div>

					<Button
						variant='outline'
						size='sm'
						className='flex items-center gap-2 h-8'
						onClick={handleCopy}
					>
						{copied ? (
							<>
								<Check className='w-3.5 h-3.5 text-green-500' />
								<span>Copied!</span>
							</>
						) : (
							<>
								<Copy className='w-3.5 h-3.5' />
								<span>Copy Link</span>
							</>
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
