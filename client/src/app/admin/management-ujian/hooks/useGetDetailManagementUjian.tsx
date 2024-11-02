import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";
import { IUjian } from "@/types/collection/ujian.type";
import { IDirectusQueryParams } from "@/types/directus.type";

type IUseDetailManagementUjian = {
  ujianId: string | number;
};

const useGetDetailManajemenUjian = ({ ujianId }: IUseDetailManagementUjian) => {
  const service = new DirectusInterceptor();

  return useQuery({
    enabled: !!ujianId,
    queryKey: ["management-ujian-detail"],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IUjian>>(
        `/items/session_test/${ujianId}`,
        { fields: ["*.*"] }
      );
      return response?.data;
    },
  });
};
export default useGetDetailManajemenUjian;
