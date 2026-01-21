import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({
	className,
	type,
	label,
	...props
}: React.ComponentProps<'input'> & { label?: string }) {
	return (
		<div className='flex flex-col space-y-1.5'>
			{label && (
				<label
					htmlFor={props.id}
					className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
				>
					{label}
				</label>
			)}
			<input
				type={type}
				data-slot='input'
				className={cn(
					'file:text-foreground placeholder:text-muted-foreground border selection:bg-primary selection:text-primary-foreground dark:bg-input/30  h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					className,
				)}
				{...props}
			/>
		</div>
	);
}

export { Input };
