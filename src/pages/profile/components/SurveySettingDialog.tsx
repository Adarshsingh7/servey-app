import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
	BarChart3,
	Edit,
	Eye,
	X,
	Shield,
	Radio,
	CheckCircle2,
	FileEdit,
	Settings,
} from 'lucide-react';

interface SurveySettingsDialogProps {
	survey: SurveyType;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAuthToggle?: (surveyId: string, authEnabled: boolean) => void;
	onStatusChange?: (surveyId: string, newStatus: 'live' | 'completed') => void;
}

export function SurveySettingsDialog({
	survey,
	open,
	onOpenChange,
	onAuthToggle,
	onStatusChange,
}: SurveySettingsDialogProps) {
	const navigate = useNavigate();
	const [authEnabled, setAuthEnabled] = useState(survey.authRequired || false);
	const [isUpdatingAuth, setIsUpdatingAuth] = useState(false);
	const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

	const handleAuthToggle = async (checked: boolean) => {
		setIsUpdatingAuth(true);
		setAuthEnabled(checked);

		if (onAuthToggle) {
			await onAuthToggle(survey._id!, checked);
		}

		setIsUpdatingAuth(false);
	};

	const handleStatusChange = async (newStatus: 'live' | 'completed') => {
		setIsUpdatingStatus(true);

		if (onStatusChange) {
			await onStatusChange(survey._id!, newStatus);
		}

		setIsUpdatingStatus(false);
		onOpenChange(false);
	};

	const canGoLive = survey.status === 'drafted';
	const canComplete = survey.status === 'live';

	const getStatusInfo = () => {
		switch (survey.status) {
			case 'live':
				return {
					color: 'text-primary',
					bgColor: 'bg-primary/10',
					label: 'Live',
					icon: <Radio className='h-4 w-4' />,
				};
			case 'drafted':
				return {
					color: 'text-muted-foreground',
					bgColor: 'bg-muted',
					label: 'Draft',
					icon: <FileEdit className='h-4 w-4' />,
				};
			case 'completed':
				return {
					color: 'text-accent-foreground',
					bgColor: 'bg-accent',
					label: 'Completed',
					icon: <CheckCircle2 className='h-4 w-4' />,
				};
		}
	};

	const statusInfo = getStatusInfo();

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogTrigger asChild>
				<Button
					size='sm'
					variant='outline'
					className='gap-1.5'
				>
					<Settings className='h-4 w-4' />
					Settings
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-150'>
				<DialogHeader>
					<DialogTitle className='text-foreground text-xl'>
						Survey Settings
					</DialogTitle>
					<DialogDescription>
						Manage settings and actions for "{survey.title}"
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-6 py-4'>
					{/* Current Status */}
					<div className='space-y-3'>
						<Label className='text-sm font-medium text-foreground'>
							Current Status
						</Label>
						<div
							className={`flex items-center gap-3 p-3 rounded-lg ${statusInfo.bgColor}`}
						>
							<div className={statusInfo.color}>{statusInfo.icon}</div>
							<span className={`font-medium ${statusInfo.color}`}>
								{statusInfo.label}
							</span>
						</div>
					</div>

					<Separator className='bg-border' />

					{/* Quick Actions */}
					<div className='space-y-3'>
						<Label className='text-sm font-medium text-foreground'>
							Quick Actions
						</Label>
						<div className='grid grid-cols-3 gap-3'>
							<Button
								variant='outline'
								disabled={survey.status === 'drafted'}
								onClick={() => {
									navigate(`/analytics/${survey._id}`);
									onOpenChange(false);
								}}
								className='flex flex-col items-center gap-2 h-auto py-4'
							>
								<BarChart3 className='h-5 w-5' />
								<span className='text-xs'>Analytics</span>
							</Button>

							<Button
								variant='outline'
								disabled={survey.status === 'live'}
								onClick={() => {
									navigate(`/edit/${survey._id}`);
									onOpenChange(false);
								}}
								className='flex flex-col items-center gap-2 h-auto py-4'
							>
								<Edit className='h-5 w-5' />
								<span className='text-xs'>Edit</span>
							</Button>

							<Button
								variant='outline'
								onClick={() => {
									// navigate(`/preview/${survey._id}`);
									window.open(`/preview/${survey._id}`, '_blank');
									onOpenChange(false);
								}}
								className='flex flex-col items-center gap-2 h-auto py-4'
							>
								<Eye className='h-5 w-5' />
								<span className='text-xs'>Preview</span>
							</Button>
						</div>
					</div>

					<Separator className='bg-border' />

					{/* Authentication Settings */}
					<div className='space-y-3'>
						<div className='flex items-center justify-between'>
							<div className='space-y-0.5'>
								<Label className='text-sm font-medium text-foreground flex items-center gap-2'>
									<Shield className='h-4 w-4' />
									Authentication Required
								</Label>
								<p className='text-xs text-muted-foreground'>
									Users must be logged in to access this survey
								</p>
							</div>
							<Switch
								checked={authEnabled}
								onCheckedChange={handleAuthToggle}
								disabled={isUpdatingAuth}
							/>
						</div>
					</div>

					<Separator className='bg-border' />

					{/* Status Management */}
					<div className='space-y-3'>
						<Label className='text-sm font-medium text-foreground'>
							Status Management
						</Label>
						<p className='text-xs text-muted-foreground'>
							Change the survey status. This is a one-way process.
						</p>

						<div className='flex flex-col gap-2 mt-3'>
							{canGoLive && (
								<div className='space-y-2'>
									<Button
										variant='default'
										onClick={() => handleStatusChange('live')}
										disabled={isUpdatingStatus}
										className='w-full gap-2'
									>
										<Radio className='h-4 w-4' />
										Publish Survey (Go Live)
									</Button>
									<p className='text-xs text-muted-foreground'>
										Make this survey available to respondents. Once live, you
										cannot edit it.
									</p>
								</div>
							)}

							{canComplete && (
								<div className='space-y-2'>
									<Button
										variant='outline'
										onClick={() => handleStatusChange('completed')}
										disabled={isUpdatingStatus}
										className='w-full gap-2'
									>
										<CheckCircle2 className='h-4 w-4' />
										Mark as Completed
									</Button>
									<p className='text-xs text-muted-foreground'>
										Close this survey and stop accepting responses. This action
										is permanent.
									</p>
								</div>
							)}

							{!canGoLive && !canComplete && (
								<div className='text-center py-4'>
									<p className='text-sm text-muted-foreground'>
										{survey.status === 'completed'
											? 'This survey is completed. No further status changes are available.'
											: 'No status changes available for the current state.'}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='flex justify-end pt-4 border-t border-border'>
					<DialogClose asChild>
						<Button
							variant='outline'
							className='gap-2'
						>
							<X className='h-4 w-4' />
							Close
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
