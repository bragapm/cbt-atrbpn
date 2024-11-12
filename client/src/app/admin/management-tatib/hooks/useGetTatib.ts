import { DirectusInterceptor } from "@/services/directus-interceptors";
import { useQuery } from "react-query";


const useGetTatib = () => {
  const service = new DirectusInterceptor(); 

  return useQuery({
    queryKey: ["tatib-get", ""],
    queryFn: () => {
      const response = service.sendGetRequest<any>(
        `/rules`,
     
      );
      return response;
    },
  });
};
export default useGetTatib;
