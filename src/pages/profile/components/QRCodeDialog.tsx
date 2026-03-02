'use client';

import * as React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import QRCode from 'react-qr-code';

interface QRCodeDialogProps {
	responseId: string | null;
	onOpenChange: (open: boolean) => void;
}

export default function QRCodeDialog({
	responseId,
	onOpenChange,
}: QRCodeDialogProps) {
	// Determine open state based on the presence of responseId
	const isOpen = Boolean(responseId);

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

				<div className='bg-white p-4 rounded-xl shadow-inner border'>
					{responseId && (
						<QRCode
							size={256}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={`${import.meta.env.VITE_FRONTEND_URL}/preview/${responseId}`}
							viewBox={`0 0 256 256`}
						/>
					)}
				</div>

				<div className='text-xs text-muted-foreground break-all px-4 text-center'>
					{import.meta.env.VITE_FRONTEND_URL}/preview/{responseId}
				</div>
			</DialogContent>
		</Dialog>
	);
}
