import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

const useStatistikBankSoal = (id?: string) => {
  const service = new DirectusInterceptor();
  let query = id ? "?materi_id="+id:""
  return useQuery({
    queryKey: ["statistik-bank-soal", query],
    queryFn: () => {
      const response = service.sendGetRequest<any>(
        `/metric-materi${query}`
      );
      return response;
    },
  });
};
export default useStatistikBankSoal;
