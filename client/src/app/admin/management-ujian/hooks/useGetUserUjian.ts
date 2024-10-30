import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IUser } from "@/types/collection/user.type";
import { IDirectusQueryParams } from "@/types/directus.type";
import { useQuery } from "react-query";

const useGetUserUjian = ({ page, limit }: IDirectusQueryParams) => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IUser[]>>(
        "/users",
        { fields: ["*.*"], meta: "*", page, limit }
      );
      return response?.data;
    },
  });
};

export default useGetUserUjian;
