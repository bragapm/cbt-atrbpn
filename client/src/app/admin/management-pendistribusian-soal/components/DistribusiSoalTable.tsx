import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React from "react";
import { IDistribusiSoal } from "../hooks/useGetManagementDistribusiSoal";

type IDistribusiTable = {
  data: IDistribusiSoal[];
};

const DistribusiSoalTable: React.FC<IDistribusiTable> = ({ data }) => {
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const columns: ColumnDef<IDistribusiSoal>[] = [
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
      accessorKey: "materiSoal",
      header: "Materi Soal",
      cell: ({ row }) => {
        const materiSoal = row.original.materi_id.map((item) => item.materi);
        return (
          <div className="flex flex-col gap-2">
            {materiSoal.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "kategoriSoal",
      header: "Kategori Soal",
      cell: ({ row }) => {
        const kategoriSoal = row.original.kategori_id.map((item) => item.id);

        return (
          <div className="w-full flex flex-col gap-3">
            {kategoriSoal.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "distribusiSoal",
      header: "Distribusi Soal",
      cell: ({ row }) => {
        const distribusiSoal = row.original.kategori_id.map((item) => item.id);
        return (
          <div className="w-full flex flex-col gap-3">
            {distribusiSoal.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "bobotBenar",
      header: "Bobot Nilai Benar",
      cell: ({ row }) => {
        const bobotBenar = row.original.kategori_id.map(
          (item) => item.bobot_benar
        );
        return (
          <div className="w-full flex flex-col gap-3">
            {bobotBenar.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "bobotSalah",
      header: "Bobot Nilai Salah",
      cell: ({ row }) => {
        const bobotSalah = row.original.kategori_id.map(
          (item) => item.bobot_salah
        );
        return (
          <div className="w-full flex flex-col gap-3">
            {bobotSalah.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "tidakMenjawab",
      header: "Tidak Menjawab",
      cell: ({ row }) => {
        const tidakMenjawab = row.original.kategori_id.map(
          (item) => item.tidak_menjawab
        );
        return (
          <div className="w-full flex flex-col gap-3">
            {tidakMenjawab.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
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

export default DistribusiSoalTable;
