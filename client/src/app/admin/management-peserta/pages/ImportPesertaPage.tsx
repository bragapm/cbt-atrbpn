import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Formik, useFormikContext } from "formik";
import { CreatePesertaCBTFormValue } from "../types";
import { FormInput } from "@/components/forms/FormInput";

const ImportPesertaFormInner = () => {
  const { handleSubmit } = useFormikContext<CreatePesertaCBTFormValue>();
  return (
    <form className="mt-4 space-y-2">
      <FormInput name="idPeserta" placeholder="Add File" />

      <div className="flex justify-end gap-3 pt-5">
        <Button className=" w-40">Batal</Button>
        <Button onClick={() => handleSubmit()} type="submit" className="w-40">
          Import Data Peserta
        </Button>
      </div>
    </form>
  );
};

export const ImportPesertaPage = () => {
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
        <Formik<CreatePesertaCBTFormValue>
          initialValues={{
            idPeserta: "",
            namaPeserta: "",
            nomorKontak: "",
            sesiUjian: "",
          }}
          onSubmit={(value: CreatePesertaCBTFormValue) => {
            console.log(value);
          }}
        >
          <ImportPesertaFormInner />
        </Formik>
      </div>
    </section>
  );
};
