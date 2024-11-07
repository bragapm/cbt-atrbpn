import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

type IUpcoming = {
  todayTests: string;
  thisWeekTests: string;
};

const useGetJadwalUjian = () => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["jadwal-ujian-summary","jadwal"],
    queryFn: () => {
      const response = service.sendGetRequest<IUpcoming>(
        `/upcoming-tests/upcoming`
      );
      return response;
    },
  });
};
export default useGetJadwalUjian;
