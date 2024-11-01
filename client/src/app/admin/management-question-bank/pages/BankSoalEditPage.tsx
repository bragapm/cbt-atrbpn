import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import BankSoalForm from "../components/BankSoalForm";
import { FormProvider, useForm } from "react-hook-form";
import { IBankSoal, IBankSoalRequest } from "@/types/collection/bank-soal.type";

const BankSoalEditPage: React.FC = () => {
  const form = useForm<IBankSoalRequest>({
    defaultValues: {
      choice: [
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
      ],
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <BreadcrumbAdmin
        items={[
          { label: "Daftar Soal", href: "/bank-soal" },
          { label: "Edit Soal" },
        ]}
      />
      <Card className="px-4 py-4 flex flex-col gap-4 overflow-y-auto relative h-[80vh]">
        <CardTitle className="flex flex-col gap-1">
          <h1 className="text-xl font-light">Edit Soal</h1>
          <p className="text-base font-light">
            Mata Ujian Peraturan Jabatan PPAT
          </p>
        </CardTitle>

        <CardContent className="w-full px-2 flex flex-col gap-2">
          <FormProvider {...form}>
            <BankSoalForm />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankSoalEditPage;
