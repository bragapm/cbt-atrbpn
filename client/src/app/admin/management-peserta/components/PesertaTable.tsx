import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React from "react";

type PesertaCBT = {
  idPeserta: string;
  namaPeserta: string;
  sesiUjian: string;
  nomorKontak: string;
};

const PesertaCBTTable = () => {
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const PesertaDataDummy: PesertaCBT[] = [
    {
      idPeserta: "ID3211820001",
      namaPeserta: "Ahmad Ansorudin",
      sesiUjian: "1",
      nomorKontak: "082111014768",
    },
    {
      idPeserta: "ID3211820001",
      namaPeserta: "Ahmad Ansorudin",
      sesiUjian: "1",
      nomorKontak: "082111014768",
    },
    {
      idPeserta: "ID3211820001",
      namaPeserta: "Ahmad Ansorudin",
      sesiUjian: "1",
      nomorKontak: "082111014768",
    },
    {
      idPeserta: "ID3211820001",
      namaPeserta: "Ahmad Ansorudin",
      sesiUjian: "1",
      nomorKontak: "082111014768",
    },
  ];

  const columns: ColumnDef<PesertaCBT>[] = [
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
      accessorKey: "sesiUjian",
      header: "Sesi Ujian",
    },
    {
      accessorKey: "nomorKontak",
      header: "Nomor Kontak",
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
        data={PesertaDataDummy}
        columns={columns}
        pagination={{
          pageSize: 10,
          totalItems: 60,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
      />
    </>
  );
};

export default PesertaCBTTable;
