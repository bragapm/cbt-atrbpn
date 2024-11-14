import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

export type ISessionTest = {
  name: string;
  id: number;
  sesi_ujian: string;
};

const useGetSessionTestQueries = () => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["session-test"],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<ISessionTest[]>>(
        `/items/session_test`,
        {
          fields: "*.*",
        }
      );
      return response;
    },
  });
};
export default useGetSessionTestQueries;
