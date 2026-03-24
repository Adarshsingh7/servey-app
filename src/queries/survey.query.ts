import responseApi from '@/utils/response.feature';
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

// export const useGetSurveyResponsesBasedOnSurveyIds = (surveyId: string[]) => {
// 	const query = `/?surveyId=${surveyId.join('surveyId=')}`;
// 	return useMutation({ mutationFn: () => });
// };

export const useGetSurveyBasedOnUserId = (userId: string) => {
	return useQuery({
		queryKey: ['survey', userId],
		queryFn: () =>
			surveyApiClient.get<ResponseType<SurveyType[]>>(`/?user=${userId}`),
	});
};

export const useDeleteSurveyById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => surveyApiClient.delete(`/${id}`),
		onSuccess: () => {
			toast.success('Survey Deleted Successfully');
			queryClient.invalidateQueries({ queryKey: ['survey'] });
		},
		onError: () => toast.error('failed to delete survey'),
	});
};
