import { userQueryAuth } from '@/queries/auth.query';
import {
	useGetSurveyBasedOnUserId,
	useUpdateSurvey,
} from '@/queries/survey.query';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
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
import {
	BarChart3,
	Edit,
	Eye,
	FileText,
	LogOut,
	ChevronLeft,
	ChevronRight,
	QrCodeIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { SurveySettingsDialog } from './components/SurveySettingDialog';
import { SurveyStatsCards } from './components/SurveyStatsCards';
import responseApi from '@/utils/response.feature';
import QRCodeDialog from './components/QRCodeDialog';
import { surveyApiClient } from '@/utils/survey.feature';

function Profile() {
	const { data } = useQuery(userQueryAuth());
	const queryClient = useQueryClient();
	const user = data?.user;
	const navigate = useNavigate();
	const [settingsDialogOpen, setSettingsDialogOpen] = useState<string | null>(
		null,
	);
	const [response, setResponse] = useState<SurveyResponseType[]>([]);
	const [activeTab, setActiveTab] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [displayQrcode, setDisplayQrCode] = useState<string | null>(null);
	const itemsPerPage = 5;

	const { data: surveyData } = useGetSurveyBasedOnUserId(user?._id || '');
	const survey = surveyData?.data?.data;
	const { mutate: updateSurvey } = useUpdateSurvey();

	useEffect(() => {
		async function getResponses(surveyId: string[]) {
			const query = `/?surveyId=${surveyId.join('&surveyId=')}`;
			const res = await responseApi.getAll({}, query);
			if (res.data) return setResponse(res.data as SurveyResponseType[]);
		}
		if (survey && survey.length > 0) {
			const surveyIds = survey.map((el) => el._id);
			if (surveyIds.length > 0) {
				console.log('calling the function');
				getResponses(surveyIds as string[]);
			}
		}
	}, [survey]);

	if (!user) return null;
	if (!survey) return null;

	const filteredSurveys = survey.filter((s) => {
		if (activeTab === 'all') return true;
		return s.status === activeTab;
	});

	const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);
	const paginatedSurveys = filteredSurveys.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const handleTabChange = (val: string) => {
		setActiveTab(val);
		setCurrentPage(1);
	};

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
		await surveyApiClient.patch(`/${surveyId}`, { authRequired: authEnabled });
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

	const handleCloseQrDialog = function () {
		setDisplayQrCode(null);
	};

	return (
		<div className='min-h-screen bg-[#f9f9f9]'>
			<QRCodeDialog
				onOpenChange={handleCloseQrDialog}
				responseId={displayQrcode}
			></QRCodeDialog>
			{/* Subtle grey background for dashboard feel */}
			{/* Header / Banner */}
			<header className='h-10 flex items-center bg-primary justify-center text-sm'>
				<p className='text-white/90'>
					Want access to Premium?{' '}
					<Link
						to='/pricing'
						className='font-medium text-white hover:underline'
					>
						Buy now
					</Link>
				</p>
			</header>
			{/* Profile Navigation Bar */}
			<div className='bg-white border-b border-border/60 sticky top-0 z-10'>
				<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<Avatar className='h-10 w-10 border-2 border-primary/10'>
							<AvatarImage
								src={user.photo}
								alt={user.name}
							/>
							<AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
						</Avatar>
						<div>
							<h1 className='text-base font-semibold text-foreground leading-none'>
								{user.name}
							</h1>
							<p className='text-xs text-muted-foreground mt-1'>{user.email}</p>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<Badge
							variant='outline'
							className='hidden sm:inline-flex bg-muted/50'
						>
							{user.role}
						</Badge>
						<Button
							variant='ghost'
							size='sm'
							onClick={handleLogOut}
							className='text-destructive hover:bg-destructive/5'
						>
							<LogOut className='h-4 w-4 mr-2' />
							Logout
						</Button>
					</div>
				</div>
			</div>
			<div className='max-w-7xl mx-auto px-6 py-10'>
				{/* Dashboard Summary Header */}
				<div className='flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>
							Dashboard Overview
						</h2>
						<p className='text-muted-foreground text-sm'>
							Manage your workspace and track performance
						</p>
					</div>
					<Button
						onClick={handleCreateSurveyDialog}
						className='rounded-full shadow-lg shadow-primary/20'
					>
						+ Create New Survey
					</Button>
				</div>
				{/* NEW COMPONENT: Summary Cards */}
				<SurveyStatsCards
					surveys={survey}
					totalApplies={response.length}
				/>

				{/* Main Content Area */}
				<div className='bg-white rounded-xl border border-border shadow-sm overflow-hidden'>
					<div className='p-4 border-b bg-white flex flex-col sm:flex-row items-center justify-between gap-4'>
						<Tabs
							defaultValue='all'
							className='w-full sm:w-auto'
							onValueChange={handleTabChange}
						>
							<TabsList className='bg-muted/50 p-1'>
								<TabsTrigger
									value='all'
									className='px-6'
								>
									All
								</TabsTrigger>
								<TabsTrigger
									value='live'
									className='px-6'
								>
									Live
								</TabsTrigger>
								<TabsTrigger
									value='drafted'
									className='px-6'
								>
									Drafts
								</TabsTrigger>
								<TabsTrigger
									value='completed'
									className='px-6'
								>
									Completed
								</TabsTrigger>
							</TabsList>
						</Tabs>

						<div className='text-sm text-muted-foreground font-medium'>
							Showing {paginatedSurveys.length} of {filteredSurveys.length}{' '}
							surveys
						</div>
					</div>

					{filteredSurveys.length === 0 ? (
						<div className='flex flex-col items-center justify-center py-20 bg-white'>
							<FileText className='h-12 w-12 text-muted-foreground/20 mb-4' />
							<p className='text-muted-foreground'>
								No {activeTab !== 'all' ? activeTab : ''} surveys found.
							</p>
						</div>
					) : (
						<>
							<Table>
								<TableHeader className='bg-muted/20'>
									<TableRow>
										<TableHead className='px-6 py-4'>Survey Details</TableHead>
										<TableHead className='text-center'>Comps</TableHead>
										<TableHead className='text-center'>QRCode</TableHead>
										<TableHead className='text-center'>Status</TableHead>
										<TableHead className='text-center'>Response</TableHead>
										<TableHead className='text-right px-6'>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{paginatedSurveys.map((sur, idx) => (
										<TableRow
											key={sur._id || idx}
											className='hover:bg-muted/5 transition-colors'
										>
											<TableCell className='px-6 py-4'>
												<p className='font-semibold text-foreground'>
													{sur.title}
												</p>
												<p className='text-xs text-muted-foreground line-clamp-1'>
													{sur.description || 'No description'}
												</p>
											</TableCell>

											<TableCell className='text-center'>
												<Badge
													variant='outline'
													className='font-mono text-xs'
												>
													{sur.components.length}
												</Badge>
											</TableCell>
											<TableCell className='px-6 py-4 flex align-middle items-center m-auto'>
												<button
													disabled={sur.status !== 'live'}
													onClick={() => setDisplayQrCode(sur._id!)}
												>
													<QrCodeIcon
														className={`m-auto} ${sur.status !== 'live' ? 'text-primary/30' : 'text-primary'}`}
													/>
												</button>
											</TableCell>
											<TableCell className='text-center'>
												{getStatusBadge(sur.status)}
											</TableCell>
											<TableCell className='text-center font-medium'>
												{
													response.filter((res) => res.surveyId === sur._id)
														.length
												}
											</TableCell>
											<TableCell className='px-6 py-4'>
												<div className='flex items-center justify-end gap-1'>
													{/* PERSISTENT LOGIC: Disables based on status */}
													<Button
														size='icon'
														variant='ghost'
														disabled={sur.status === 'drafted'}
														onClick={() => navigate(`/analytics/${sur._id}`)}
														className='h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50'
													>
														<BarChart3 className='h-4 w-4' />
													</Button>

													<Button
														size='icon'
														variant='ghost'
														disabled={
															sur.status === 'live' ||
															sur.status === 'completed'
														}
														onClick={() => navigate(`/edit/${sur._id}`)}
														className='h-8 w-8'
													>
														<Edit className='h-4 w-4' />
													</Button>

													<Button
														size='icon'
														variant='ghost'
														disabled={sur.status === 'completed'}
														onClick={() =>
															window.open(`/preview/${sur._id}`, '_blank')
														}
														className='h-8 w-8'
													>
														<Eye className='h-4 w-4' />
													</Button>

													<SurveySettingsDialog
														key={sur._id}
														survey={sur}
														open={settingsDialogOpen === sur._id}
														onOpenChange={(open) =>
															setSettingsDialogOpen(
																open ? String(sur._id) : null,
															)
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

							{/* PAGINATION CONTROLS */}
							<div className='px-6 py-4 border-t flex items-center justify-between bg-white'>
								<p className='text-sm text-muted-foreground'>
									Page <span className='font-medium'>{currentPage}</span> of{' '}
									{totalPages || 1}
								</p>
								<div className='flex items-center gap-2'>
									<Button
										variant='outline'
										size='sm'
										disabled={currentPage === 1}
										onClick={() => setCurrentPage((prev) => prev - 1)}
										className='h-8 w-8 p-0'
									>
										<ChevronLeft className='h-4 w-4' />
									</Button>
									<Button
										variant='outline'
										size='sm'
										disabled={currentPage === totalPages || totalPages === 0}
										onClick={() => setCurrentPage((prev) => prev + 1)}
										className='h-8 w-8 p-0'
									>
										<ChevronRight className='h-4 w-4' />
									</Button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
