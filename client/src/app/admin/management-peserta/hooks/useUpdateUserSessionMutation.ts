import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CreateUserSessionTest } from "../types";

type IUseUpdateUserSessionMutate = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useUpdateUserSessionMutation = (
  id: string,
  { onSuccess, onError }: IUseUpdateUserSessionMutate
) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CreateUserSessionTest>) => {
      const response = await service.sendPatchRequest(
        `/items/user_session_test/${id}`,
        data
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-sessions-test"],
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

export default useUpdateUserSessionMutation;
