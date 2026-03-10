// components/SurveyStatsCards.tsx
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, FileEdit, Users } from 'lucide-react';

interface StatsProps {
	surveys: any[];
	totalApplies: number;
}

export function SurveyStatsCards({ surveys, totalApplies }: StatsProps) {
	const stats = {
		active: surveys.filter((s) => s.status === 'live').length,
		completed: surveys.filter((s) => s.status === 'completed').length,
		drafted: surveys.filter((s) => s.status === 'drafted').length,
		// Assuming 'applies' or 'responses' is the count field
		totalApplies: totalApplies,
	};

	const items = [
		{
			label: 'Live Survey',
			value: stats.active,
			icon: Clock,
			color: 'text-emerald-600',
			bg: 'bg-emerald-50',
		},
		{
			label: 'Completed Survey',
			value: stats.completed,
			icon: CheckCircle2,
			color: 'text-blue-600',
			bg: 'bg-blue-50',
		},
		{
			label: 'Drafted Survey',
			value: stats.drafted,
			icon: FileEdit,
			color: 'text-amber-600',
			bg: 'bg-amber-50',
		},
		{
			label: 'Total Applies',
			value: stats.totalApplies,
			icon: Users,
			color: 'text-purple-600',
			bg: 'bg-purple-50',
		},
	];

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
			{items.map((item) => (
				<Card
					key={item.label}
					className='border border-border/50 shadow-sm hover:shadow-md transition-all duration-200'
				>
					<CardContent className='p-2'>
						<div className='flex items-center justify-between'>
							<div className='space-y-1'>
								<div className='text-sm font-medium text-muted-foreground uppercase tracking-wider flex gap-2 items-center justify-between'>
									<item.icon className={`h-6 w-6 ${item.color}`} />
									{item.label}
									<p className='text-xl font-bold tracking-tight'>
										{item.value}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
