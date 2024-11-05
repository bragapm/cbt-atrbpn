import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import BankSoalForm from "../components/BankSoalForm";
import { FormProvider, useForm } from "react-hook-form";
import { IBankSoalRequest } from "@/types/collection/bank-soal.type";
import useMutateUpdateBankSoal from "../hooks/useMutateUpdateBankSoal";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";

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
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const { mutate: updateBankSoal, isLoading } = useMutateUpdateBankSoal({
    onSuccess: () => {
      setIsSuccess(true);
      setConfirmationDialog(false);
    },
  });

  const onSubmit = (data: IBankSoalRequest) => {
    if (id) {
      updateBankSoal({ ...data, id });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Data Berhasil Diubah"
        onSubmit={() => {
          navigate("/bank-soal");
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
          { label: "Edit Soal" },
        ]}
      />
      <Card className="px-4 py-2 flex flex-col gap-4 overflow-y-auto relative h-[80vh]">
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
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="actions"
            size="actions"
            className="w-44"
            onClick={() => setConfirmationDialog(true)}
          >
            Simpan Perubahan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BankSoalEditPage;
