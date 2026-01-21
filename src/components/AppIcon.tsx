import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'ref'> {
	name: string;
}

function Icon({
	name,
	size = 24,
	color = 'currentColor',
	className = '',
	strokeWidth = 2,
	...props
}: IconProps) {
	const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as
		| ComponentType<LucideProps>
		| undefined;

	if (!IconComponent) {
		return (
			<HelpCircle
				size={size}
				color='gray'
				strokeWidth={strokeWidth}
				className={className}
				{...props}
			/>
		);
	}

	return (
		<IconComponent
			size={size}
			color={color}
			strokeWidth={strokeWidth}
			className={className}
			{...props}
		/>
	);
}

export default Icon;
