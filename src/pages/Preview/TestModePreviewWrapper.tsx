/** @format */

import React, { type PropsWithChildren } from 'react';

function TestModePreviewWrapper({ children }: PropsWithChildren) {
	return (
		<div className='h-screen flex flex-col w-full bg-white border-l border-gray-200'>
			{/* header */}
			<div className='p-4 lg:p-6 border-b border-border bg-card'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-lg lg:text-xl font-heading font-semibold text-foreground mb-1'>
							Live Preview
						</h2>
						<p className='text-xs lg:text-sm text-muted-foreground'>
							See how your survey looks to respondents
						</p>
					</div>
				</div>
			</div>

			<div className='flex-1 overflow-y-auto p-6 bg-gray-50'>{children}</div>
		</div>
	);
}

export default TestModePreviewWrapper;
