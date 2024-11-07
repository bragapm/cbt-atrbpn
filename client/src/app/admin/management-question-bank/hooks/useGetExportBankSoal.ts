import { DirectusInterceptor } from "@/services/directus-interceptors";
import { useRef } from "react";
import { useMutation } from "react-query";

const useGetExportBankSoal = () => {
  const service = new DirectusInterceptor();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["export-ujian"],
    mutationFn: async () => {
      const response = await service.sendGetRequest<string>(
        "/export-pertanyaan"
      );
      return response?.data;
    },
    onSuccess: (data) => {
      // handle download file in this
    },
  });

  return { mutate, isLoading, downloadRef };
};

export default useGetExportBankSoal;
