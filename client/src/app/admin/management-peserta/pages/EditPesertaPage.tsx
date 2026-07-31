import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { EditPesertaCBTFormValue } from "../types";
import { FormSelect } from "@/components/forms/FormSelect";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetUserSessionTestQuery from "../hooks/useGetUserSessionTestQuery";
import useGetSessionTestQueries from "../hooks/useGetSessionTestQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetUserQuery from "../hooks/useGetUserQuery";
import { updateManagementPesertaSchema } from "../schemas/EditManagementPesertaSchema";
import useUpdateUserSessionMutation from "../hooks/useUpdateUserSessionMutation";
import useUpdateCouponMutation from "../hooks/useUpdateCouponMutation";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { toast } from "react-toastify";

const EditPesertaFormInner = ({
  openDialogConfirmation,
  onCancel,
}: {
  openDialogConfirmation: () => void;
  onCancel: () => void;
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
          name="code"
          placeholder="Masukan ID Peserta"
          label="ID Peserta"
        />
        <FormInput
          name="nama_peserta"
          placeholder="Masukan Nama Peserta"
          label="Nama Peserta"
        />
      </div>
      <div className="flex gap-3 items-start">
        <FormInput
          name="nomor_kontak"
          placeholder="Masukan Nomor Kontak"
          label="Nomor Kontak"
        />
        <FormSelect
          label="Sesi Ujian"
          options={sessionTestOption}
          name="sesi_ujian"
        />
      </div>

      <div className="flex justify-end gap-3 pt-5">
        <Button
          type="button"
          variant="outline"
          className="w-40"
          onClick={onCancel}
        >
          Batal
        </Button>
        <Button
          type="button"
          onClick={openDialogConfirmation}
          disabled={!isValid}
          className="w-40"
        >
          Edit Peserta
        </Button>
      </div>
    </>
  );
};

export const EditPesertaPage = () => {
  const navigation = useNavigate();
  const params = useParams();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const { data: peserta, isLoading } = useGetUserSessionTestQuery(
    params?.pesertaId
  );

  const methods = useForm({
    resolver: zodResolver(updateManagementPesertaSchema),
    defaultValues: {
      code: "",
      nama_peserta: "",
      nomor_kontak: "",
      sesi_ujian: "",
    },
    mode: "onTouched",
  });

  const idPeserta = useWatch({
    control: methods.control,
    name: "code",
  });

  const { handleSubmit } = methods;

  const { data: users } = useGetUserQuery({ code: idPeserta });

  useEffect(() => {
    if (!isLoading && peserta?.data?.data) {
      methods.reset({
        code: peserta?.data?.data?.info_peserta.code,
        nama_peserta: peserta?.data?.data?.info_peserta.nama_peserta,
        nomor_kontak: peserta?.data?.data?.info_peserta.nomor_kontak,
        sesi_ujian: String(peserta?.data?.data?.session?.id),
      });
    }
  }, [methods, isLoading, peserta?.data?.data]);

  const { mutateAsync: createUserSession, isLoading: updateLoading } =
    useUpdateUserSessionMutation(params.pesertaId, {
      onSuccess: () => {
        setIsSuccess(true);
        setConfirmationDialog(false);
      },
      onError: (errorMessage) => {
        if (!users) {
          toast.error("ID peserta tidak ditemukan");
          setConfirmationDialog(false);
          return;
        }

        toast.error(errorMessage);
        setConfirmationDialog(false);
      },
    });

  const { mutateAsync: updateCoupon } = useUpdateCouponMutation(
    users?.data?.data?.[0]?.id,
    {
      onError: (errorMessage) => {
        toast.error(errorMessage);
        setConfirmationDialog(false);
      },
    }
  );

  const onSubmit = async (data: EditPesertaCBTFormValue) => {
    const user = users?.data?.data?.[0];

    if (!user) {
      toast.error("ID peserta tidak ditemukan");
      setConfirmationDialog(false);
      return;
    }

    try {
      await updateCoupon({
        nama_peserta: data.nama_peserta,
        nomor_kontak: data.nomor_kontak,
      });

      await createUserSession({
        user: user.user_id?.id,
        session: data.sesi_ujian,
        info_peserta: String(user?.id),
      });
    } catch {
      // Pesan errornya sudah ditampilkan lewat onError masing-masing mutation.
    }
  };

  return (
    <section>
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description="Peserta CBT Diedit"
        onSubmit={() => {
          navigation("/peserta-cbt");
        }}
      />
      <ConfirmationDialog
        isLoading={updateLoading}
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        description="Apakah Anda yakin ingin mengupdate Peserta CBT"
        onSubmit={handleSubmit(onSubmit)}
      />
      <Breadcrumbs
        paths={[
          { label: "Daftar Peserta", path: "/peserta-cbt" },
          { label: "Edit Peserta" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header>
          <h1 className="text-lg">Edit Peserta</h1>
          <h2 className="text-sm">Data Peserta Ujian CBT ATR/BPN</h2>
        </header>
        <FormProvider {...methods}>
          <div className="mt-4 space-y-2">
            <EditPesertaFormInner
              openDialogConfirmation={() => setConfirmationDialog(true)}
              onCancel={() => navigation("/peserta-cbt")}
            />
          </div>
        </FormProvider>
      </div>
    </section>
  );
};
