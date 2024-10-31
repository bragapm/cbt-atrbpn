import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { IBankSoalRequest } from "@/types/collection/bank-soal.type";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import BankSoalForm from "../components/BankSoalForm";
import useMutateBankSoal from "../hooks/useMutateBankSoal";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "@/components/success-dialog";

const BankSoalCreatePage: React.FC = () => {
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
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigation = useNavigate();

  const { mutate, isLoading } = useMutateBankSoal({
    onSuccess: () => {
      setIsSuccess(true);
      setConfirmationDialog(false);
    },
  });

  const onSubmit = (data: IBankSoalRequest) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-2">
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Data Berhasil Dibuat"
        onSubmit={() => {
          navigation("/bank-soal");
        }}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        description="Apakah Anda yakin ingin menyimpan data ini?"
        onSubmit={form.handleSubmit(onSubmit)}
      />
      <BreadcrumbAdmin
        items={[
          { label: "Daftar Soal", href: "/bank-soal" },
          { label: "Tambah Soal" },
        ]}
      />
      <Card className="px-4 py-4 flex flex-col gap-4 overflow-y-auto relative h-[80vh]">
        <CardTitle className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-light">Tambah Soal</h1>
            <p className="text-base font-light">
              Mata Ujian Peraturan Jabatan PPAT
            </p>
            <p className="text-sm  font-light">Soal No. 13 / 20</p>
          </div>
        </CardTitle>

        <CardContent className="w-full px-2 flex flex-col gap-2">
          <FormProvider {...form}>
            <BankSoalForm />
          </FormProvider>

          <div className="w-full flex justify-end gap-2">
            <Button
              className="w-[130px]"
              variant="actions"
              size="actions"
              onClick={() => navigation("/bank-soal")}
            >
              Kembali
            </Button>
            <Button
              className="w-[130px]"
              variant="actions"
              size="actions"
              onClick={() => setConfirmationDialog(true)}
            >
              Simpan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankSoalCreatePage;
