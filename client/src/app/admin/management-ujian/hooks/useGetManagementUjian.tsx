import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";
export type IUjian = {
  id: number;
  status: string | null;
  name: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  PIN: number | null;
};
const useGetManagementUjian = () => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["management-ujian"],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IUjian[]>>(
        "/items/session_test"
      );
      return response;
    },
  });
};
export default useGetManagementUjian;
