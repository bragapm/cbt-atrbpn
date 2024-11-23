import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { z } from "zod";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useMemo, useState } from "react";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import useCreateAdmin from "../hooks/useCreateAdmin";

const createAdminSchema = z.object({
  email: z.string().nonempty("Email harus diisi"),
  password: z.string().nonempty("Password harus diisi"),
  first_name: z.string().nonempty("Nama harus diisi"),
  roleName: z.string().nonempty("Role harus diisi"),
});

const CreateFormInner = ({
  openDialogConfirmation,
}: {
  openDialogConfirmation: () => void;
}) => {
  const { formState } = useFormContext();
  const { isValid } = formState;

  return (
    <>
      <div className="flex gap-3">
        <FormInput name="email" placeholder="Masukan Email" label="Email" />
        <FormInput
          name="password"
          placeholder="Masukan Password"
          label="Password"
        />
      </div>
      <div className="flex gap-3 items-start">
        <FormInput name="firstname" placeholder="Masukan Nama" label="Nama" />
      </div>

      <div className="flex justify-end gap-3 pt-5">
        <Button className=" w-40">Batal</Button>
        <Button
          onClick={openDialogConfirmation}
          disabled={!isValid}
          className="w-40"
        >
          Tambah Admin
        </Button>
      </div>
    </>
  );
};

export const CreateAdminAccount = () => {
  const navigation = useNavigate();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const methods = useForm<any>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      roleName: "",
    },
    mode: "onTouched",
  });

  const { handleSubmit } = methods;
  const users = null;

  //   const { data: users } = useGetUserQuery({ code: idPeserta });

  const { mutateAsync: createAdmin, isLoading } = useCreateAdmin({
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

  const onSubmit = (data: any) => {
    if (users.data.data?.[0]) {
      const user = users.data.data[0];
      //   createAdmin({
      //     // user: user?.user_id?.id,
      //     session: data.sesiUjian,
      //     info_peserta: String(user?.id),
      //   });
    } else {
      toast.error("ID peserta tidak ditemukan");
      setConfirmationDialog(false);
      return;
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
          { label: "Daftar Admin", path: "/admin" },
          { label: "Tambah Admin" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header>
          <h1 className="text-lg">Tambah Admin</h1>
          <h2 className="text-sm">Data Administrator</h2>
        </header>
        <FormProvider {...methods}>
          <div className="mt-4 space-y-2">
            <CreateFormInner
              openDialogConfirmation={() => setConfirmationDialog(true)}
            />
          </div>
        </FormProvider>
      </div>
    </section>
  );
};
