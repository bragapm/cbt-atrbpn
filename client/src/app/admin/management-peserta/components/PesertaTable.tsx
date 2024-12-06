import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash } from "lucide-react";
import React, { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { IUserSessionTest } from "../hooks/useGetUserSessionTestQueries";
import useDeletePesertaMutation from "../hooks/useDeletePesertaMutation";
import TableHeaderSorting from "@/components/table-header-sorting";

type PesertaCBTTableProps = {
  userSessionTest?: IUserSessionTest[];
  pageLimit: number;
  totalData: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  onSort?: (value: boolean | null) => void;
};

const PesertaCBTTable: FC<PesertaCBTTableProps> = ({
  userSessionTest,
  pageLimit,
  totalData,
  currentPage,
  onChangePage,
  onSort,
}) => {
  const navigate = useNavigate();

  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const [id, setId] = React.useState<string | number>("");
  const [selectPeserta, setSelectPeserta] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const { mutate: deleteMutation, isLoading: isLoadingDelete } =
    useDeletePesertaMutation({
      onSuccess: () => {
        setIsOpenDeleteConfirm(false);
        setIsShowSuccessDialog(true);
        setId("");
      },
    });

  const columns: ColumnDef<IUserSessionTest>[] = [
    {
      accessorKey: "info_peserta.code",
      header: "ID Peserta",
    },
    {
      accessorKey: "info_peserta.nama_peserta",
      header: () => {
        return (
          <TableHeaderSorting
            title="Nama Peserta"
            dropdownData={[
              { value: "false", label: "Nama Ascending" },
              { value: "true", label: "Nama Descending" },
            ]}
            selectedDropdownValue={selectPeserta}
            onSelectedDropdownValue={(selected) => {
              setSelectPeserta(selected);
              onSort(selected.value === "true" ? true : false);
            }}
          />
        );
      },
    },
    {
      accessorKey: "session.name",
      header: "Sesi Ujian",
    },
    {
      accessorKey: "info_peserta.nomor_kontak",
      header: "Nomor Kontak",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Trash
            className="cursor-pointer text-gray-400 w-4 h-4 hover:text-red-500"
            onClick={() => {
              setIsOpenDeleteConfirm(true);
              setId(row.original.id);
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="cursor-pointer text-gray-400 w-4 h-4 hover:text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2">
              <DropdownMenuItem
                onClick={() => navigate(`/peserta-cbt/edit/${row.original.id}`)}
              >
                Edit Peserta
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
        data={userSessionTest || []}
        columns={columns}
        pagination={{
          pageSize: pageLimit,
          totalItems: totalData,
          onPageChange: onChangePage,
          currentPage: currentPage,
        }}
      />
    </>
  );
};

export default PesertaCBTTable;
