import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";
import { IUserSessionTest } from "./useGetUserSessionTestQueries";

const useGetUserSessionTestQuery = (id: string) => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["user-session-test-detail", id],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IUserSessionTest>>(
        `/items/user_session_test/${id}?fields=info_peserta.*,session.*`
      );
      return response;
    },
  });
};
export default useGetUserSessionTestQuery;
