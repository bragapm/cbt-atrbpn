import { deleteAccessToken, getAccessToken } from "@/midlewares/token";
import { DirectusInterceptor } from "@/services/directus-interceptors";
import { useMutation } from "react-query";
const directusApiService = new DirectusInterceptor();

const useLogoutUser = () => {
  const accessToken = getAccessToken();

  return useMutation({
    mutationKey: ["logoutUser"],
    onSuccess: () => {
      deleteAccessToken();
    },
    mutationFn: async () => {
      const { data } = await directusApiService.sendPostRequest<
        {
          refresh_token: string;
        },
        string
      >("/auth/logout", {
        refresh_token: accessToken ?? "",
      });

      return data;
    },
  });
};

export default useLogoutUser;
