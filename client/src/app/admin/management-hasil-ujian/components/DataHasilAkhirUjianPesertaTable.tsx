import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { File, MoreVertical, Trash } from "lucide-react";
import React, { useState } from "react";
import useGetUserSessionTestQueries, {
  IUserSessionTest,
} from "../../management-peserta/hooks/useGetUserSessionTestQueries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalHasilUjianVideotron } from "./ModalHasilUjianVideotron";
import useDeletePesertaMutation from "../../management-peserta/hooks/useDeletePesertaMutation";
import { useNavigate } from "react-router-dom";

export const DataHasilAkhirUjianPesertaTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);

  const [id, setId] = React.useState<string | number>("");

  const { mutate: deleteMutation, isLoading: isLoadingDelete } =
    useDeletePesertaMutation({
      onSuccess: () => {
        setIsOpenDeleteConfirm(false);
        setIsShowSuccessDialog(true);
        setId("");
      },
    });

  const { data: userSessionTest } = useGetUserSessionTestQueries({
    page,
    limit: 10,
  });

  if (!userSessionTest) {
    return null;
  }

  const columns: ColumnDef<IUserSessionTest>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "info_peserta.code",
      header: "ID Peseta",
    },
    {
      accessorKey: "info_peserta.nama_peserta",
      header: "Nama Peserta",
    },
    {
      accessorKey: "score",
      header: "Skor",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Trash
            className="cursor-pointer text-gray-400 w-4 h-4"
            onClick={() => {
              setIsOpenDeleteConfirm(true);
              setId(row.original.id);
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="cursor-pointer text-gray-400 w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2">
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/hasil-ujian/hasil-akhir-ujian/detail/${row.original.info_peserta.user_id}`
                  )
                }
              >
                Lihat Detail Peserta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return (
    <>
      <SuccessDialog
        isOpen={isShowSuccessDialog}
        onOpenChange={setIsShowSuccessDialog}
        description="Peserta berhasil dihapus"
      />
      <DeleteDialogConfirm
        isLoading={isLoadingDelete}
        isOpen={isOpenDeleteConfirm}
        onOpenChange={setIsOpenDeleteConfirm}
        onSubmit={() => {
          deleteMutation({ id: id });
        }}
        description="Apakah anda yakin ingin menghapus peserta ini ?"
      />
      <DataTable
        data={userSessionTest?.data?.data}
        columns={columns}
        pagination={{
          pageSize: 10,
          totalItems: userSessionTest?.data?.meta?.total_count,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
        labelButtonAction="Lihat Hasil Ujian"
        iconButtonAction={<File className="w-5 h-5" />}
        buttonAction={() => setIsOpenModalDetail(true)}
      />
      <ModalHasilUjianVideotron
        opened={isOpenModalDetail}
        onOpenChange={() => setIsOpenModalDetail(!isOpenModalDetail)}
      />
    </>
  );
};
