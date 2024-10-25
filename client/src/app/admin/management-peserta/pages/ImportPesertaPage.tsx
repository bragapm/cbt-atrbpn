import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { ImportPesertaCBTFormValue } from "../types";
import { FormInputFile } from "@/components/forms/FormInputFile";

const ImportPesertaFormInner = () => {
  return (
    <>
      <FormInputFile name="filePeserta" />

      <div className="flex justify-end gap-3 pt-5">
        <Button className=" w-40">Batal</Button>
        <Button type="submit" className="w-40">
          Tambah Peserta
        </Button>
      </div>
    </>
  );
};

export const ImportPesertaPage = () => {
  const methods = useForm({
    defaultValues: {
      filePeserta: null,
    },
    mode: "onTouched",
  });

  const onSubmit = (data: ImportPesertaCBTFormValue) => {
    console.log("Form Data:", data);
  };

  return (
    <section>
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
          <form
            className="mt-4 space-y-2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <ImportPesertaFormInner />
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
