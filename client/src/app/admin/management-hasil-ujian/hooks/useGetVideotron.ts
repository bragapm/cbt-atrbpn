import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

type IUserSessionTestArgs = {
  limit: number;
  page: number;
  sessionId?: string | null;
  search?: string;
};

const useGetVideotron = (queries?: IUserSessionTestArgs) => {
  const service = new DirectusInterceptor();
  const { limit, page } = queries;
  return useQuery({
    queryKey: ["vidiotron", queries],
    queryFn: () => {
      const response = service.sendGetRequest<
        IBaseResponse<any[]>
      >(`/videotron/get-session-results/`+queries.sessionId, {
        limit,
        offset: (page - 1) * limit,
        meta: "*",
        sort:"order"
     });
      return response;
    },
  });
};
export default useGetVideotron;
