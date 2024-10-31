import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { EditPesertaCBTFormValue } from "../types";
import { FormSelect } from "@/components/forms/FormSelect";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetUserSessionTestQuery from "../hooks/useGetUserSessionTestQuery";

const EditPesertaFormInner = () => {
  return (
    <>
      <div className="flex gap-3">
        <FormInput
          name="code"
          placeholder="Masukan ID Peserta"
          label="ID Peserta"
        />
        <FormInput
          name="nama_peserta"
          placeholder="Masukan Nama Peserta"
          label="Nama Peserta"
        />
      </div>
      <div className="flex gap-3 items-start">
        <FormInput
          name="nomor_kontak"
          placeholder="Masukan Nomor Kontak"
          label="Nomor Kontak"
        />
        <FormSelect
          label="Sesi Ujian"
          options={[
            { label: "Sesi 1", value: "1" },
            { label: "Sesi 2", value: "2" },
          ]}
          name="sesi_ujian"
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

export const EditPesertaPage = () => {
  const params = useParams();
  const { data: peserta, isLoading } = useGetUserSessionTestQuery(
    params?.pesertaId
  );

  const methods = useForm({
    defaultValues: {
      code: "",
      nama_peserta: "",
      nomor_kontak: "",
      sesi_ujian: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!isLoading && peserta?.data?.data) {
      methods.reset({
        code: peserta?.data?.data?.info_peserta.code,
        nama_peserta: peserta?.data?.data?.info_peserta.nama_peserta,
        nomor_kontak: peserta?.data?.data?.info_peserta.nomor_kontak,
        sesi_ujian: peserta?.data?.data?.session?.name,
      });
    }
  }, [methods, isLoading, peserta?.data?.data]);

  const onSubmit = (data: EditPesertaCBTFormValue) => {
    console.log("Form Data:", data);
  };

  return (
    <section>
      <Breadcrumbs
        paths={[
          { label: "Daftar Peserta", path: "/peserta-cbt" },
          { label: "Edit Peserta" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header>
          <h1 className="text-lg">Edit Peserta</h1>
          <h2 className="text-sm">Data Peserta Ujian CBT ATR/BPN</h2>
        </header>
        <FormProvider {...methods}>
          <form
            className="mt-4 space-y-2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <EditPesertaFormInner />
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
