import { DirectusInterceptor } from "@/services/directus-interceptors";
import { useQuery } from "react-query";


const useGetHasilUjian = (date?: string) => {
  const service = new DirectusInterceptor(); 
  let query = date? "by-session?date="+date:"by-date"

  return useQuery({
    queryKey: ["hasi-ujian-average", date],
    queryFn: () => {
      const response = service.sendGetRequest<any>(
        `/metric-score/`+query,
     
      );
      return response;
    },
  });
};
export default useGetHasilUjian;
