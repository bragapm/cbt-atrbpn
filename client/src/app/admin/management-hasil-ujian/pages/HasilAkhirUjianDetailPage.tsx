import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash } from "lucide-react";
import React, { FC } from "react";
import useGetUserSessionTestQueries, {
  IUserSessionTest,
} from "../../management-peserta/hooks/useGetUserSessionTestQueries";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import useDeletePesertaMutation from "../../management-peserta/hooks/useDeletePesertaMutation";

export const HasilAkhirUjianDetailPage: FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

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
      accessorKey: "info_peserta.nama_peserta",
      header: "Nama Peserta",
    },
    {
      accessorKey: "score_summary.correct_answers",
      header: "Jawaban Benar",
    },
    {
      accessorKey: "score_summary.wrong_answers",
      header: "Jawaban Salah",
    },
    {
      accessorKey: "score_summary.not_answers",
      header: "Tidak Menjawab",
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
          {/* <Download className="cursor-pointer text-gray-400 w-4 h-4" /> */}
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
    <div className="w-full h-full flex flex-col gap-3 pt-1">
      <Breadcrumbs
        paths={[
          {
            label: "Management Hasil Ujian",
          },
          {
            label: "Hasil Akhir Ujian",
            path: "/hasil-ujian/hasil-akhir-ujian",
          },
          { label: "Detail Hasil Ujian" },
        ]}
      />
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
      />
    </div>
  );
};
