import RichTextEditor from "@/components/rich-text-editor";
import SelectForm from "@/components/select-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import UploadFile from "@/components/upload-file";
import { IBankSoalRequest } from "@/types/collection/bank-soal.type";
import React from "react";
import { useFormContext } from "react-hook-form";
import useGetKategoriSoal from "../hooks/useGetKategoriSoal";
import useGetMateriSoal from "../hooks/useGetMateriSoal";
import BankSoalOptionForm from "./BankSoalOptionForm";

const booleanData = [
  {
    value: "true",
    label: "Ya",
  },
  {
    value: "false",
    label: "Tidak",
  },
];

const choices = [
  {
    question_id: "",
    option_text: "",
    is_correct: false,
    order: 1,
    option_image: null,
  },
  {
    question_id: "",
    option_text: "",
    is_correct: false,
    order: 2,
    option_image: null,
  },
  {
    question_id: "",
    option_text: "",
    is_correct: false,
    order: 3,
    option_image: null,
  },
  {
    question_id: "",
    option_text: "",
    is_correct: false,
    order: 4,
    option_image: null,
  },
];

const BankSoalForm: React.FC = () => {
  const { data: dataMateri, isLoading: isLoadingMateri } = useGetMateriSoal();
  const { data: dataKategori, isLoading: isLoadingKategori } =
    useGetKategoriSoal();

  const form = useFormContext<IBankSoalRequest>();
  // const choices = form.getValues("choice");

  return (
    <Form {...form}>
      <div className="w-full flex gap-3 flex-col pb-6">
        <div className="w-full flex gap-2 items-center">
          <FormField
            control={form.control}
            name="materi_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SelectForm
                    value={field.value}
                    onChange={field.onChange}
                    isLoading={isLoadingMateri}
                    title="Materi Soal"
                    data={dataMateri?.data?.map((item) => {
                      return {
                        value: String(item.id),
                        label: item.materi,
                      };
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kategori_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SelectForm
                    value={field.value}
                    onChange={field.onChange}
                    isLoading={isLoadingKategori}
                    data={dataKategori?.data?.map((item) => {
                      return {
                        value: String(item.id),
                        label: item.nama_kategori,
                      };
                    })}
                    title="Kategori Soal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="random_question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SelectForm
                    data={booleanData}
                    title="Soal Acak"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="random_options"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SelectForm
                    value={field.value}
                    onChange={field.onChange}
                    data={booleanData}
                    title="Jawaban Acak"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <FormControl className="w-full h-full">
                  <UploadFile value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full h-[250px]">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <FormControl className="h-full w-full">
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex flex-col gap-2 mt-12">
          {choices?.map((choice, index) => {
            return (
              <FormField
                control={form.control}
                name={"choice." + index + ".option_text"}
                render={({ field }) => (
                  <FormItem className="w-full h-full">
                    <FormControl className="h-full w-full">
                      <BankSoalOptionForm
                        title={`Pilihan ${index + 1}`}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>
      </div>
    </Form>
  );
};

export default BankSoalForm;
