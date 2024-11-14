import useGetBankSoalPreview from "@/app/admin/management-question-bank/hooks/useGetBankSoalPreview";
import ErrorPlaceholder from "@/components/error-placeholder";
import RichTextEditor from "@/components/rich-text-editor";
import SelectForm from "@/components/select-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import UploadFile from "@/components/upload-file";
import { FOLDER_KEY } from "@/services/constants/folder-key";
import DirectusUpload from "@/services/directus-upload";
import { IBankSoalRequest } from "@/types/collection/bank-soal.type";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import useGetKategoriSoal from "../hooks/useGetKategoriSoal";
import useGetMateriSoal from "../hooks/useGetMateriSoal";
import BankSoalOptionForm from "./BankSoalOptionForm";
import { getDirectusUrl } from "@/lib/utils";

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

const BankSoalForm: React.FC = () => {
  const { data: dataMateri, isLoading: isLoadingMateri } = useGetMateriSoal();
  const { data: dataKategori, isLoading: isLoadingKategori } =
    useGetKategoriSoal();
  const form = useFormContext<IBankSoalRequest>();

  const { id } = useParams();

  const { data, isLoading, isError } = useGetBankSoalPreview(id);

  const handleFileUpload = async (file: File | null) => {
    if (!file) return;

    try {
      const directusFileResponse = await DirectusUpload({
        file,
        folderKey: FOLDER_KEY.question_image,
      });

      const fileUrl = getDirectusUrl(directusFileResponse.id);

      // Get current editor content
      const currentContent = form.getValues("question") || "";

      // Create HTML element based on file type
      let insertContent = "";
      insertContent = `<p><img src="${fileUrl}" alt="${file.name}"  /></p>`;

      // Combine existing content with new file content
      const newContent = currentContent + insertContent;

      // Update the form
      form.setValue("question", newContent);
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  const handleOnChangeOption = (value: string, index: number) => {
    const newValue = [...form.getValues("choice")];
    newValue[index].option_text = value;
    form.setValue("choice", newValue);
  };

  const handleOnSelectChange = (value: string, index: number) => {
    const newValue = [...form.getValues("choice")];
    newValue[index].is_correct = value === "true" ? true : false;
    form.setValue("choice", newValue);
  };

  const handleFileChange = (file: File | null | string, index: number) => {
    const newValue = [...form.getValues("choice")];
    newValue[index].option_image = file;
    form.setValue("choice", newValue);
  };

  React.useEffect(() => {
    if (id && data) {
      const selectedMateri = dataMateri?.data?.find(
        (item) => item.id === data.questionBank.data.materi_id?.id
      );
      const selectedKategori = dataKategori?.data?.find(
        (item) => item.id === data.questionBank.data.kategori_id?.id
      );

      form.setValue(
        "materi_id",
        selectedMateri ? String(selectedMateri.id) : ""
      );
      form.setValue(
        "kategori_id",
        selectedKategori ? String(selectedKategori.id) : ""
      );

      form.setValue(
        "random_question",
        data?.questionBank?.data?.random_question ? "true" : "false"
      );
      form.setValue(
        "random_options",
        data.questionBank.data.random_options ? "true" : "false"
      );
      form.setValue("question", data.questionBank.data.question);
      form.setValue(
        "choice",
        data.questionChoices.data?.map((item) => {
          return {
            question_id: item.question_id,
            option_text: item.option_text,
            is_correct: item.is_correct,
            order: item.order,
            option_image: item.option_image,
          };
        })
      );
    }
  }, [id, data, dataMateri, dataKategori]);

  if (isLoading) return <Skeleton className="w-full h-[65vh]" />;

  if (isError) return <ErrorPlaceholder />;

  return (
    <Form {...form}>
      <div className="w-full flex gap-3 flex-col pb-6">
        <div className="w-full flex gap-2 items-center flex-wrap">
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
              <FormItem className="w-auto h-full">
                <FormControl>
                  <UploadFile
                    title="Unggah Gambar"
                    value={field.value}
                    onChange={(file) => {
                      field.onChange(file);
                      handleFileUpload(file as File);
                    }}
                  />
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
          <FormField
            control={form.control}
            name="choice"
            render={({ field }) => {
              return (
                <>
                  {field.value.map((item, index) => {
                    return (
                      <FormItem className="w-full h-full">
                        <FormControl className="h-full w-full">
                          <BankSoalOptionForm
                            fileValue={item.option_image}
                            onChangeFileValue={(file: File | null | string) =>
                              handleFileChange(file, index)
                            }
                            selectValue={item.is_correct ? "true" : "false"}
                            onChangeSelectValue={(value: string) =>
                              handleOnSelectChange(value, index)
                            }
                            title={`Pilihan ${index + 1}`}
                            value={item.option_text}
                            onChange={(value: string) =>
                              handleOnChangeOption(value, index)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  })}
                </>
              );
            }}
          />
        </div>
      </div>
    </Form>
  );
};

export default BankSoalForm;
