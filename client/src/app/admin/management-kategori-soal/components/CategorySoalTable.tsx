import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React from "react";
import { IKategori } from "@/types/collection/kategori.type";
import { PaginationTableProps } from "@/components/table-pagination";

type IKategoriTable = {
  data: IKategori[];
  pagination: PaginationTableProps;
};

const CategorySoalTable: React.FC<IKategoriTable> = ({ data }) => {
  console.log({ data });
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const columns: ColumnDef<IKategori>[] = [
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
      accessorKey: "nama_kategori",
      header: "Kategori Soal",
    },
    {
      accessorKey: "bobotBenar",
      header: "Bobot Nilai Benar",
      cell: ({ row }) => {
        const jumlahBenar = row?.original?.bobot_benar;
        return <div className="w-full flex flex-col gap-3">{jumlahBenar}</div>;
      },
    },
    {
      accessorKey: "bobotSalah",
      header: "Bobot Nilai Salah",
      cell: ({ row }) => {
        const jumlahSalah = row?.original?.bobot_salah;
        return <div className="w-full flex flex-col gap-3">{jumlahSalah}</div>;
      },
    },
    {
      accessorKey: "tidakMenjawab",
      header: "Tidak Menjawab",
      cell: ({ row }) => {
        const tidakMenjawab = row?.original?.tidak_menjawab;
        return (
          <div className="w-full flex flex-col gap-3">{tidakMenjawab}</div>
        );
      },
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
        description="Soal berhasil dihapus"
      />
      <DeleteDialogConfirm
        isOpen={isOpenDeleteConfirm}
        onOpenChange={setIsOpenDeleteConfirm}
        onSubmit={() => {
          console.log("delete");
          setIsOpenDeleteConfirm(false);
          setIsShowSuccessDialog(true);
        }}
        description="Apakah anda yakin ingin menghapus soal ini ?"
      />
      <DataTable
        data={data || []}
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

export default CategorySoalTable;
