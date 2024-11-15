import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { IUjianRequest } from "@/types/collection/ujian.type";
import React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import UjianForm from "../components/UjianForm";
import useMutateUjian from "../hooks/useMutateUjian";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "@/components/success-dialog";
import { addHours } from "date-fns";

const UjianCreatePages: React.FC = () => {
  const form = useForm();
  const { setValue } = form;
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigation = useNavigate();

  const { mutate, isLoading } = useMutateUjian({
    onSuccess: () => {
      setIsSuccess(true);
      setConfirmationDialog(false);
    },
    onError: () => {
      console.log("errr");
    },
  });

  const startTime = useWatch({
    control: form.control,
    name: "start_time",
  });

  React.useEffect(() => {
    if (startTime) {
      setValue("end_time", addHours(new Date(startTime), 2));
    }
  }, [startTime, setValue]);

  const onSubmit = (data: IUjianRequest) => {
    mutate({
      ...data,
      start_time: addHours(new Date(data.start_time), 7), // force to GMT + 7
      end_time: addHours(new Date(data.end_time), 7), // force to GMT + 7
    });
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
        description="Apakah Anda yakin ingin menyimpan data ini?"
        onSubmit={form.handleSubmit(onSubmit)}
      />
      <BreadcrumbAdmin
        items={[
          { label: "Daftar Ujian", href: "/ujian" },
          { label: "Tambah Sesi Ujian" },
        ]}
      />
      <Card className="px-4 pt-4 pb-1 flex flex-col gap-4 overflow-y-auto relative h-[49vh]">
        <CardTitle className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-light">Tambah Sesi Ujian</h1>
            <p className="text-base font-light">
              Mata Ujian Peraturan Jabatan PPAT
            </p>
          </div>
        </CardTitle>
        <CardContent className="w-full px-2 flex flex-col gap-2">
          <FormProvider {...form}>
            <UjianForm />
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
            Tambah Sesi Ujian
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UjianCreatePages;
