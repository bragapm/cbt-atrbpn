import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import UploadFile from "@/components/upload-file";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useImportBankSoal from "../hooks/useImportBankSoal";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";

const BankSoalImportPage: React.FC = () => {
  const form = useForm({});
  const navigation = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: importBankSoal } = useImportBankSoal({
    onSuccess: () => {
      setIsSuccess(true);
      setConfirmationDialog(false);
    },
    onError: (error: string) => {
      alert(error);
    },
  });

  const onSubmit = () => {
    if (!file) {
      alert("Silahkan Pilih File untuk di import!");
      return;
    }
    importBankSoal(file);
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <SuccessDialog
          isOpen={isSuccess}
          onOpenChange={setIsSuccess}
          description="Data Berhasil Diimport"
          onSubmit={() => {
            navigation("/bank-soal");
          }}
        />
        <ConfirmationDialog
          isOpen={confirmationDialog}
          onOpenChange={setConfirmationDialog}
          description="Apakah Anda yakin ingin menyimpan data ini?"
          onSubmit={onSubmit}
        />
        <BreadcrumbAdmin
          items={[
            { label: "Daftar Soal", href: "/bank-soal" },
            { label: "Import Soal" },
          ]}
        />

        <Card className=" px-2 pt-4 pb-2 flex flex-col gap-4">
          <CardTitle className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-light">Import Soal</h1>
              <p className="text-base font-light">
                Mata Ujian Peraturan Jabatan PPAT
              </p>
            </div>
          </CardTitle>

          <CardContent className="w-full px-2 flex flex-col gap-2">
            <div className="w-full h-full">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadFile
                        title="Import File Soal"
                        value={file}
                        onChange={(newFile: File) => {
                          setFile(newFile);
                          field.onChange(newFile);
                        }}
                        className="w-full h-full text-left flex justify-between px-4 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-1 items-center">
              <InfoCircledIcon className="text-gray-500" />
              <p className="text-xs text-gray-500">
                Supported File or Maximum Size Here lorem Ipsum dolor sit Amet
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="actions"
              size="actions"
              className="w-44"
              onClick={() => navigation("/bank-soal")}
            >
              Batal
            </Button>
            <Button
              variant="actions"
              size="actions"
              className="w-44"
              onClick={() => setConfirmationDialog(true)}
            >
              Import Soal
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Form>
  );
};

export default BankSoalImportPage;
