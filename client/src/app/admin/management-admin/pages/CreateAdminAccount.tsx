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
import { useEffect, useMemo, useState } from "react";
import SuccessDialog from "@/components/success-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import useCreateAdmin from "../hooks/useCreateAdmin";
import useUpdateAdmin from "../hooks/useUpdateAdmin";

const createAdminSchema = z.object({
  email: z.string().nonempty("Email harus diisi"),
  password: z.string().nonempty("Password harus diisi"),
  first_name: z.string().nonempty("Nama harus diisi"),
  roleName: z.string().nonempty("Role harus diisi"),
});

type CreateAdminFormValue = {
  email: string;
  password: string;
  nomorKontak: string;
  first_name: string;
  roleName: string;
};

const CreateFormInner = ({
  openDialogConfirmation,
  id,
}: {
  openDialogConfirmation: () => void;
  id?: string;
}) => {
  return <></>;
};

export const CreateAdminAccount = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const methods = useForm<CreateAdminFormValue>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      roleName: "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, reset } = methods;

  const { mutateAsync: createAdmin, isLoading } = useCreateAdmin({
    onSuccess: () => {
      setIsSuccess(true);
      setConfirmationDialog(false);
    },
    onError: (errorMessage) => {
      toast.error(errorMessage);
      setConfirmationDialog(false);
    },
  });

  const { mutateAsync: updateAdmin, isLoading: loadupdate } = useUpdateAdmin(
    id,
    {
      onSuccess: () => {
        setIsSuccess(true);
        setConfirmationDialog(false);
      },
      onError: (errorMessage) => {
        toast.error(errorMessage);
        setConfirmationDialog(false);
      },
    }
  );

  useEffect(() => {
    if (id) {
      const data = JSON.parse(sessionStorage.getItem("dataAdmin"));
      console.log(data);
      const { email, first_name, role } = data;
      const roleName = role;
      reset({
        email,
        first_name,
        roleName,
      });
    }
  }, [id, reset]);

  const onSubmit = (data: any) => {
    if (id) {
      const obj = {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
      };
      updateAdmin(obj);
    } else {
      createAdmin(data);
    }
  };

  return (
    <section>
      <SuccessDialog
        isOpen={isSuccess}
        onOpenChange={setIsSuccess}
        description={`Akun Admin ${id ? "Berhasil Diedit" : "Ditambahkan"} `}
        onSubmit={() => {
          navigation("/admin");
        }}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={confirmationDialog}
        onOpenChange={setConfirmationDialog}
        description={`Apakah Anda yakin ingin ${
          id ? "Mengubah" : "menambahkan"
        } Admin`}
        onSubmit={handleSubmit(onSubmit)}
      />
      <Breadcrumbs
        paths={[
          { label: "Daftar Admin", path: "/admin" },
          { label: id ? "Edit Admin" : "Tambah Admin" },
        ]}
      />
      <div className="border rounded-md bg-white p-4 mt-6">
        <header>
          <h1 className="text-lg">{id ? "Edit" : "Tambah"} Admin</h1>
          <h2 className="text-sm">Data Administrator</h2>
        </header>
        <FormProvider {...methods}>
          <div className="mt-4 space-y-2">
            <div className="flex gap-3">
              <FormInput
                name="email"
                placeholder="Masukan Email"
                label="Email"
              />
              <FormInput
                name="password"
                placeholder="Masukan Password"
                label="Password"
              />
            </div>
            <div className="flex gap-3 items-start">
              <FormInput
                name="first_name"
                placeholder="Masukan Nama"
                label="Nama"
              />
              {!id && (
                <FormInput
                  name="roleName"
                  placeholder="Masukan Role"
                  label="Role"
                />
              )}
            </div>
            <div className="flex justify-end gap-3 pt-5">
              <Button onClick={() => navigation("/admin")} className="w-40">
                Batal
              </Button>
              <Button
                onClick={() => setConfirmationDialog(true)}
                className="w-40"
              >
                {id ? "Edit" : "Tambah"} Admin
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
    </section>
  );
};
