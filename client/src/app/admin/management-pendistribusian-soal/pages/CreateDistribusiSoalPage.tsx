import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import {
  FormProvider,
  useForm,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { Plus, Trash } from "lucide-react";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { FormSelect } from "@/components/forms/FormSelect";
import useGetQuestionCategories from "../../management-kategori-soal/hooks/useGetQuestionCategoriesQuesry";
import useCreatePendistribusianSoalMutation from "../hooks/useCreatePendristribusianSoalMutation";
import { PendistribusianSoalFormValue } from "../types";
import useGetMateriSoal from "../../management-question-bank/hooks/useGetMateriSoal";

const CreateDistribusiSoalFormInner = ({ control, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "distribusi_soal",
  });

  const { data: kategoriSoal } = useGetQuestionCategories();
  const { data: materiSoal } = useGetMateriSoal();

  const materiSoalOption = useMemo(() => {
    if (materiSoal?.data) {
      return materiSoal.data.map((item) => ({
        label: item.materi,
        value: String(item.id),
      }));
    }
    return [];
  }, [materiSoal]);

  const questionCategoriesOption = useMemo(() => {
    if (kategoriSoal?.data?.data) {
      return kategoriSoal.data.data.map((item) => ({
        label: item.nama_kategori,
        value: String(item.id),
        bobot_benar: item.bobot_benar,
        bobot_salah: item.bobot_salah,
        tidak_menjawab: item.tidak_menjawab,
      }));
    }
    return [];
  }, [kategoriSoal]);

  const distribusiSoalValues = useWatch({ control, name: "distribusi_soal" });

  useEffect(() => {
    distribusiSoalValues.forEach((item, index) => {
      const selectedCategory = questionCategoriesOption.find(
        (option) => option.value === item.kategori_soal
      );

      if (selectedCategory) {
        setValue(
          `distribusi_soal[${index}].bobot_benar`,
          selectedCategory.bobot_benar
        );
        setValue(
          `distribusi_soal[${index}].bobot_salah`,
          selectedCategory.bobot_salah
        );
        setValue(
          `distribusi_soal[${index}].tidak_menjawab`,
          selectedCategory.tidak_menjawab
        );
      }
    });
  }, [distribusiSoalValues, setValue, questionCategoriesOption]);

  return (
    <>
      <div className="mb-4">
        <FormSelect
          label="Materi Soal"
          options={materiSoalOption}
          name={`materi_soal_id`}
        />
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 rounded-xl space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <h2>Kategori Soal {index + 1}</h2>
            {fields.length > 1 && (
              <Button
                startContent={<Trash size={16} />}
                onClick={() => remove(index)}
              />
            )}
          </div>
          <div className="flex gap-3 items-start">
            <FormSelect
              label="Kategori Soal"
              options={questionCategoriesOption}
              name={`distribusi_soal[${index}].kategori_soal`}
            />
            <FormInput
              name={`distribusi_soal[${index}].jumlah_soal`}
              placeholder="Tambahkan Jumlah Distribusi"
              label="Jumlah Distribusi"
              type="number"
            />
          </div>
          <div className="flex gap-3 items-start">
            <FormInput
              name={`distribusi_soal[${index}].bobot_benar`}
              placeholder="Tambahkan Nilai"
              label="Bobot Nilai Benar"
              type="number"
              disabled
            />
            <FormInput
              name={`distribusi_soal[${index}].bobot_salah`}
              placeholder="Tambahkan Nilai"
              label="Bobot Nilai Salah"
              type="number"
              disabled
            />
            <FormInput
              name={`distribusi_soal[${index}].tidak_menjawab`}
              placeholder="Tambahkan Nilai"
              label="Tidak Menjawab"
              type="number"
              disabled
            />
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          className="h-12 text-sm font-light"
          onClick={() =>
            append({
              kategori_soal: "",
              jumlah_soal: 0,
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

export const CreateDistribusiSoalPage = () => {
  const navigation = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const methods = useForm({
    defaultValues: {
      materi_soal_id: "",
      distribusi_soal: [
        {
          kategori_soal: "",
          jumlah_soal: 0,
          bobot_benar: 0,
          bobot_salah: 0,
          tidak_menjawab: 0,
        },
      ],
    },
    mode: "onTouched",
  });

  const { control, handleSubmit, formState, setValue } = methods;
  const { isValid } = formState;

  const { mutateAsync: createPendistribusianSoal, isLoading } =
    useCreatePendistribusianSoalMutation({
      onSuccess: () => {
        setIsSuccess(true);
        setConfirmationDialog(false);
      },
    });

  const onSubmit = (data: {
    distribusi_soal: PendistribusianSoalFormValue[];
    materi_soal_id: string;
  }) => {
    const dataToCreate = data.distribusi_soal.map((item) => {
      return {
        materi_id: data.materi_soal_id,
        kategori_id: item.kategori_soal,
        jumlah_soal: item.jumlah_soal,
      };
    });

    createPendistribusianSoal(dataToCreate);
  };

  return (
    <section className="pt-1">
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Distribusi Soal Ditambahkan"
        onSubmit={() => {
          navigation("/pendistribusian-soal");
        }}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        description="Apakah Anda yakin ingin menambahkan Distribusi Soal"
        onSubmit={handleSubmit(onSubmit)}
      />
      <Breadcrumbs
        paths={[
          {
            label: "Daftar Management Pendistribusian Soal",
            path: "/pendistribusian-soal",
          },
          { label: "Tambah Pendistribusian Soal" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header className="mb-4">
          <h1 className="text-lg">Tambah Pendistribusian Soal</h1>
        </header>
        <FormProvider {...methods}>
          <CreateDistribusiSoalFormInner
            control={control}
            setValue={setValue}
          />
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
