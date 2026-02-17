import { useParams, useNavigate } from 'react-router-dom';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	ArrowLeft,
	BarChart3,
	Users,
	CalendarDays,
	MessageSquare,
	Clock,
	ChevronDown,
	ChevronUp,
	AlertCircle,
	RefreshCw,
	Inbox,
} from 'lucide-react';
import { useState } from 'react';
import { useGetSurveyBySurveyId } from '@/queries/survey.query';
import { useGetAnalyticBySurveyId } from '@/queries/analytic.query';

/* ─────────────────────────────── types ─────────────────────────────── */
interface ResponseComponent {
	questionId: string;
	answer: string;
	_id: { $oid: string };
}

/* ─────────────── small helpers ─────────────── */
const formatDate = (dateStr: string) => {
	try {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) return 'Invalid date';
		return date.toLocaleDateString('en-IN', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	} catch {
		return 'Unknown date';
	}
};

const getAnswerDisplay = (answer: string) => {
	if (!answer || answer.trim() === '') {
		return (
			<span className='text-sm text-muted-foreground italic'>No answer</span>
		);
	}
	const emojiRegex = /\p{Emoji}/u;
	if (emojiRegex.test(answer) && answer.length <= 4) {
		return <span className='text-xl'>{answer}</span>;
	}
	if (answer.toLowerCase() === 'yes') {
		return (
			<Badge
				variant='default'
				className='font-normal'
			>
				Yes
			</Badge>
		);
	}
	if (answer.toLowerCase() === 'no') {
		return (
			<Badge
				variant='outline'
				className='font-normal text-muted-foreground'
			>
				No
			</Badge>
		);
	}
	return <span className='text-sm text-foreground'>{answer}</span>;
};

/* ─────────────── loading skeleton ─────────────── */
function SkeletonCard() {
	return (
		<Card>
			<CardContent className='flex items-start gap-4 pt-6'>
				<div className='rounded-lg bg-muted p-2.5 h-10 w-10 animate-pulse' />
				<div className='space-y-2 flex-1'>
					<div className='h-3 w-24 bg-muted rounded animate-pulse' />
					<div className='h-6 w-16 bg-muted rounded animate-pulse' />
				</div>
			</CardContent>
		</Card>
	);
}

function PageSkeleton() {
	return (
		<div className='min-h-screen bg-background'>
			<div className='border-b border-border bg-card sticky top-0 z-10'>
				<div className='max-w-7xl mx-auto px-6 py-4 flex items-center gap-3'>
					<div className='h-8 w-16 bg-muted rounded animate-pulse' />
					<div className='h-5 w-px bg-border' />
					<div className='space-y-1.5'>
						<div className='h-4 w-48 bg-muted rounded animate-pulse' />
						<div className='h-3 w-64 bg-muted rounded animate-pulse' />
					</div>
				</div>
			</div>
			<div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					{Array.from({ length: 4 }).map((_, i) => (
						<SkeletonCard key={i} />
					))}
				</div>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					{Array.from({ length: 3 }).map((_, i) => (
						<Card key={i}>
							<CardHeader className='pb-3'>
								<div className='h-3 w-20 bg-muted rounded animate-pulse' />
								<div className='h-4 w-40 bg-muted rounded animate-pulse mt-2' />
							</CardHeader>
							<CardContent className='space-y-3'>
								{Array.from({ length: 3 }).map((_, j) => (
									<div
										key={j}
										className='space-y-1.5'
									>
										<div className='h-3 w-full bg-muted rounded animate-pulse' />
										<div className='h-2 w-full bg-muted rounded-full animate-pulse' />
									</div>
								))}
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}

/* ─────────────── error state ─────────────── */
function ErrorState({
	title,
	message,
	onRetry,
}: {
	title: string;
	message?: string;
	onRetry?: () => void;
}) {
	return (
		<div className='min-h-screen bg-background flex items-center justify-center p-6'>
			<Card className='max-w-md w-full'>
				<CardContent className='flex flex-col items-center justify-center py-16 text-center'>
					<div className='rounded-full bg-destructive/10 p-4 mb-4'>
						<AlertCircle className='h-8 w-8 text-destructive' />
					</div>
					<h3 className='text-base font-medium text-foreground mb-1'>
						{title}
					</h3>
					{message && (
						<p className='text-sm text-muted-foreground mb-4'>{message}</p>
					)}
					{onRetry && (
						<Button
							variant='outline'
							size='sm'
							onClick={onRetry}
							className='gap-2'
						>
							<RefreshCw className='h-3.5 w-3.5' />
							Try again
						</Button>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

/* ─────────────── stat card ─────────────── */
function StatCard({
	icon,
	label,
	value,
	sub,
}: {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	sub?: string;
}) {
	return (
		<Card>
			<CardContent className='flex items-start gap-4 pt-6'>
				<div className='rounded-lg bg-primary/10 p-2.5 text-primary'>
					{icon}
				</div>
				<div className='space-y-0.5'>
					<p className='text-sm text-muted-foreground'>{label}</p>
					<p className='text-2xl font-semibold text-foreground'>{value}</p>
					{sub && <p className='text-xs text-muted-foreground'>{sub}</p>}
				</div>
			</CardContent>
		</Card>
	);
}

/* ─────────────── answer frequency breakdown ─────────────── */
function AnswerBreakdown({
	questionId,
	questionLabel,
	responses,
}: {
	questionId: string;
	questionLabel: string;
	responses: SurveyResponseType[];
}) {
	const answers = responses
		.flatMap((r) => r.components ?? [])
		.filter(
			(c) =>
				c?.questionId === questionId && c?.answer != null && c.answer !== '',
		)
		.map((c) => c.answer);

	if (answers.length === 0) {
		return (
			<Card>
				<CardHeader className='pb-3'>
					<CardDescription className='text-xs uppercase tracking-wider font-medium'>
						{questionId}
					</CardDescription>
					<CardTitle className='text-base font-medium text-foreground'>
						{questionLabel || 'Untitled question'}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-sm text-muted-foreground italic'>
						No answers recorded
					</p>
				</CardContent>
			</Card>
		);
	}

	const freq: Record<string, number> = {};
	for (const a of answers) freq[a] = (freq[a] || 0) + 1;
	const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
	const max = sorted[0]?.[1] || 1;

	return (
		<Card>
			<CardHeader className='pb-3'>
				<CardDescription className='text-xs uppercase tracking-wider font-medium'>
					{questionId}
				</CardDescription>
				<CardTitle className='text-base font-medium text-foreground'>
					{questionLabel || 'Untitled question'}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-3'>
				{sorted.map(([answer, count]) => (
					<div
						key={answer}
						className='space-y-1.5'
					>
						<div className='flex items-center justify-between text-sm'>
							<span className='text-foreground'>
								{getAnswerDisplay(answer)}
							</span>
							<span className='text-muted-foreground tabular-nums'>
								{count} · {Math.round((count / answers.length) * 100)}%
							</span>
						</div>
						<div className='h-2 w-full rounded-full bg-muted overflow-hidden'>
							<div
								className='h-full rounded-full bg-primary transition-all duration-500'
								style={{ width: `${(count / max) * 100}%` }}
							/>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

/* ─────────────── single response row ─────────────── */
function ResponseRow({
	response,
	index,
	questionMap,
}: {
	response: SurveyResponseType;
	index: number;
	questionMap: Record<string, string>;
}) {
	const [expanded, setExpanded] = useState(false);
	const components = response.components ?? [];
	const submittedAt = response.createdAt;

	return (
		<>
			<TableRow
				className='cursor-pointer hover:bg-muted/40 transition-colors'
				onClick={() => setExpanded((v) => !v)}
			>
				<TableCell className='py-3 font-medium text-muted-foreground tabular-nums'>
					#{index + 1}
				</TableCell>
				<TableCell className='py-3 text-foreground'>
					{components.length} {components.length === 1 ? 'answer' : 'answers'}
				</TableCell>
				<TableCell className='py-3 text-muted-foreground text-sm'>
					<span className='flex items-center gap-1.5'>
						<Clock className='h-3.5 w-3.5' />
						{submittedAt ? formatDate(submittedAt) : 'Unknown'}
					</span>
				</TableCell>
				<TableCell className='py-3 text-right'>
					{expanded ? (
						<ChevronUp className='h-4 w-4 text-muted-foreground ml-auto' />
					) : (
						<ChevronDown className='h-4 w-4 text-muted-foreground ml-auto' />
					)}
				</TableCell>
			</TableRow>

			{expanded && (
				<TableRow className='bg-muted/20 hover:bg-muted/20'>
					<TableCell
						colSpan={4}
						className='py-4 px-6'
					>
						{components.length ? (
							<p className='text-sm text-muted-foreground italic'>
								No answers in this response
							</p>
						) : (
							<div className='grid gap-3 sm:grid-cols-2'>
								{components.map((comp, compIdx) => (
									<div
										key={comp._id ?? `${index}-${compIdx}`}
										className='rounded-lg border border-border bg-card px-4 py-3 space-y-1'
									>
										<p className='text-xs text-muted-foreground truncate'>
											{questionMap[comp.questionId] ??
												comp.questionId ??
												'Unknown question'}
										</p>
										<div>{getAnswerDisplay(comp.answer)}</div>
									</div>
								))}
							</div>
						)}
					</TableCell>
				</TableRow>
			)}
		</>
	);
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */
function AnalyticsPage() {
	const { surveyId } = useParams<{ surveyId: string }>();
	const navigate = useNavigate();

	// Guard: no surveyId in URL

	const {
		data: analyticData,
		isLoading: analyticsLoading,
		isError: analyticsError,
		refetch: refetchAnalytics,
	} = useGetAnalyticBySurveyId(surveyId!);

	const {
		data: surveyData,
		isLoading: surveyLoading,
		isError: surveyError,
		refetch: refetchSurvey,
	} = useGetSurveyBySurveyId(surveyId!);

	const isLoading = analyticsLoading || surveyLoading;
	const hasError = analyticsError || surveyError;

	if (isLoading) return <PageSkeleton />;

	if (hasError) {
		return (
			<ErrorState
				title='Failed to load analytics'
				message='Something went wrong while fetching the data. Please try again.'
				onRetry={() => {
					refetchAnalytics();
					refetchSurvey();
				}}
			/>
		);
	}

	const responses = analyticData?.data?.data ?? [];
	const survey = surveyData?.data?.data;

	// Guard: survey data missing even without an error
	if (!survey) {
		return (
			<ErrorState
				title='Survey not found'
				message='This survey may have been deleted or you may not have access to it.'
				onRetry={() => refetchSurvey()}
			/>
		);
	}

	const components = survey.components ?? [];

	// Build questionId → label lookup
	// SurveyComponent uses `id`, but responses reference `questionId`
	// Support both `id` and `questionId` fields defensively
	const questionMap: Record<string, string> = Object.fromEntries(
		components.map((c) => [
			(c as SurveyComponent & { questionId?: string }).questionId ?? c.id,
			c.label ?? c.name ?? 'Untitled question',
		]),
	);

	// Stats — sort responses defensively
	const sortedResponses = [...responses].sort((a, b) => {
		const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
		const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
		return bTime - aTime;
	});

	const totalResponses = responses.length;

	const latestDate =
		sortedResponses.length > 0 && sortedResponses[0].createdAt
			? formatDate(sortedResponses[0].createdAt)
			: '—';

	const completionRate =
		totalResponses === 0 || components.length === 0
			? 0
			: Math.round(
					(responses.filter(
						(r) => (r.components?.length ?? 0) === components.length,
					).length /
						totalResponses) *
						100,
				);

	const formattedRes = responses.map((res) => {
		const resFormatted = res.components.map((com) => ({
			questionText: questionMap[com.questionId],
			answerText: com.answer,
		}));
		return resFormatted;
	});

	return (
		<div className='min-h-screen bg-background'>
			{/* ── Top bar ── */}
			<div className='border-b border-border bg-card sticky top-0 z-10'>
				<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => navigate(-1)}
							className='gap-2 text-muted-foreground'
						>
							<ArrowLeft className='h-4 w-4' />
							Back
						</Button>
						<Separator
							orientation='vertical'
							className='h-5'
						/>
						<div>
							<h1 className='text-base font-semibold text-foreground leading-tight'>
								{survey.title || 'Untitled Survey'}
							</h1>
							{survey.description && (
								<p className='text-xs text-muted-foreground'>
									{survey.description}
								</p>
							)}
						</div>
					</div>
					{survey.status && (
						<Badge
							variant={survey.status === 'live' ? 'default' : 'secondary'}
							className='capitalize'
						>
							{survey.status}
						</Badge>
					)}
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
				{/* ── Stat strip ── */}
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					<StatCard
						icon={<Users className='h-5 w-5' />}
						label='Total Responses'
						value={totalResponses}
					/>
					<StatCard
						icon={<BarChart3 className='h-5 w-5' />}
						label='Completion Rate'
						value={`${completionRate}%`}
						sub='All questions answered'
					/>
					<StatCard
						icon={<MessageSquare className='h-5 w-5' />}
						label='Questions'
						value={components.length}
						sub='In this survey'
					/>
					<StatCard
						icon={<CalendarDays className='h-5 w-5' />}
						label='Latest Response'
						value={totalResponses ? latestDate.split(',')[0] : '—'}
						sub={
							totalResponses
								? latestDate.split(',').slice(1).join(',').trim()
								: 'No responses yet'
						}
					/>
				</div>

				{/* ── Per-question breakdown ── */}
				<div>
					<h2 className='text-lg font-semibold text-foreground mb-4'>
						Answer Breakdown
					</h2>
					{components.length === 0 ? (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-10'>
								<p className='text-sm text-muted-foreground'>
									This survey has no questions defined.
								</p>
							</CardContent>
						</Card>
					) : (
						<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
							{components.map((comp, i) => {
								const qId =
									(comp as SurveyComponent & { questionId?: string })
										.questionId ?? comp.id;
								return (
									<AnswerBreakdown
										key={qId ?? i}
										questionId={qId}
										questionLabel={
											comp.label ?? comp.name ?? 'Untitled question'
										}
										responses={responses}
									/>
								);
							})}
						</div>
					)}
				</div>

				<Separator className='bg-border' />

				{/* ── Individual responses ── */}
				<div>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-lg font-semibold text-foreground'>
							Individual Responses
						</h2>
						<span className='text-sm text-muted-foreground'>
							{totalResponses}{' '}
							{totalResponses === 1 ? 'submission' : 'submissions'}
						</span>
					</div>

					{responses.length === 0 ? (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-16'>
								<div className='rounded-full bg-muted p-4 mb-4'>
									<Inbox className='h-8 w-8 text-muted-foreground' />
								</div>
								<h3 className='text-base font-medium text-foreground mb-1'>
									No responses yet
								</h3>
								<p className='text-sm text-muted-foreground'>
									Responses will appear here once people start submitting.
								</p>
							</CardContent>
						</Card>
					) : (
						<div className='border border-border rounded-lg overflow-hidden bg-card'>
							<Table>
								<TableHeader>
									<TableRow className='bg-muted/50 hover:bg-muted/50'>
										<TableHead className='font-semibold text-foreground h-11 w-16'>
											#
										</TableHead>
										<TableHead className='font-semibold text-foreground h-11'>
											Answers
										</TableHead>
										<TableHead className='font-semibold text-foreground h-11'>
											Submitted
										</TableHead>
										<TableHead className='h-11 w-12' />
									</TableRow>
								</TableHeader>
								<TableBody>
									{sortedResponses.map((response, idx) => (
										<ResponseRow
											key={response._id ?? idx}
											response={response}
											index={idx}
											questionMap={questionMap}
										/>
									))}
								</TableBody>
							</Table>
							{formattedRes.map((res, idx) => (
								<ResRow
									key={idx}
									row={res}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function ResRow({
	row,
}: {
	row: [{ questionText: string; answerText: string }];
}) {
	console.log(row);
	return (
		<div className='grid grid-cols-4 w-full'>
			{row.map((item, i) => (
				<div key={i}>
					<div>{item.questionText}?</div>
					<div>{item.answerText}</div>
				</div>
			))}
		</div>
	);
}

export default AnalyticsPage;
