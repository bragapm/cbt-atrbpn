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
import { toast } from "react-toastify";
import { useDebounceSearch } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

type PesertaStatus = "idle" | "checking" | "found" | "notfound";

const CreatePesertaFormInner = ({
  openDialogConfirmation,
  onCancel,
  pesertaStatus,
  pesertaName,
}: {
  openDialogConfirmation: () => void;
  onCancel: () => void;
  pesertaStatus: PesertaStatus;
  pesertaName?: string;
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

      {pesertaStatus !== "idle" && (
        <p
          className={cn(
            "text-xs",
            pesertaStatus === "notfound" ? "text-destructive" : "text-gray-500"
          )}
        >
          {pesertaStatus === "checking" && "Memeriksa ID peserta…"}
          {pesertaStatus === "found" &&
            `ID peserta terdaftar${pesertaName ? ` atas nama ${pesertaName}` : ""}`}
          {pesertaStatus === "notfound" &&
            "ID peserta belum terdaftar. Daftarkan dulu lewat menu Import Peserta."}
        </p>
      )}
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
          disabled={!isValid || pesertaStatus !== "found"}
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

  // Tanpa debounce setiap ketikan menembak /items/coupon sekali.
  const debouncedIdPeserta = useDebounceSearch({ value: idPeserta ?? "" });

  const { data: users, isFetching: isCheckingPeserta } = useGetUserQuery({
    code: debouncedIdPeserta,
  });

  const peserta = users?.data?.data?.[0];

  const pesertaStatus: PesertaStatus = !idPeserta
    ? "idle"
    : isCheckingPeserta || debouncedIdPeserta !== idPeserta
    ? "checking"
    : peserta
    ? "found"
    : "notfound";

  const { mutateAsync: createUserSession, isLoading } =
    useCreateUserSessionMutation({
      onSuccess: () => {
        setIsSuccess(true);
        setConfirmationDialog(false);
      },
      onError: (errorMessage) => {
        toast.error(errorMessage);
        setConfirmationDialog(false);
      },
    });

  const { mutateAsync: updateCoupon } = useUpdateCouponMutation(peserta?.id, {
    onError: (errorMessage) => {
      toast.error(errorMessage);
      setConfirmationDialog(false);
    },
  });

  const onSubmit = async (data: CreatePesertaCBTFormValue) => {
    if (isCheckingPeserta) {
      toast.info("ID peserta sedang diperiksa, coba lagi sebentar");
      setConfirmationDialog(false);
      return;
    }

    if (!peserta) {
      toast.error("ID peserta tidak ditemukan");
      setConfirmationDialog(false);
      return;
    }

    if (!peserta.user_id?.id) {
      toast.error("ID peserta belum terhubung ke akun pengguna");
      setConfirmationDialog(false);
      return;
    }

    try {
      await updateCoupon({
        nama_peserta: data.namaPeserta,
        nomor_kontak: data.nomorKontak,
      });

      await createUserSession({
        user: peserta.user_id.id,
        session: data.sesiUjian,
        info_peserta: String(peserta.id),
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
              onCancel={() => navigation("/peserta-cbt")}
              pesertaStatus={pesertaStatus}
              pesertaName={peserta?.nama_peserta}
            />
          </div>
        </FormProvider>
      </div>
    </section>
  );
};
