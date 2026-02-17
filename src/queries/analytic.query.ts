import { analyticApiClient } from '@/utils/analytic.feature';
import { useQuery } from '@tanstack/react-query';

const useGetAnalyticBySurveyId = function (surveyId: string) {
	return useQuery({
		queryKey: ['analytic', surveyId],
		queryFn: () =>
			analyticApiClient.get<ApiResponse<SurveyResponseType[]>>(
				`/?surveyId=${surveyId}`,
			),
	});
};

export { useGetAnalyticBySurveyId };
