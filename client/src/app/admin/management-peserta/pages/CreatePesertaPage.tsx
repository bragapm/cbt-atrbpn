import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Formik, useFormikContext } from "formik";
import { CreatePesertaCBTFormValue } from "../types";
import { FormInput } from "@/components/forms/FormInput";
import { Dropdown } from "@/components/ui/dropdown";

const CreatePesertaFormInner = () => {
  const { handleSubmit } = useFormikContext<CreatePesertaCBTFormValue>();
  return (
    <form className="mt-4 space-y-2">
      <div className="flex gap-3">
        <FormInput
          name="idPeserta"
          placeholder="Masukan ID Peserta"
          label="ID Peserta"
        />
        <FormInput
          name="namaPeserta"
          placeholder="Masukan Nama Peserta"
          label="Nama Peserta"
        />
      </div>
      <div className="flex gap-3">
        <FormInput
          name="nomorKontak"
          placeholder="Masukan Nomor Kontak"
          label="Nomor Kontak"
        />
        <Dropdown />
      </div>

      <div className="flex justify-end gap-3 pt-5">
        <Button className=" w-40">Batal</Button>
        <Button onClick={() => handleSubmit()} type="submit" className="w-40">
          Tambah Peserta
        </Button>
      </div>
    </form>
  );
};

export const CreatePesertaPage = () => {
  return (
    <section>
      <Breadcrumbs
        paths={[
          { label: "Daftar Peserta", path: "/peserta-cbt" },
          { label: "Tambah Peserta" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header>
          <h1 className="text-lg">Tambah Peserta</h1>
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
          <CreatePesertaFormInner />
        </Formik>
      </div>
    </section>
  );
};
