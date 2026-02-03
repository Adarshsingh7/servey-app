function SuccessPage() {
	return (
		<div className='min-h-screen bg-slate-50 py-8 px-4'>
			<div className='max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center'>
				<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
					<svg
						className='w-8 h-8 text-green-600'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M5 13l4 4L19 7'
						/>
					</svg>
				</div>
				<h2 className='text-2xl font-semibold text-slate-800 mb-2'>
					Thank you!
				</h2>
				<p className='text-slate-600'>
					Your response has been submitted successfully.
				</p>
			</div>
		</div>
	);
}

export default SuccessPage;
