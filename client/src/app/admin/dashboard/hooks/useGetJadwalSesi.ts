import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

type IJadwalSesi =  {
  name: string;
  start_time: number;
  end_time: number;
  status: number;
  sesi_ujian:number
  id: number;
};

type IUserSessionTestArgs = {
  limit: number;
  page: number;
};

const useGetJadwalSesi = (queries?: IUserSessionTestArgs) => {
  const service = new DirectusInterceptor();
  const { limit, page } = queries;
  return useQuery({
    queryKey: ["session-test", queries],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IJadwalSesi[]>>(
        `/items/session_test`,
        { fields: ["*.*"], meta: "*", page, limit }

      );
      return response;
    },
  });
};
export default useGetJadwalSesi;
