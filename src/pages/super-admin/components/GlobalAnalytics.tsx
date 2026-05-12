'use client';

import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	AreaChart,
	Area,
	Cell,
	PieChart,
	Pie,
} from 'recharts';
import { 
	Users, 
	FileText, 
	MessageSquare, 
	TrendingUp, 
	Calendar, 
	Clock,
	CheckCircle2,
	AlertCircle,
	ShieldCheck
} from 'lucide-react';
import { useGetGlobalStats } from '@/queries/admin.query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const GlobalAnalytics: React.FC = () => {
	const { data: statsData, isLoading } = useGetGlobalStats();
	const stats = statsData?.data?.data;

	if (isLoading) {
		return (
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-6'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className='h-32 bg-muted/50 animate-pulse rounded-xl border border-border/50' />
				))}
				<div className='col-span-full h-64 bg-muted/30 animate-pulse rounded-xl border border-border/50' />
			</div>
		);
	}

	if (!stats) return null;

	const { totals, usersByRole, surveysByStatus, responseTrend, recentActivity } = stats;

	// Formatting data for Recharts
	const roleData = usersByRole.map((item: any) => ({
		name: item._id === 'superadmin' ? 'Admins' : item._id.charAt(0).toUpperCase() + item._id.slice(1) + 's',
		value: item.count,
	}));

	const statusData = surveysByStatus.map((item: any) => ({
		name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
		value: item.count,
	}));

	const trendData = responseTrend.map((item: any) => ({
		date: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
		responses: item.count,
	}));

	const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

	return (
		<div className='p-6 space-y-8 bg-card/50 min-h-screen'>
			{/* Top Metric Strip */}
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<Card className='border-border/50 shadow-sm bg-background'>
					<CardContent className='pt-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-1'>
								<p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>Total Users</p>
								<p className='text-2xl font-bold tracking-tight'>{totals.users}</p>
							</div>
							<div className='p-2 bg-indigo-50 rounded-lg'>
								<Users className='h-5 w-5 text-indigo-600' />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className='border-border/50 shadow-sm bg-background'>
					<CardContent className='pt-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-1'>
								<p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>Total Surveys</p>
								<p className='text-2xl font-bold tracking-tight'>{totals.surveys}</p>
							</div>
							<div className='p-2 bg-emerald-50 rounded-lg'>
								<FileText className='h-5 w-5 text-emerald-600' />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className='border-border/50 shadow-sm bg-background'>
					<CardContent className='pt-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-1'>
								<p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>Total Responses</p>
								<p className='text-2xl font-bold tracking-tight'>{totals.responses}</p>
							</div>
							<div className='p-2 bg-amber-50 rounded-lg'>
								<MessageSquare className='h-5 w-5 text-amber-600' />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className='border-border/50 shadow-sm bg-background'>
					<CardContent className='pt-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-1'>
								<p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>Avg Engagement</p>
								<p className='text-2xl font-bold tracking-tight'>
									{totals.surveys ? (totals.responses / totals.surveys).toFixed(1) : 0}
								</p>
							</div>
							<div className='p-2 bg-rose-50 rounded-lg'>
								<TrendingUp className='h-5 w-5 text-rose-600' />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Grid */}
			<div className='grid gap-6 lg:grid-cols-3'>
				{/* Response Trend Chart */}
				<Card className='lg:col-span-2 border-border/50 shadow-sm'>
					<CardHeader className='pb-2'>
						<div className='flex items-center justify-between'>
							<div className='space-y-0.5'>
								<CardTitle className='text-sm font-bold tracking-tight uppercase text-muted-foreground'>Response Velocity</CardTitle>
								<CardDescription className='text-[10px]'>Daily responses over the last 30 days</CardDescription>
							</div>
							<Calendar className='h-4 w-4 text-muted-foreground opacity-50' />
						</div>
					</CardHeader>
					<CardContent className='h-[300px] pt-4'>
						{trendData.length > 0 ? (
							<ResponsiveContainer width='100%' height='100%'>
								<AreaChart data={trendData}>
									<defs>
										<linearGradient id='colorRes' x1='0' y1='0' x2='0' y2='1'>
											<stop offset='5%' stopColor='#6366f1' stopOpacity={0.1}/>
											<stop offset='95%' stopColor='#6366f1' stopOpacity={0}/>
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#f1f5f9' />
									<XAxis 
										dataKey='date' 
										axisLine={false} 
										tickLine={false} 
										tick={{ fontSize: 10, fill: '#64748b' }}
										dy={10}
									/>
									<YAxis 
										axisLine={false} 
										tickLine={false} 
										tick={{ fontSize: 10, fill: '#64748b' }}
									/>
									<Tooltip 
										contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
									/>
									<Area 
										type='monotone' 
										dataKey='responses' 
										stroke='#6366f1' 
										strokeWidth={2}
										fillOpacity={1} 
										fill='url(#colorRes)' 
									/>
								</AreaChart>
							</ResponsiveContainer>
						) : (
							<div className='h-full flex flex-col items-center justify-center text-center opacity-50'>
								<Clock className='h-8 w-8 mb-2' />
								<p className='text-xs font-medium'>Waiting for data trends...</p>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Platform Composition Chart */}
				<Card className='border-border/50 shadow-sm'>
					<CardHeader className='pb-2'>
						<div className='flex items-center justify-between'>
							<div className='space-y-0.5'>
								<CardTitle className='text-sm font-bold tracking-tight uppercase text-muted-foreground'>Platform Roles</CardTitle>
								<CardDescription className='text-[10px]'>User distribution by permission</CardDescription>
							</div>
							<ShieldCheck className='h-4 w-4 text-muted-foreground opacity-50' />
						</div>
					</CardHeader>
					<CardContent className='h-[300px] flex items-center justify-center pt-4'>
						<ResponsiveContainer width='100%' height='100%'>
							<PieChart>
								<Pie
									data={roleData}
									innerRadius={60}
									outerRadius={80}
									paddingAngle={5}
									dataKey='value'
								>
									{roleData.map((entry: any, index: number) => (
										<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
						<div className='absolute flex flex-col items-center justify-center'>
							<span className='text-xl font-bold tracking-tighter'>{totals.users}</span>
							<span className='text-[8px] font-bold text-muted-foreground uppercase tracking-widest'>Users</span>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity Table */}
			<div className='grid gap-6 lg:grid-cols-2'>
				{/* Recent Surveys */}
				<Card className='border-border/50 shadow-sm overflow-hidden'>
					<CardHeader className='pb-3 border-b border-border/50 bg-muted/20'>
						<div className='flex items-center justify-between'>
							<CardTitle className='text-sm font-bold tracking-tight'>Latest Surveys</CardTitle>
							<Badge variant='outline' className='text-[10px]'>Live Feed</Badge>
						</div>
					</CardHeader>
					<CardContent className='p-0'>
						<div className='divide-y divide-border/40'>
							{recentActivity.surveys.map((survey: any) => (
								<div key={survey._id} className='p-3 flex items-center justify-between hover:bg-muted/10 transition-colors'>
									<div className='flex items-center gap-3'>
										<div className='h-8 w-8 rounded bg-primary/5 flex items-center justify-center border border-primary/10'>
											<FileText className='h-4 w-4 text-primary' />
										</div>
										<div className='flex flex-col'>
											<span className='text-xs font-bold truncate max-w-[180px]'>{survey.title}</span>
											<span className='text-[10px] text-muted-foreground'>{survey.user?.name || 'System'}</span>
										</div>
									</div>
									<Badge className='text-[9px] h-4 uppercase tracking-tighter' variant={survey.status === 'live' ? 'default' : 'secondary'}>
										{survey.status}
									</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Recent Responses */}
				<Card className='border-border/50 shadow-sm overflow-hidden'>
					<CardHeader className='pb-3 border-b border-border/50 bg-muted/20'>
						<div className='flex items-center justify-between'>
							<CardTitle className='text-sm font-bold tracking-tight'>Recent Activity</CardTitle>
							<Badge variant='outline' className='text-[10px]'>Pulse</Badge>
						</div>
					</CardHeader>
					<CardContent className='p-0'>
						<div className='divide-y divide-border/40'>
							{recentActivity.responses.map((res: any) => (
								<div key={res._id} className='p-3 flex items-center justify-between hover:bg-muted/10 transition-colors'>
									<div className='flex items-center gap-3'>
										<Avatar className='h-8 w-8 border border-border/40'>
											<AvatarFallback className='text-[10px] font-bold'>{res.email?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
										</Avatar>
										<div className='flex flex-col'>
											<span className='text-xs font-bold truncate max-w-[180px]'>{res.email || 'Anonymous'}</span>
											<span className='text-[10px] text-muted-foreground'>{res.surveyId?.title || 'Unknown Survey'}</span>
										</div>
									</div>
									<div className='flex items-center text-[10px] text-muted-foreground gap-1'>
										<Clock className='h-3 w-3' />
										{new Date(res.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default GlobalAnalytics;
