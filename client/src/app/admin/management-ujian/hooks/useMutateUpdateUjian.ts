import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import {
  IUjian,
  IUjianRequest,
  IUserSessionTest,
  IUserSessionTestRequest,
} from "@/types/collection/ujian.type";
import { IBaseResponse } from "@/types/base-response";

type IUseMutateUjian = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useMutateUpdateUjian = ({ onSuccess, onError }: IUseMutateUjian) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IUjianRequest) => {
      const { user, ...sessionData } = data;

      // Update sesi ujian. `user` is deliberately left out: peserta are linked
      // through user_session_test rows, which are patched separately below.
      const response = await service.sendPatchRequest<
        Omit<IUjianRequest, "user">,
        IBaseResponse<IUjian>
      >(`/items/session_test/${data.id}`, sessionData);

      // Assign the selected peserta to this sesi. Patching an already assigned
      // peserta writes the same value, so this is safe to run for the whole
      // selection; nothing is ever un-assigned here.
      if (user?.length) {
        await Promise.all(
          user.map((userSessionId) =>
            service.sendPatchRequest<
              IUserSessionTestRequest,
              IBaseResponse<IUserSessionTest>
            >(`/items/user_session_test/${userSessionId}`, {
              session: data.id,
            })
          )
        );
      }

      return response;
    },
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["management-ujian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["management-ujian-detail", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-sessions-test"],
      });
      onSuccess?.();
    },
    onError: (error: AxiosError<IBaseErrorResponse>) => {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";

      onError?.(errorMessage);
    },
  });
};

export default useMutateUpdateUjian;
