import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";
import useGetQuestionCategories from "../../management-kategori-soal/hooks/useGetQuestionCategoriesQuesry";
import useGetManagementDistribusiSoalDetailQuery from "../hooks/useGetManagementDistribusiSoalDetailQuery";
import useGetMateriSoalQuery from "../hooks/useGetMateriSoalQuery";
import useUpdatePendisribusianSoalMutation from "../hooks/useUpdatePendistribusianSoalMutation";
import { PendistribusianSoalFormValue } from "../types";

const EditDistribusiSoalFormInner = ({
  questionCategoriesOption,
  materiSoalId,
}) => {
  const { data: materiSoal } = useGetMateriSoalQuery(materiSoalId || undefined);
  return (
    <>
      <div className="w-full border border-gray-400 py-2 px-3 rounded-xl mb-3">
        <p className="text-xs text-gray-500">Materi Soal</p>
        <p className="text-sm py-1">{materiSoal?.data?.data?.materi}</p>
      </div>
      <div className="border p-3 rounded-xl space-y-3 mb-4">
        <h2>Kategori Soal</h2>
        <div className="flex gap-3 items-start">
          <FormSelect
            label="Kategori Soal"
            options={questionCategoriesOption}
            name="kategori_soal"
          />
          <FormInput
            name="jumlah_soal"
            placeholder="Tambahkan Jumlah Distribusi"
            label="Jumlah Distribusi"
            type="number"
          />
        </div>
        <div className="flex gap-3 items-start">
          <FormInput
            name="bobot_benar"
            placeholder="Tambahkan Nilai"
            label="Bobot Nilai Benar"
            type="number"
            disabled
          />
          <FormInput
            name="bobot_salah"
            placeholder="Tambahkan Nilai"
            label="Bobot Nilai Salah"
            type="number"
            disabled
          />
          <FormInput
            name="tidak_menjawab"
            placeholder="Tambahkan Nilai"
            label="Tidak Menjawab"
            type="number"
            disabled
          />
        </div>
      </div>
    </>
  );
};

export const EditDistribusiSoalPage = () => {
  const { distribusiSoalId } = useParams();
  const navigation = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  const { data: distribusiSoalData, isLoading } =
    useGetManagementDistribusiSoalDetailQuery(distribusiSoalId);

  const { data: kategoriSoal } = useGetQuestionCategories();

  const questionCategoriesOption =
    kategoriSoal?.data?.data.map((item) => ({
      label: item.nama_kategori,
      value: String(item.id),
    })) || [];

  const methods = useForm({
    defaultValues: {
      kategori_soal: "",
      jumlah_soal: 0,
      bobot_benar: 0,
      bobot_salah: 0,
      tidak_menjawab: 0,
    },
    mode: "onTouched",
  });

  const { handleSubmit, setValue, watch, formState } = methods;
  const { isValid } = formState;

  const selectedCategory = watch("kategori_soal");

  useEffect(() => {
    if (distribusiSoalData) {
      setValue(
        "kategori_soal",
        String(distribusiSoalData.data.data.kategori_id.id)
      );
      setValue("jumlah_soal", distribusiSoalData.data.data.jumlah_soal);
      setValue(
        "bobot_benar",
        distribusiSoalData.data.data.kategori_id.bobot_benar
      );
      setValue(
        "bobot_salah",
        distribusiSoalData.data.data.kategori_id.bobot_salah
      );
      setValue(
        "tidak_menjawab",
        distribusiSoalData.data.data.kategori_id.tidak_menjawab
      );
    }
  }, [distribusiSoalData, setValue]);

  useEffect(() => {
    const selectedCategoryData = kategoriSoal?.data?.data.find(
      (item) => String(item.id) === selectedCategory
    );

    if (selectedCategoryData) {
      setValue("bobot_benar", selectedCategoryData.bobot_benar);
      setValue("bobot_salah", selectedCategoryData.bobot_salah);
      setValue("tidak_menjawab", selectedCategoryData.tidak_menjawab);
    }
  }, [selectedCategory, kategoriSoal, setValue]);

  const { mutateAsync: updatePendsitribusianSoal, isLoading: loadingUpdate } =
    useUpdatePendisribusianSoalMutation(distribusiSoalId, {
      onSuccess: () => {
        setIsSuccess(true);
        setConfirmationDialog(false);
      },
    });

  const onSubmit = (data: PendistribusianSoalFormValue) => {
    updatePendsitribusianSoal({
      kategori_id: data.kategori_soal,
      jumlah_soal: data.jumlah_soal,
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="pt-1">
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Pendistribusian Soal Diperbarui"
        onSubmit={() => {
          navigation("/pendistribusian-soal");
        }}
      />
      <ConfirmationDialog
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        isLoading={loadingUpdate}
        description="Apakah Anda yakin ingin memperbarui Pendistribusian Soal?"
        onSubmit={handleSubmit(onSubmit)}
      />
      <Breadcrumbs
        paths={[
          {
            label: "Daftar Management Pendistribusian Soal",
            path: "/pendistribusian-soal",
          },
          { label: "Edit Pendistribusi Soal" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header className="mb-4">
          <h1 className="text-lg">Edit Pendistribusian Soal</h1>
        </header>
        <FormProvider {...methods}>
          <EditDistribusiSoalFormInner
            questionCategoriesOption={questionCategoriesOption}
            materiSoalId={distribusiSoalData?.data?.data?.materi_id?.id}
          />
          <div className="flex justify-end gap-3 pt-5">
            <Button
              onClick={() => navigation("/kategori-soal")}
              className="h-12 w-40"
            >
              Batal
            </Button>
            <Button
              onClick={() => setConfirmationDialog(true)}
              className="h-12 w-40"
              disabled={!isValid}
            >
              Simpan
            </Button>
          </div>
        </FormProvider>
      </div>
    </section>
  );
};
