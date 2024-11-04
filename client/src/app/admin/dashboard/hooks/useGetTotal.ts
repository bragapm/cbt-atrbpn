import { DirectusInterceptor } from "@/services/directus-interceptors";
import { useQuery } from "react-query";

const useGetTotal = () => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["metric-dash"],
    queryFn: () => {
      const response = service.sendGetRequest<any>(
        "/metric-dashboard"
      );
      return response;
    },
  });
};
export default useGetTotal;
