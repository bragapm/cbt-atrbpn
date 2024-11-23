import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

type IUseMutateQuestionCategory = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useUpdateAdmin = (
  id: string,
  { onSuccess, onError }: IUseMutateQuestionCategory
) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<any>) => {
      const response = await service.sendPatchRequest(
        `/register-user/update-user/${id}`,
        data
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["update-admin"],
      });
      onSuccess?.();
    },
    onError: (error: AxiosError<IBaseErrorResponse>) => {
      const errorMessage =
        error.response.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";

      onError?.(errorMessage);
    },
  });
};

export default useUpdateAdmin;
