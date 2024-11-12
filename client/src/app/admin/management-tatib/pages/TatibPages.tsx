import { InfoCircledIcon } from "@radix-ui/react-icons";

import { FC, useEffect, useState } from "react";
import { Upload } from "lucide-react";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MemoLoader from "@/components/ui/Loader";
import { Input } from "@/components/ui/input";

import useUploadFile from "../hooks/useUploadFile";
import useGetTatib from "../hooks/useGetTatib";
import PDFViewers from "../components/PDFViewers";

const TatibPages: FC = () => {
  const [file, setFile] = useState<any>(null);
  const [openImport, setOpenImport] = useState(false);
  const { data: fileTatib } = useGetTatib();

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;
    const nextFile = files?.[0];
    if (nextFile) {
      setFile(nextFile);
    }
  }

  const { mutate, isLoading } = useUploadFile({
    onSuccess: () => {
      setFile(null);
      setOpenImport(false);
    },
  });

  const onSubmit = () => {
    const formData = new FormData();
    if (fileTatib?.data) {
      formData.append("name", fileTatib?.data?.data[0].name);
      formData.append("file_link", fileTatib?.data?.data[0].file_link);
    } else {
      formData.append("name", "tatib");
    }
    formData.append("file", file);

    mutate(formData);
  };

  useEffect(() => {
    if (fileTatib?.data && openImport === false) {
      const url =
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL +
        "/assets/" +
        fileTatib?.data?.data[0].file_link;
      setFile(url);
    }
  }, [fileTatib, openImport]);
  console.log(file);

  return (
    <div>
      <Card className="px-4 py-4 flex flex-col gap-4">
        {openImport ? (
          <>
            <CardTitle className="flex flex-col">
              <h1 className="text-base font-medium text-gray-600">
                Import Tata Tertib
              </h1>
              <p className="text-sm font-light">
                Mata Ujian Peraturan Jabatan PPAT
              </p>
            </CardTitle>
            <CardContent className="w-full p-0 flex flex-col gap-2">
              <Input
                className="w-full h-[50px]"
                type="file"
                onChange={onFileChange}
              />
              <div className="flex gap-1 items-center">
                <InfoCircledIcon className="text-gray-500" />
                <p className="text-xs text-gray-500">Supported File pdf</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 p-0">
              <Button
                variant="destructive"
                size="actions"
                className="w-36 h-10"
                onClick={() => {
                  setFile(null);
                  setOpenImport(false);
                }}
              >
                Batal
              </Button>
              <Button
                variant="actions"
                size="actions"
                startContent={<Upload />}
                onClick={() => onSubmit()}
              >
                {isLoading ? (
                  <div className="">
                    <MemoLoader width={20} height={20} color={"white"} />
                  </div>
                ) : (
                  "upload File"
                )}
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-base font-medium text-gray-600">
                  Import Tata Tertib
                </h1>
                <p className="text-sm font-light">
                  Mata Ujian Peraturan Jabatan PPAT
                </p>
              </div>
              <Button
                variant="actions"
                size="actions"
                startContent={<Upload />}
                onClick={() => {
                  setOpenImport(true);
                  setFile(null);
                }}
              >
                Import Tata tertib
              </Button>
            </div>
          </>
        )}
        <PDFViewers file={file} />
      </Card>
    </div>
  );
};

export default TatibPages;
