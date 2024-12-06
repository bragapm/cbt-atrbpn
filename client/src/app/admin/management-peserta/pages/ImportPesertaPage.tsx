import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { ImportPesertaCBTFormValue } from "../types";
import { FormInputFile } from "@/components/forms/FormInputFile";
import useImportPesertaMutation from "../hooks/useImportPesertaMutation";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ImportPesertaFormInner = ({ openConfirmModal }) => {
  const navigation = useNavigate();

  return (
    <>
      <FormInputFile name="filePeserta" description="Supported File" />
      <div className="flex justify-end gap-3 pt-5">
        <Button className="w-40" onClick={() => navigation("/peserta-cbt")}>
          Batal
        </Button>
        <Button onClick={openConfirmModal} className="w-40">
          Tambah Peserta
        </Button>
      </div>
    </>
  );
};

export const ImportPesertaPage = () => {
  const navigation = useNavigate();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const methods = useForm({
    defaultValues: {
      filePeserta: undefined,
    },
    mode: "onTouched",
  });

  const { mutateAsync: importPeserta, isLoading } = useImportPesertaMutation({
    onSuccess: () => {
      setIsSuccess(true);
      setConfirmationDialog(false);
    },
    onError: () => {
      setConfirmationDialog(false);
    },
  });

  const onSubmit = (data: ImportPesertaCBTFormValue) => {
    importPeserta({
      filePeserta: data.filePeserta,
    });
  };

  return (
    <section>
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Peserta CBT Ditambahkan"
        onSubmit={() => {
          navigation("/peserta-cbt");
        }}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        description="Apakah Anda yakin ingin mengimport Peserta CBT"
        onSubmit={methods.handleSubmit(onSubmit)}
      />
      <Breadcrumbs
        paths={[
          { label: "Daftar Peserta", path: "/peserta-cbt" },
          { label: "Import Peserta" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header>
          <h1 className="text-lg">Import Peserta</h1>
          <h2 className="text-sm">Data Peserta Ujian CBT ATR/BPN</h2>
        </header>
        <FormProvider {...methods}>
          <div className="mt-4 space-y-2">
            <ImportPesertaFormInner
              openConfirmModal={() => setConfirmationDialog(true)}
            />
          </div>
        </FormProvider>
      </div>
    </section>
  );
};
