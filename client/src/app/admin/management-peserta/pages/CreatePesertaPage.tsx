import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { CreatePesertaCBTFormValue } from "../types";
import { FormSelect } from "@/components/forms/FormSelect";
import useGetUserQuery from "../hooks/useGetUserQuery";
import useCreateUserSessionMutation from "../hooks/useCreateUserSessionMutation";
import useGetSessionTestQueries from "../hooks/useGetSessionTestQueries";
import { useMemo, useState } from "react";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { createManagementPesertaSchema } from "../schemas/CreateManagementPesertaSchema";
import useUpdateCouponMutation from "../hooks/useUpdateCouponMutation";

const CreatePesertaFormInner = ({
  openDialogConfirmation,
}: {
  openDialogConfirmation: () => void;
}) => {
  const { formState } = useFormContext();

  const { isValid } = formState;

  const { data: sessionTest } = useGetSessionTestQueries();

  const sessionTestOption = useMemo(() => {
    if (sessionTest?.data?.data) {
      const options = sessionTest.data.data.map((item) => {
        return {
          label: item.name,
          value: String(item.id),
        };
      });
      return options;
    }
    return [];
  }, [sessionTest]);

  return (
    <>
      <div className="flex gap-3">
        <FormInput
          name="idPeserta"
          placeholder="Masukan ID Peserta"
          label="ID Peserta"
        />
        <FormInput
          name="namaPeserta"
          placeholder="Masukan Nama Peserta"
          label="Nama Peserta"
        />
      </div>
      <div className="flex gap-3 items-start">
        <FormInput
          name="nomorKontak"
          placeholder="Masukan Nomor Kontak"
          label="Nomor Kontak"
        />
        <FormSelect
          label="Sesi Ujian"
          options={sessionTestOption}
          name="sesiUjian"
        />
      </div>

      <div className="flex justify-end gap-3 pt-5">
        <Button className=" w-40">Batal</Button>
        <Button
          onClick={openDialogConfirmation}
          disabled={!isValid}
          className="w-40"
        >
          Tambah Peserta
        </Button>
      </div>
    </>
  );
};

export const CreatePesertaPage = () => {
  const navigation = useNavigate();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const methods = useForm<CreatePesertaCBTFormValue>({
    resolver: zodResolver(createManagementPesertaSchema),
    defaultValues: {
      idPeserta: "",
      namaPeserta: "",
      nomorKontak: "",
      sesiUjian: "",
    },
    mode: "onTouched",
  });

  const idPeserta = useWatch({
    control: methods.control,
    name: "idPeserta",
  });

  const { handleSubmit } = methods;

  const { data: users } = useGetUserQuery({ code: idPeserta });

  const { mutateAsync: createUserSession, isLoading } =
    useCreateUserSessionMutation({
      onSuccess: () => {
        setIsSuccess(true);
        setConfirmationDialog(false);
      },
    });

  const { mutateAsync: updateCoupon } = useUpdateCouponMutation(
    users?.data?.data[0]?.id,
    {
      onSuccess: () => {},
    }
  );

  const onSubmit = (data: CreatePesertaCBTFormValue) => {
    try {
      if (users.data.data?.[0]) {
        const user = users.data.data[0];
        createUserSession({
          user: user?.user_id?.id,
          session: data.sesiUjian,
          info_peserta: String(user?.id),
        });

        updateCoupon({
          nama_peserta: data.namaPeserta,
          nomor_kontak: data.nomorKontak,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Peserta CBT Ditambahkan"
        onSubmit={() => {
          navigation("/peserta-cbt");
        }}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        description="Apakah Anda yakin ingin menambahkan Peserta CBT"
        onSubmit={handleSubmit(onSubmit)}
      />
      <Breadcrumbs
        paths={[
          { label: "Daftar Peserta", path: "/peserta-cbt" },
          { label: "Tambah Peserta" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header>
          <h1 className="text-lg">Tambah Peserta</h1>
          <h2 className="text-sm">Data Peserta Ujian CBT ATR/BPN</h2>
        </header>
        <FormProvider {...methods}>
          <div className="mt-4 space-y-2">
            <CreatePesertaFormInner
              openDialogConfirmation={() => setConfirmationDialog(true)}
            />
          </div>
        </FormProvider>
      </div>
    </section>
  );
};
