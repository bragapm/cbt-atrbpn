import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

type IUpcomingCount = {
        completedTests: string;
        nonCompletedTests: string;
};

const useGetPieJadwalUjian = () => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["jadwal-ujian-pie","pie-chart"],
    queryFn: () => {
      const response = service.sendGetRequest<IUpcomingCount>(
        `/upcoming-tests/count`
      );
      return response;
    },
  });
};
export default useGetPieJadwalUjian;



