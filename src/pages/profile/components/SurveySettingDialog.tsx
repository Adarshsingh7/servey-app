import { useEffect, useState } from 'react';
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
import Select from '@/components/ui/select';
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
	Trash2,
} from 'lucide-react';
import { useDeleteSurveyById } from '@/queries/survey.query';

interface SurveySettingsDialogProps {
	survey: SurveyType;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAuthToggle?: (surveyId: string, authEnabled: boolean) => Promise<any>;
	onStatusChange?: (
		surveyId: string,
		newStatus: SurveyType['status'],
	) => Promise<any>;
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
	const [selectedStatus, setSelectedStatus] = useState<SurveyType['status']>(
		survey.status,
	);

	const { mutate: handleDeleteSurvey, isSuccess: deleteSurveySuccess } =
		useDeleteSurveyById();

	useEffect(() => {
		setAuthEnabled(survey.authRequired || false);
		if (deleteSurveySuccess) onOpenChange(false);
		setSelectedStatus(survey.status);
	}, [survey.authRequired, survey.status, open, deleteSurveySuccess]);

	const handleAuthToggle = async (checked: boolean) => {
		setIsUpdatingAuth(true);
		setAuthEnabled(checked);

		if (onAuthToggle) {
			await onAuthToggle(survey._id!, checked);
		}

		setIsUpdatingAuth(false);
	};

	const handleStatusChange = async (newStatus: SurveyType['status']) => {
		setIsUpdatingStatus(true);

		if (onStatusChange) {
			await onStatusChange(survey._id!, newStatus);
		}

		setIsUpdatingStatus(false);
		onOpenChange(false);
	};

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
	const statusOptions: Array<{
		value: SurveyType['status'];
		label: string;
		description: string;
	}> = [
		{
			value: 'drafted',
			label: 'Draft',
			description: 'Keep this survey editable and hidden from respondents.',
		},
		{
			value: 'live',
			label: 'Live',
			description: 'Make this survey available to respondents right away.',
		},
		{
			value: 'completed',
			label: 'Completed',
			description: 'Close this survey and stop accepting new responses.',
		},
	];
	const selectedStatusOption =
		statusOptions.find((option) => option.value === selectedStatus) ||
		statusOptions[0];

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogTrigger asChild>
				<Settings className='h-4 w-4 cursor-pointer' />
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
								disabled={
									survey.status === 'live' || survey.status === 'completed'
								}
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
								disabled={survey.status === 'completed'}
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
							Change the survey status at any time.
						</p>

						<div className='space-y-3 mt-3'>
							<Select
								value={selectedStatus}
								options={statusOptions}
								className='border rounded-2xl'
								onChange={(value) =>
									setSelectedStatus(value as SurveyType['status'])
								}
								disabled={isUpdatingStatus}
								placeholder='Select status'
							/>
							<p className='text-xs text-muted-foreground'>
								{selectedStatusOption.description}
							</p>
							<Button
								variant='default'
								onClick={() => handleStatusChange(selectedStatus)}
								disabled={isUpdatingStatus || selectedStatus === survey.status}
								className='w-full'
							>
								{selectedStatus === survey.status
									? 'Current Status Selected'
									: 'Update Status'}
							</Button>
						</div>
					</div>
				</div>

				<div className='flex justify-end pt-4 border-t border-border gap-2'>
					<Button
						variant='outline'
						className='gap-2'
						onClick={() => handleDeleteSurvey(survey._id!)}
					>
						<Trash2 className='h-4 w-4' />
						Delete
					</Button>
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
