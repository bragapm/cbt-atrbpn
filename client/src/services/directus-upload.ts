import { DirectusInterceptor } from "./directus-interceptors";

const service = new DirectusInterceptor();

type IDirectusUpload = {
  file: File;
  folderKey?: string;
};

export type IDirectusUploadResponse = {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string;
  type: string;
  folder: string;
  uploaded_by: string;
  uploaded_on: string;
  modified_by: string | null;
  modified_on: string;
  charset: string | null;
  filesize: string;
  width: number;
  height: number;
  duration: number | null;
  embed: any | null;
  description: string | null;
  location: string | null;
  tags: string[] | null;
  metadata: Record<string, any>;
};

const DirectusUpload = async ({ file, folderKey }: IDirectusUpload) => {
  const formData = new FormData();

  if (folderKey !== undefined) {
    formData.append("folder", folderKey);
  }

  formData.append("file", file);

  const response = await service.sendPostRequest("/files", formData, "", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data as IDirectusUploadResponse;
};

export default DirectusUpload;
