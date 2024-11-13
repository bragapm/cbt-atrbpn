import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";
import { IUjian } from "@/types/collection/ujian.type";
import { IDirectusQueryParams } from "@/types/directus.type";

const useGetManagementUjian = ({
  page,
  limit,
  search,
}: IDirectusQueryParams) => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["management-ujian", page, limit, search],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IUjian[]>>(
        "/items/session_test",
        { fields: ["*.*"], meta: "*", page, limit, search: search }
      );
      return response?.data;
    },
  });
};
export default useGetManagementUjian;
