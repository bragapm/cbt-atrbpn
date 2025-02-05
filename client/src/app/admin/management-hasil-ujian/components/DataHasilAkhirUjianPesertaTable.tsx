import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
// import { Checkbox } from "@/components/ui/checkbox";
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
import useDeletePesertaMutation from "../../management-peserta/hooks/useDeletePesertaMutation";
import { useNavigate } from "react-router-dom";
import TableSearch from "@/components/table-search";
import { useDebounceSearch } from "@/hooks/useDebounce";

export const DataHasilAkhirUjianPesertaTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounceSearch({ value: search });

  const [id, setId] = React.useState<string | number>("");
  const role = localStorage.getItem("role");

  const formatScore = (score: any) => {
    const [integerPart, decimalPart = ""] = score.toString().split(".");
    const paddedDecimal = decimalPart.padEnd(6, "0").slice(0, 6);
    return `${integerPart}.${paddedDecimal}`;
  };

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
    limit: 20,
    search: debouncedSearch,
  });


  const formatedData = userSessionTest?.data?.data.map((item) => ({
    ...item,
    score_format: formatScore(item.score),
  }));

  const columns: ColumnDef<IUserSessionTest>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "info_peserta.code",
      header: "ID Peseta",
    },
    {
      accessorKey: "info_peserta.nama_peserta",
      header: "Nama Peserta",
    },
    {
      accessorKey: "feedback",
      header: "Feedback",
      cell: ({ row }) => {
        return row.original.feedback || "-";
      },
    },
    {
      accessorKey: "score_format",
      header: "Skor",
      cell: ({ row }) => {
        return row.original.score_alias ?? row.original.score_format ?? "-";
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          {/* {role === "Administrator" && (
            <Trash
              className="cursor-pointer text-gray-400 w-4 h-4 hover:text-red-500"
              onClick={() => {
                setIsOpenDeleteConfirm(true);
                setId(row.original.id);
              }}
            />
          )} */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="cursor-pointer text-gray-400 w-4 h-4 hover:text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2">
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/hasil-ujian/hasil-akhir-ujian/detail/${row.original.id}`
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
    <div>
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
      <div className="flex w-full justify-end pb-2">
        <TableSearch value={search} onChange={setSearch} />
      </div>
      <DataTable
        data={userSessionTest ? formatedData : []}
        columns={columns}
        pagination={{
          pageSize: 10,
          totalItems: userSessionTest?.data?.meta?.total_count || 0,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
        labelButtonAction="Lihat Hasil Ujian"
        iconButtonAction={<File className="w-5 h-5" />}
        buttonAction={() => window.open("/hasil-ujian/videotron")}
      />
    </div>
  );
};
