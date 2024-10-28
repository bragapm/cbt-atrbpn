import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React from "react";

type HasilAkhirUjianPeserta = {
  idPeserta: string;
  namaPeserta: string;
  skor: number;
};

export const DataHasilAkhirUjianPesertaTable = () => {
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const hasilUjianDummy: HasilAkhirUjianPeserta[] = [
    {
      idPeserta: "ID3211820001",
      namaPeserta: "Ahmad Ansorudin",
      skor: 90,
    },
    {
      idPeserta: "ID3211820001",
      namaPeserta: "Ahmad Ansorudin",
      skor: 100,
    },
    {
      idPeserta: "ID3211820001",
      namaPeserta: "Ahmad Ansorudin",
      skor: 80,
    },
    {
      idPeserta: "ID3211820001",
      namaPeserta: "Ahmad Ansorudin",
      skor: 70,
    },
  ];

  const columns: ColumnDef<HasilAkhirUjianPeserta>[] = [
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
      accessorKey: "idPeserta",
      header: "ID Peseta",
    },
    {
      accessorKey: "namaPeserta",
      header: "Nama Peserta",
    },
    {
      accessorKey: "skor",
      header: "Skor",
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Trash
            className="cursor-pointer text-gray-400 w-4 h-4"
            onClick={() => {
              setIsOpenDeleteConfirm(true);
            }}
          />
          <Download className="cursor-pointer text-gray-400 w-4 h-4" />
          <MoreVertical className="cursor-pointer text-gray-400 w-4 h-4" />
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
        isOpen={isOpenDeleteConfirm}
        onOpenChange={setIsOpenDeleteConfirm}
        onSubmit={() => {
          console.log("delete");
          setIsOpenDeleteConfirm(false);
          setIsShowSuccessDialog(true);
        }}
        description="Apakah anda yakin ingin menghapus peserta ini ?"
      />
      <DataTable
        data={hasilUjianDummy}
        columns={columns}
        pagination={{
          pageSize: 10,
          totalItems: 60,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
        labelButtonAction="Lihat Hasil Ujian"
      />
    </>
  );
};
