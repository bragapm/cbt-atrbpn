import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";
import { IUjian, IUserSessionTest } from "@/types/collection/ujian.type";

const useGetDetailManajemenUjian = (id: string | number | undefined) => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["management-ujian-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID is required");

      const userSessionResponse = await service.sendGetRequest<
        IBaseResponse<IUserSessionTest[]>
      >(`/items/user_session_test?filter[session][_eq]=${id}`);

      const userIds = userSessionResponse.data.data.map((user) => user.user);

      const ujianResponse = await service.sendGetRequest<IBaseResponse<IUjian>>(
        `/items/session_test/${id}`,
        { fields: ["*.*"] }
      );

      const response = {
        data: {
          ...ujianResponse.data.data,
          user: userIds,
        },
      };

      console.log({ response });
      return response?.data;
    },
    enabled: !!id,
  });
};
export default useGetDetailManajemenUjian;
