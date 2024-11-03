import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetQuestionCategoryQuery from "../hooks/useGetQuestionCategoryQuery";
import useUpdateQuestionCategoryMutation from "../hooks/useUpdateQuestionCategoryMutation";
import { editQuestionCategorySchema } from "../schemas/EditQuestionCategorySchema";

export const EditCategorySoalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const { data: categoryData, isLoading: isFetchingData } =
    useGetQuestionCategoryQuery(id);

  const methods = useForm({
    resolver: zodResolver(editQuestionCategorySchema),
    defaultValues: {
      nama_kategori: "",
      bobot_benar: 0,
      bobot_salah: 0,
      tidak_menjawab: 0,
    },
    mode: "onTouched",
  });

  const { handleSubmit, reset, formState } = methods;

  const { isValid } = formState;

  useEffect(() => {
    if (categoryData?.data?.data) {
      const { nama_kategori, bobot_benar, bobot_salah, tidak_menjawab } =
        categoryData.data.data;
      reset({
        nama_kategori,
        bobot_benar,
        bobot_salah,
        tidak_menjawab,
      });
    }
  }, [categoryData, reset]);

  const { mutateAsync: updateQuestionCategory, isLoading } =
    useUpdateQuestionCategoryMutation(id, {
      onSuccess: () => {
        setIsSuccess(true);
        setConfirmationDialog(false);
      },
    });

  const onSubmit = (data: {
    nama_kategori: string;
    bobot_benar: number;
    bobot_salah: number;
    tidak_menjawab: number;
  }) => {
    updateQuestionCategory({ ...data });
  };

  if (!categoryData) {
    return null;
  }

  return (
    <section className="pt-1">
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Data Berhasil Diupdate"
        onSubmit={() => {
          navigate("/kategori-soal");
        }}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        description="Apakah Anda yakin ingin menyimpan perubahan data ini?"
        onSubmit={handleSubmit(onSubmit)}
      />
      <Breadcrumbs
        paths={[
          { label: "Daftar Management Kategori Soal", path: "/kategori-soal" },
          { label: "Edit Kategori Soal" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header className="mb-3">
          <h1 className="text-lg">Edit Kategori Kesulitan</h1>
        </header>
        {isFetchingData ? (
          <p>Loading...</p>
        ) : (
          <FormProvider {...methods}>
            <FormInput
              name="nama_kategori"
              placeholder="Edit Nama Kategori"
              label="Kategori Soal"
            />
            <div className="flex gap-3 items-start mt-4">
              <FormInput
                name="bobot_benar"
                placeholder="Edit Nilai"
                label="Bobot Nilai Benar"
                type="number"
              />
              <FormInput
                name="bobot_salah"
                placeholder="Edit Nilai"
                label="Bobot Nilai Salah"
                type="number"
              />
              <FormInput
                name="tidak_menjawab"
                placeholder="Edit Nilai"
                label="Tidak Menjawab"
                type="number"
              />
            </div>
            <div className="flex justify-end gap-3 pt-5">
              <Button
                className="h-12 w-40"
                onClick={() => navigate("/kategori-soal")}
              >
                Batal
              </Button>
              <Button
                onClick={() => setConfirmationDialog(true)}
                className="h-12 w-40"
                disabled={isLoading || isFetchingData || !isValid}
              >
                Simpan
              </Button>
            </div>
          </FormProvider>
        )}
      </div>
    </section>
  );
};
