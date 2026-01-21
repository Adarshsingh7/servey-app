import React, { type PropsWithChildren } from 'react';

function TestModePreviewWrapper({ children }: PropsWithChildren) {
	return (
		<div className='h-screen flex flex-col bg-white border-l border-gray-200'>
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

			<div className='flex-1 overflow-y-auto p-6 bg-gray-50'>
				{/* <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200'>
					<h1 className='text-2xl font-bold mb-2'>
						{surveyTitle || 'Untitled Survey'}
					</h1>
					{surveyDescription && (
						<p className='text-gray-600 mb-6'>{surveyDescription}</p>
					)}

					<div className='space-y-6'>
						{components.map((c, i) => (
							<PreviewRenderer
								key={i}
								component={c}
							/>
						))}
					</div>

					{components.length > 0 && (
						<div className='mt-8'>
							<Button
								fullWidth
								size='lg'
							>
								Submit Survey
							</Button>
						</div>
					)}
				</div> */}
				{children}
			</div>
		</div>
	);
}

export default TestModePreviewWrapper;
