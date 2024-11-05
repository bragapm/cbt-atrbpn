import { DirectusInterceptor } from "@/services/directus-interceptors";

const service = new DirectusInterceptor();

export const useExportUserSessionTest = async () => {
  try {
    const response = await service.sendGetRequest<Blob>(
      "/export-peserta",
      {},
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: "blob",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("download", "user_session_test.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("File download failed", error);
  }
};
