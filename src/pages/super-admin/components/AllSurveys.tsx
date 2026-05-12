'use client';

import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { surveyApiClient } from '@/utils/survey.feature';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, BarChart3, Search, Edit, ChevronLeft, ChevronRight, Settings, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import surveyApi from '@/utils/survey.feature';
import { toast } from 'sonner';
import { SurveySettingsDialog } from '@/pages/profile/components/SurveySettingDialog';

/**
 * AllSurveys Component
 * Refactored for high-density SaaS dashboard utility.
 * Focus: Neutral background, refined typography, and compact layout.
 */
const AllSurveys: React.FC = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedSurvey, setSelectedSurvey] = useState<any>(null);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const itemsPerPage = 5;
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			surveyApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['all_surveys_admin'] });
			toast.success('Survey settings updated');
			setIsSettingsOpen(false);
		},
		onError: (error: any) => {
			toast.error(error.message || 'Failed to update settings');
		},
	});

	const handleUpdateSettings = async (id: string, updates: any) => {
		return updateMutation.mutateAsync({ id, data: updates });
	};

	const handleAuthToggle = async (surveyId: string, authEnabled: boolean) => {
		return handleUpdateSettings(surveyId, { authRequired: authEnabled });
	};

	const handleStatusChange = async (surveyId: string, newStatus: string) => {
		return handleUpdateSettings(surveyId, { status: newStatus });
	};

	const { data: surveysData, isLoading } = useQuery({
		queryKey: ['all_surveys_admin'],
		queryFn: () => {
			const token = localStorage.getItem('USER_TOKEN');
			return surveyApiClient.get<any>('/', undefined, {
				headers: { Authorization: `Bearer ${token}` },
			});
		},
	});

	const surveys = surveysData?.data?.data || [];

	const filteredSurveys = surveys.filter((s: any) =>
		s.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
		(statusFilter === 'all' || s.status === statusFilter),
	);

	const paginatedSurveys = filteredSurveys.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);

	const getStatusBadge = (status: string) => {
		const statusConfig = {
			live: {
				label: 'Live',
				className:
					'bg-green-500/10 text-green-600 border-green-500/20 px-2 py-0 h-5 text-[10px] uppercase tracking-wider font-bold',
			},
			drafted: {
				label: 'Draft',
				className:
					'bg-muted text-muted-foreground border-transparent px-2 py-0 h-5 text-[10px] uppercase tracking-wider font-bold',
			},
			completed: {
				label: 'Completed',
				className:
					'bg-blue-500/10 text-blue-600 border-blue-500/20 px-2 py-0 h-5 text-[10px] uppercase tracking-wider font-bold',
			},
		};

		const config =
			statusConfig[status as keyof typeof statusConfig] || statusConfig.drafted;

		return (
			<Badge
				variant='outline'
				className={config.className}
			>
				{config.label}
			</Badge>
		);
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-24'>
				<div className='relative flex h-8 w-8'>
					<div className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20'></div>
					<div className='relative inline-flex rounded-full h-8 w-8 border-2 border-primary border-t-transparent animate-spin'></div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-card'>
			{/* Search & Filter Bar */}
			<div className='p-3 flex items-center justify-between gap-4 border-b border-border/50'>
				<div className='relative w-full max-w-sm group'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors' />
					<Input
						placeholder='Find surveys...'
						className='pl-9 h-9 bg-background border-border rounded-lg text-sm focus-visible:ring-1 focus-visible:ring-primary transition-all'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{/* Table Interface */}
			<div className='overflow-x-auto'>
				<Table>
					<TableHeader className='bg-muted/30'>
						<TableRow className='hover:bg-transparent border-border/50'>
							<TableHead className='h-10 text-xs font-semibold text-muted-foreground uppercase tracking-tight'>
								Survey Details
							</TableHead>
							<TableHead className='h-10 text-xs font-semibold text-muted-foreground uppercase tracking-tight'>
								Owner
							</TableHead>
							<TableHead className='h-10 text-xs font-semibold text-muted-foreground uppercase tracking-tight'>
								Status
							</TableHead>
							<TableHead className='h-10 text-xs font-semibold text-muted-foreground uppercase tracking-tight text-right'>
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedSurveys.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className='text-center py-20 text-muted-foreground text-sm'
								>
									No surveys found matching your criteria.
								</TableCell>
							</TableRow>
						) : (
							paginatedSurveys.map((sur: any) => (
								<TableRow
									key={sur._id}
									className='group border-border/40 hover:bg-muted/20 transition-colors duration-200'
								>
									<TableCell className='py-3'>
										<div className='flex flex-col gap-0.5'>
											<span className='font-semibold text-sm text-foreground tracking-tight leading-tight'>
												{sur.title}
											</span>
											<span className='text-[11px] text-muted-foreground line-clamp-1 max-w-[300px]'>
												{sur.description || 'No description provided'}
											</span>
										</div>
									</TableCell>
									<TableCell className='py-3'>
										<div className='flex items-center gap-2'>
											<div className='h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20'>
												{(typeof sur.user === 'object'
													? sur.user.name
													: 'U'
												).charAt(0)}
											</div>
											<span className='text-xs font-medium text-muted-foreground'>
												{typeof sur.user === 'object'
													? sur.user.name
													: 'Unknown User'}
											</span>
										</div>
									</TableCell>
									<TableCell className='py-3'>
										{getStatusBadge(sur.status)}
									</TableCell>
									<TableCell className='py-3 text-right'>
										<div className='flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity'>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => navigate(`/edit/${sur._id}`)}
												className='h-8 w-8 rounded-lg text-amber-600 hover:bg-amber-50 hover:text-amber-700 transition-all active:scale-90'
												title='Edit Survey'
											>
												<Edit className='h-4 w-4' />
											</Button>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => navigate(`/analytics/${sur._id}`)}
												className='h-8 w-8 rounded-lg text-primary hover:bg-primary/10 hover:text-primary transition-all active:scale-90'
												title='View Analytics'
											>
												<BarChart3 className='h-4 w-4' />
											</Button>
											<SurveySettingsDialog
												survey={sur}
												open={isSettingsOpen && selectedSurvey?._id === sur._id}
												onOpenChange={(open) => {
													if (open) {
														setSelectedSurvey(sur);
														setIsSettingsOpen(true);
													} else {
														setIsSettingsOpen(false);
														setSelectedSurvey(null);
													}
												}}
												onAuthToggle={handleAuthToggle}
												onStatusChange={handleStatusChange}
											/>
											<Button
												variant='ghost'
												size='icon'
												onClick={() =>
													window.open(`/preview/${sur._id}`, '_blank')
												}
												className='h-8 w-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all active:scale-90'
												title='Preview'
											>
												<Eye className='h-4 w-4' />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>



			{/* Pagination for Surveys */}
			{filteredSurveys.length > itemsPerPage && (
				<div className='p-4 border-t border-border/50 flex items-center justify-end gap-3'>
					<span className='text-[11px] font-semibold text-muted-foreground uppercase tracking-widest'>
						Page {currentPage} of {totalPages}
					</span>
					<div className='flex items-center gap-1.5'>
						<Button
							variant='outline'
							size='icon'
							className='h-8 w-8 rounded-lg border-border/60 hover:bg-muted transition-all active:scale-90'
							onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
							disabled={currentPage === 1}
						>
							<ChevronLeft className='h-4 w-4' />
						</Button>
						<Button
							variant='outline'
							size='icon'
							className='h-8 w-8 rounded-lg border-border/60 hover:bg-muted transition-all active:scale-90'
							onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
							disabled={currentPage === totalPages}
						>
							<ChevronRight className='h-4 w-4' />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AllSurveys;
