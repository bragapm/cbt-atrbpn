import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Document, Page, pdfjs } from "react-pdf";
import { Upload } from "lucide-react";
import { FC, useState } from "react";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useUploadFile from "../hooks/useUploadFile";
import useGetTatib from "../hooks/useGetTatib";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const TatibPages: FC = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState<number>();
  const [openImport, setOpenImport] = useState(false);
  const { data: fileTatib } = useGetTatib();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;
    const nextFile = files?.[0];
    if (nextFile) {
      setFile(nextFile);
    }
  }

  const { mutateAsync: createPendistribusianSoal, isLoading } = useUploadFile({
    onSuccess: () => {
      // setIsSuccess(true);
      // setConfirmationDialog(false);
    },
  });

  const onSubmit = (data) => {
    const obj = {};
    createPendistribusianSoal(obj);
  };

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
              >
                upload File
              </Button>
            </CardFooter>
            {file && (
              <div className="">
                <hr />
                <p className="font-medium underline pt-4">Preview Pdf</p>
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={numPages} />
                </Document>
              </div>
            )}
          </>
        ) : (
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
              onClick={() => setOpenImport(true)}
            >
              Import Tata tertib
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TatibPages;
