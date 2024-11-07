import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash } from "lucide-react";
import useCreateKategoriSoalMutation from "../hooks/useCreateKategoriSoalMutation";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreateQuestionCategoryFormValue } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuestionCategorySchema } from "../schemas/CreateQuestionCategorySchema";

const CreateCategoryFormInner = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "kategori_soal",
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 rounded-xl space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <h2>Kategori Soal {index + 1}</h2>
            {fields.length > 1 && (
              <Button
                startContent={<Trash size={16} />}
                onClick={() => remove(index)}
              ></Button>
            )}
          </div>
          <div className="flex">
            <FormInput
              name={`kategori_soal[${index}].nama_kategori`}
              placeholder="Tambahkan Kategori Tingkat Soal"
              label="Kategori Soal"
            />
          </div>
          <div className="flex gap-3 items-start">
            <FormInput
              name={`kategori_soal[${index}].bobot_benar`}
              placeholder="Tambahkan Nilai"
              label="Bobot Nilai Benar"
              type="number"
            />
            <FormInput
              name={`kategori_soal[${index}].bobot_salah`}
              placeholder="Tambahkan Nilai"
              label="Bobot Nilai Salah"
              type="number"
            />
            <FormInput
              name={`kategori_soal[${index}].tidak_menjawab`}
              placeholder="Tambahkan Nilai"
              label="Tidak Menjawab"
              type="number"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          className="h-12 text-sm font-light"
          onClick={() =>
            append({
              nama_kategori: "",
              bobot_benar: 0,
              bobot_salah: 0,
              tidak_menjawab: 0,
            })
          }
          startContent={<Plus />}
        >
          Tambah Kategori Soal
        </Button>
      </div>
    </>
  );
};

export const CreateCategorySoalPage = () => {
  const navigation = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const methods = useForm({
    resolver: zodResolver(createQuestionCategorySchema),
    defaultValues: {
      kategori_soal: [
        {
          nama_kategori: "",
          bobot_benar: 0,
          bobot_salah: 0,
          tidak_menjawab: 0,
        },
      ],
    },
    mode: "onTouched",
  });

  const { control, handleSubmit, formState } = methods;
  const { isValid } = formState;

  const { mutateAsync: createQuestionCategory, isLoading } =
    useCreateKategoriSoalMutation({
      onSuccess: () => {
        setIsSuccess(true);
        setConfirmationDialog(false);
      },
    });

  const onSubmit = (data: {
    kategori_soal: CreateQuestionCategoryFormValue[];
  }) => {
    createQuestionCategory(data.kategori_soal);
  };

  return (
    <section className="pt-1">
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Kategori Soal Ditambahkan"
        onSubmit={() => {
          navigation("/kategori-soal");
        }}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        description="Apakah Anda yakin ingin menambahkan Kategori Soal"
        onSubmit={handleSubmit(onSubmit)}
      />
      <Breadcrumbs
        paths={[
          { label: "Daftar Management Kategori Soal", path: "/kategori-soal" },
          { label: "Tambah Kategori Soal" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header className="mb-4">
          <h1 className="text-lg">Tambah Kategori Kesulitan</h1>
        </header>
        <FormProvider {...methods}>
          <CreateCategoryFormInner control={control} />
          <div className="flex justify-end gap-3 pt-5">
            <Button className="h-12 w-40">Batal</Button>
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
