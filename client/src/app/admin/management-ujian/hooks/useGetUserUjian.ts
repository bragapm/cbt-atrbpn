import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IUser } from "@/types/collection/user.type";
import { useQuery } from "react-query";

const useGetUserUjian = () => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IUser[]>>(
        "/users",
        { fields: ["*.*"], meta: "*" }
      );
      return response?.data;
    },
  });
};

export default useGetUserUjian;
