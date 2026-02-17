import surveyApi, { surveyApiClient } from '@/utils/survey.feature';
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

interface ResponseType<T> {
	status: string;
	result: number;
	data: T;
}

export const useGetSurveyBySurveyId = (id: string) =>
	useQuery({
		queryKey: ['survey', id],
		queryFn: () => surveyApiClient.get<ResponseType<SurveyType>>(`/${id}`),
		retry: false,
	});

export const surveyQueryAll = () => ({
	queryKey: ['survey'],
	queryFn: () => surveyApi.getAll(),
});

export const useUpdateSurvey = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, body }: { id: string; body: Partial<SurveyType> }) =>
			surveyApiClient.patch<ResponseType<SurveyType>, Partial<SurveyType>>(
				`/${id}`,
				body,
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['survey'] });
			toast.success('Survey Updated successfully');
		},
		onError: (err) => {
			toast.error(`failed to update ${err.message}`);
		},
	});
};

export const useGetSurveyBasedOnUserId = (userId: string) => {
	return useQuery({
		queryKey: ['survey', userId],
		queryFn: () =>
			surveyApiClient.get<ResponseType<SurveyType[]>>(`/?user=${userId}`),
	});
};
