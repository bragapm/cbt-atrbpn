import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

const useStatistikBankSoal = (id?: string) => {
  const service = new DirectusInterceptor();
  let query = id ? "metric-materi?materi_id="+id:"metric-group-soal"
  return useQuery({
    queryKey: ["statistik-bank-soal", query],
    queryFn: () => {
      const response = service.sendGetRequest<any>(
        `/${query}`
      );
      return response;
    },
  });
};
export default useStatistikBankSoal;
