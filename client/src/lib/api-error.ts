import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";

/**
 * On a 400 the Directus interceptor throws the raw response body instead of the
 * AxiosError, so an error arriving in a mutation is one of two shapes. Reading
 * `error.response.data` blindly throws inside `onError` and the UI ends up
 * showing nothing at all — read both shapes here instead.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback = "Coba Sesaat Lagi"
) => {
  const body =
    (error as AxiosError<IBaseErrorResponse>)?.response?.data ??
    (error as IBaseErrorResponse);

  return body?.errors?.[0]?.message ?? fallback;
};
