import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import ConfirmationDialog from "@/components/confirmation-dialog";
import SuccessDialog from "@/components/success-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { IUjianRequest } from "@/types/collection/ujian.type";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UjianForm from "../components/UjianForm";
import useMutateUpdateUjian from "../hooks/useMutateUpdateUjian";
import { addHours } from "date-fns";

const UjianEditPage: React.FC = () => {
  const { id } = useParams();
  const form = useForm();
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigation = useNavigate();

  const { mutate: updateUjian, isLoading } = useMutateUpdateUjian({
    onSuccess: () => {
      setIsSuccess(true);
      setConfirmationDialog(false);
    },
  });

  const onSubmit = (data: IUjianRequest) => {
    if (id) {
      updateUjian({
        ...data,
        start_time: addHours(new Date(data.start_time), 7),
        end_time: addHours(new Date(data.end_time), 7),
        login_time: addHours(new Date(data.login_time), 7),
        id,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Data Berhasil Dibuat"
        onSubmit={() => {
          navigation("/ujian");
        }}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        description="Apakah Anda yakin ingin edit data ini?"
        onSubmit={form.handleSubmit(onSubmit)}
      />
      <BreadcrumbAdmin
        items={[
          { label: "Daftar Ujian", href: "/ujian" },
          { label: "Edit Ujian" },
        ]}
      />
      <Card className="px-4 pt-4 pb-1 flex flex-col gap-4 overflow-y-auto relative h-[49vh]">
        <CardTitle className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-light">Edit Ujian</h1>
            <p className="text-base font-light">
              Mata Ujian Peraturan Jabatan PPAT
            </p>
          </div>
        </CardTitle>
        <CardContent className="w-full px-2 flex flex-col gap-2">
          <FormProvider {...form}>
            <UjianForm isEdit={true} />
          </FormProvider>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="actions"
            size="actions"
            className="w-44"
            onClick={() => navigation("/ujian")}
          >
            Batal
          </Button>
          <Button
            variant="actions"
            size="actions"
            className="w-44"
            onClick={() => setConfirmationDialog(true)}
          >
            Edit Sesi Ujian
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UjianEditPage;
