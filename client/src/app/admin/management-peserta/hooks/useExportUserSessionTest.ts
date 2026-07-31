import { DirectusInterceptor } from "@/services/directus-interceptors";

const service = new DirectusInterceptor();

const XLSX_MIME =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const DEFAULT_FILENAME = "user_session_test.xlsx";

// Nama file diambil dari header Content-Disposition kalau server mengizinkan
// (butuh Access-Control-Expose-Headers), selain itu pakai nama default.
const getFilenameFromHeader = (contentDisposition?: string) => {
  if (!contentDisposition) return DEFAULT_FILENAME;

  const utf8Match = /filename\*=UTF-8''([^;]+)/i.exec(contentDisposition);
  if (utf8Match?.[1]) return decodeURIComponent(utf8Match[1]);

  const match = /filename="?([^"';]+)"?/i.exec(contentDisposition);
  return match?.[1]?.trim() || DEFAULT_FILENAME;
};

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
      type: response.data.type || XLSX_MIME,
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    link.setAttribute(
      "download",
      getFilenameFromHeader(response.headers?.["content-disposition"])
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("File download failed", error);
  }
};
