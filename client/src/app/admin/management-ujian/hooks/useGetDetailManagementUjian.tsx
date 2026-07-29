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
      >(`/items/user_session_test?filter[session][_eq]=${id}&limit=1000`);

      // Use the user_session_test row id, not the `user` field: that row id is
      // what the peserta table checkboxes and the assign PATCH both work with.
      const userIds = userSessionResponse.data.data.map((user) => user.id);

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

      // console.log({ response });
      return response?.data;
    },
    enabled: !!id,
  });
};
export default useGetDetailManajemenUjian;
