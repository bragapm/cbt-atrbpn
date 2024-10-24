import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { CreatePesertaCBTFormValue } from "../types";
import { FormSelect } from "@/components/forms/FormSelect";

const CreatePesertaFormInner = () => {
  return (
    <>
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
      <div className="flex gap-3 items-start">
        <FormInput
          name="nomorKontak"
          placeholder="Masukan Nomor Kontak"
          label="Nomor Kontak"
        />
        <FormSelect
          label="Sesi Ujian"
          options={[
            { label: "Sesi 1", value: "1" },
            { label: "Sesi 2", value: "2" },
          ]}
          name="sesiUjian"
        />
      </div>

      <div className="flex justify-end gap-3 pt-5">
        <Button className=" w-40">Batal</Button>
        <Button type="submit" className="w-40">
          Tambah Peserta
        </Button>
      </div>
    </>
  );
};

export const CreatePesertaPage = () => {
  const methods = useForm({
    defaultValues: {
      idPeserta: "",
      namaPeserta: "",
      nomorKontak: "",
      sesiUjian: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: CreatePesertaCBTFormValue) => {
    console.log("Form Data:", data);
  };

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
        <FormProvider {...methods}>
          <form
            className="mt-4 space-y-2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <CreatePesertaFormInner />
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
