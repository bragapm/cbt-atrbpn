import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

type IUserTestArgs = {
  id: string
};

const useGetSummarize = (queries?: IUserTestArgs) => {
  const service = new DirectusInterceptor();
  const { id } = queries;

  return useQuery({
    queryKey: ["summarize", queries],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<any>>(
        `/user-score/max-score/`+id
      );
      return response;
    },
  });
};
export default useGetSummarize;
