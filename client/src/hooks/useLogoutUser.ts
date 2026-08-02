import { deleteAccessToken, getRefreshToken } from "@/midlewares/token";
import { DirectusInterceptor } from "@/services/directus-interceptors";
import { useMutation } from "react-query";
const directusApiService = new DirectusInterceptor();

const useLogoutUser = () => {
  return useMutation({
    mutationKey: ["logoutUser"],
    // Sesi lokal tetap dibersihkan walau request logout gagal, supaya user
    // tidak tertinggal di dashboard dengan token yang sudah tidak dipakai.
    onSettled: () => {
      deleteAccessToken();
    },
    mutationFn: async () => {
      // Dibaca saat mutasi berjalan, bukan saat render — refresh token bisa
      // sudah dirotasi oleh proses refresh sebelumnya.
      const refreshToken = getRefreshToken();

      const { data } = await directusApiService.sendPostRequest<
        {
          refresh_token: string;
          mode: string;
        },
        string
      >("/auth/logout", {
        refresh_token: refreshToken ?? "",
        mode: "json",
      });

      return data;
    },
  });
};

export default useLogoutUser;
