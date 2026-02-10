import surveyApi, { surveyApiClient } from '@/utils/survey.feature';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useGetSurveyBasedOnUserId = (userId: string) => {
	return useQuery({
		queryKey: ['survey', userId],
		queryFn: () =>
			surveyApiClient.get<ResponseType<SurveyType[]>>(`/?user=${userId}`),
	});
};
