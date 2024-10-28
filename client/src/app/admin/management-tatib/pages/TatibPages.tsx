import { FC, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InfoCircledIcon } from "@radix-ui/react-icons";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "npm:pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const TatibPages: FC = () => {
  const [numPages, setNumPages] = useState<number>(1);
  const [file, setFile] = useState(null);
  console.log(file);
  const onDocumentLoadSuccess = (nextNumPages) => {
    setNumPages(nextNumPages);
  };

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  return (
    <div>
      <Card className="px-4 py-4 flex flex-col gap-4">
        <CardTitle className="flex flex-col">
          <h1 className="text-2xl font-medium">Import Tata Tertib</h1>
          <p className="text-base font-medium">
            Mata Ujian Peraturan Jabatan PPAT
          </p>
        </CardTitle>
        <CardContent className="w-full px-2 flex flex-col gap-2">
          <Input
            className="w-full h-[50px]"
            type="file"
            onChange={onFileChange}
          />
          <div className="flex gap-1 items-center">
            <InfoCircledIcon className="text-gray-500" />
            <p className="text-xs text-gray-500">
              Supported File or Maximum Size Here lorem Ipsum dolor sit Amet
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="actions" size="actions" className="w-44">
            Batal
          </Button>
          <Button variant="actions" size="actions" className="w-44">
            Import File Tatib
          </Button>
        </CardFooter>
      </Card>
      {file && (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={numPages} />
        </Document>
      )}
    </div>
  );
};

export default TatibPages;
