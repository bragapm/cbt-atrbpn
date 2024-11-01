import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IUser } from "@/types/collection/user.type";
import { IDirectusQueryParams } from "@/types/directus.type";
import { useQuery } from "react-query";

const useGetUserUjian = ({ page, limit, search }: IDirectusQueryParams) => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IUser[]>>(
        "/users",
        {
          fields: ["*.*"],
          meta: "*",
          page,
          limit,
          filter: search
            ? {
                _or: [
                  { first_name: { _contains: search } },
                  { last_name: { _contains: search } },
                ],
              }
            : {},
        }
      );
      return response?.data;
    },
  });
};

export default useGetUserUjian;
