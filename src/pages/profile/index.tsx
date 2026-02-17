import { userQueryAuth } from '@/queries/auth.query';
import {
	useGetSurveyBasedOnUserId,
	useUpdateSurvey,
} from '@/queries/survey.query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { BarChart3, Edit, Eye, FileText, LogOut } from 'lucide-react';
import { useState } from 'react';
import { SurveySettingsDialog } from './components/SurveySettingDialog';

function Profile() {
	const { data } = useQuery(userQueryAuth());
	const queryClient = useQueryClient();
	const user = data?.user;
	const navigate = useNavigate();
	const [settingsDialogOpen, setSettingsDialogOpen] = useState<string | null>(
		null,
	);

	const { data: surveyData } = useGetSurveyBasedOnUserId(user?._id || '');
	const survey = surveyData?.data?.data;
	const { mutate: updateSurvey } = useUpdateSurvey();

	if (!user) return null;
	if (!survey) return null;

	const getUserInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	const getStatusBadge = (status: string) => {
		const statusConfig = {
			live: { variant: 'default' as const, label: 'Live' },
			drafted: { variant: 'secondary' as const, label: 'Draft' },
			completed: { variant: 'outline' as const, label: 'Completed' },
		};

		const config =
			statusConfig[status as keyof typeof statusConfig] || statusConfig.drafted;

		return (
			<Badge
				variant={config.variant}
				className='font-normal'
			>
				{config.label}
			</Badge>
		);
	};

	const handleAuthToggle = async (surveyId: string, authEnabled: boolean) => {
		await fetch(`/api/surveys/${surveyId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ authRequired: authEnabled }),
		});
	};

	const handleStatusChange = async (
		surveyId: string,
		newStatus: 'live' | 'completed',
	) => {
		updateSurvey({ id: surveyId, body: { status: newStatus } });
	};

	const handleLogOut = function () {
		localStorage.removeItem('USER_TOKEN');
		queryClient.invalidateQueries({ queryKey: ['auth_user'] });
		navigate('/auth');
	};

	const handleCreateSurveyDialog = function () {
		navigate('/create');
	};

	return (
		<div className='min-h-screen bg-background'>
			{/* Survey Create Dialog */}
			{/* Header */}
			<header className='h-10 flex items-center bg-linear-to-r from-primary to-primary/50  justify-center border-b bg-white text-sm'>
				<p className='text-white'>
					Want access to Premium?{' '}
					<Link
						to='/pricing'
						className='font-medium text-white hover:underline'
					>
						Buy now
					</Link>
				</p>
			</header>
			<div className='border-b border-border bg-card'>
				<div className='max-w-7xl mx-auto px-6 py-6'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<Avatar className='h-14 w-14 border border-border'>
								<AvatarImage
									src={user.photo}
									alt={user.name}
								/>
								<AvatarFallback className='bg-muted text-muted-foreground font-medium'>
									{getUserInitials(user.name)}
								</AvatarFallback>
							</Avatar>
							<div>
								<h1 className='text-xl font-semibold text-foreground'>
									{user.name}
								</h1>
								<p className='text-sm text-muted-foreground'>{user.email}</p>
							</div>
						</div>
						<div className='flex gap-5'>
							<Badge
								variant='outline'
								className='text-xs uppercase tracking-wide'
							>
								{user.role}
							</Badge>
							<Button
								variant={'destructive'}
								onClick={handleLogOut}
							>
								<span className='hidden sm:block'>Logout</span>
								<LogOut />
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-6 py-8'>
				<div className='mb-6 flex items-center justify-between'>
					<div>
						<h2 className='text-2xl font-semibold text-foreground'>
							Surveys ({survey.length} Total)
						</h2>
						<p className='text-sm text-muted-foreground mt-1'>
							Manage and monitor your survey collection
						</p>
					</div>
					<div className='flex gap-5 justify-center align-middle'>
						<Button
							variant={'outline'}
							onClick={handleCreateSurveyDialog}
						>
							Create Survey
						</Button>
					</div>
				</div>

				{survey.length === 0 ? (
					<Card>
						<CardContent className='flex flex-col items-center justify-center py-16'>
							<div className='rounded-full bg-muted p-4 mb-4'>
								<FileText className='h-8 w-8 text-muted-foreground' />
							</div>
							<h3 className='text-lg font-medium text-foreground mb-1'>
								No surveys created
							</h3>
							<p className='text-sm text-muted-foreground text-center max-w-sm'>
								Create your first survey to start collecting responses and
								analyzing data.
							</p>
						</CardContent>
					</Card>
				) : (
					<div className='border border-border rounded-lg overflow-hidden bg-card'>
						<Table>
							<TableHeader>
								<TableRow className='bg-muted/50 hover:bg-muted/50'>
									<TableHead className='font-semibold text-foreground h-12'>
										Survey Title
									</TableHead>
									<TableHead className='font-semibold text-foreground text-center h-12 w-32'>
										Components
									</TableHead>
									<TableHead className='font-semibold text-foreground text-center h-12 w-32'>
										Status
									</TableHead>
									<TableHead className='font-semibold text-foreground text-right h-12 w-96'>
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{survey.map((sur, idx) => (
									<TableRow
										key={sur._id || idx}
										className='hover:bg-muted/30'
									>
										<TableCell className='py-4'>
											<div className='space-y-1'>
												<p className='font-medium text-foreground'>
													{sur.title}
												</p>
												<p className='text-sm text-muted-foreground line-clamp-1'>
													{sur.description || 'No description'}
												</p>
											</div>
										</TableCell>
										<TableCell className='text-center py-4'>
											<span className='text-sm text-foreground font-medium'>
												{sur.components.length}
											</span>
										</TableCell>
										<TableCell className='text-center py-4'>
											{getStatusBadge(sur.status)}
										</TableCell>
										<TableCell className='py-4'>
											<div className='flex items-center justify-end gap-2'>
												<Button
													size='sm'
													variant='outline'
													disabled={sur.status === 'drafted'}
													onClick={() => navigate(`/analytics/${sur._id}`)}
													className='gap-1.5'
												>
													<BarChart3 className='h-4 w-4' />
													Analytics
												</Button>

												<Button
													size='sm'
													variant='outline'
													disabled={
														sur.status === 'live' || sur.status === 'completed'
													}
													onClick={() => navigate(`/edit/${sur._id}`)}
													className='gap-1.5'
												>
													<Edit className='h-4 w-4' />
													Edit
												</Button>

												<Button
													size='sm'
													variant='outline'
													disabled={sur.status === 'completed'}
													onClick={() =>
														window.open(`/preview/${sur._id}`, '_blank')
													}
													className='gap-1.5'
												>
													<Eye className='h-4 w-4' />
													Preview
												</Button>

												<SurveySettingsDialog
													key={sur._id}
													survey={sur}
													open={settingsDialogOpen === sur._id}
													onOpenChange={(open) =>
														setSettingsDialogOpen(open ? String(sur._id) : null)
													}
													onAuthToggle={handleAuthToggle}
													onStatusChange={handleStatusChange}
												/>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
