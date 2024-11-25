import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IUser } from "@/types/collection/user.type";
import { useQuery } from "react-query";

const directusApiService = new DirectusInterceptor();

type IUseGetCurrentUser = {
  enabled: boolean;
};

const useGetCurrentUser = ({ enabled }: IUseGetCurrentUser) => {
  return useQuery({
    queryKey: ["currentUser"],
    enabled: enabled,
    queryFn: async () => {
      const { data } = await directusApiService.sendGetRequest<
        IBaseResponse<IUser>
      >("/users/me?fields=*.*");

      return data;
    },
  });
};

export default useGetCurrentUser;
