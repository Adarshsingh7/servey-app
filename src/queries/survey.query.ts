import surveyApi from '@/utils/survey.feature';

export const surveyQueryId = (id: string) => ({
	queryKey: ['survey', id],
	queryFn: () => surveyApi.getById(id),
});

export const surveyQueryAll = () => ({
	queryKey: ['survey'],
	queryFn: () => surveyApi.getAll(),
});
