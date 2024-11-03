import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";
import { IUjian } from "@/types/collection/ujian.type";

const useGetDetailManajemenUjian = (id: string | number | undefined) => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["management-ujian-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID is required");

      const response = await service.sendGetRequest<IBaseResponse<IUjian>>(
        `/items/session_test/${id}`,
        { fields: ["*.*"] }
      );
      return response?.data;
    },
    enabled: !!id,
  });
};
export default useGetDetailManajemenUjian;
