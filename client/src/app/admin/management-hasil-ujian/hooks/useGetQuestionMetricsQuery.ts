import { DirectusInterceptor } from "@/services/directus-interceptors";
import { useQuery } from "react-query";

export type QuestionMetric = {
  question_id: number;
  question_text: string;
  correct_count: string;
  no_answer_count: string;
  incorrect_count: string;
};

export type IQuestionMetricResponse = {
  data: QuestionMetric[];
  pagination: {
    totalRecords: string;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

type IQuestionMetricArgs = {
  limit: number;
  page: number;
};

const useGetQuestionMetricsQuery = (queries?: IQuestionMetricArgs) => {
  const service = new DirectusInterceptor();
  const { limit, page } = queries;

  return useQuery({
    queryKey: ["question-metric", queries],
    queryFn: () => {
      const response = service.sendGetRequest<IQuestionMetricResponse>(
        `/metric-pertanyaan?limit=${limit}&page=${page}`
      );
      return response;
    },
  });
};
export default useGetQuestionMetricsQuery;
