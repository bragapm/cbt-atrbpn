import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const BankSoalImportPage: React.FC = () => {
  return (
    <Card className="px-4 py-4 flex flex-col gap-4">
      <CardTitle className="flex flex-col">
        <h1 className="text-2xl font-medium">Import Soal</h1>
        <p className="text-base font-medium">
          Mata Ujian Peraturan Jabatan PPAT
        </p>
        <p className="text-sm  font-medium">Soal No. 13 / 20</p>
      </CardTitle>

      <CardContent className="w-full px-2 flex flex-col gap-2">
        <Input className="w-full h-[50px]" type="file" />
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
          Import Soal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BankSoalImportPage;
