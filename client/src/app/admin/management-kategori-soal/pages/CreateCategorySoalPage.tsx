import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash } from "lucide-react";

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
  const methods = useForm({
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

  const { control, handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <section className="pt-1">
      <Breadcrumbs
        paths={[
          { label: "Daftar Management Kategori Soal", path: "/kategori-soal" },
          { label: "Tambah Kategori Soal" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header>
          <h1 className="text-lg">Tambah Kategori Kesulitan</h1>
        </header>
        <FormProvider {...methods}>
          <form className="mt-4 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <CreateCategoryFormInner control={control} />
            <div className="flex justify-end gap-3 pt-5">
              <Button className="h-12 w-40">Batal</Button>
              <Button type="submit" className="h-12 w-40">
                Simpan
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
