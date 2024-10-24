import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React from "react";

type IDistribusiSoal = {
  idDistribusi: number;
  userCreated: string;
  userUpdated: string;
  dateCreated: string;
  dateUpdated: string;
  kategoriId: IKategoriSoal[];
  materiId: IMateriSoal[];
  jumlahSoal: number;
};

type IKategoriSoal = {
  idKategori: number;
  userCreated: string;
  userUpdated: string;
  dateCreated: string;
  dateUpdated: string;
  bobotBenar: number;
  bobotSalah: number;
  tidakMenjawab: number;
};

type IMateriSoal = {
  idMateri: number;
  userCreated: string;
  userUpdated: string;
  dateCreated: string;
  dateUpdated: string;
  materi: string;
};

const DistribusiSoalTable = () => {
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const distribusiSoalData: IDistribusiSoal[] = [
    {
      idDistribusi: 100,
      userCreated: "admin",
      userUpdated: "admin",
      dateCreated: "2023-05-01",
      dateUpdated: "2023-05-01",
      kategoriId: [
        {
          idKategori: 1,
          userCreated: "admin",
          userUpdated: "admin",
          dateCreated: "2023-05-01",
          dateUpdated: "2023-05-01",
          bobotBenar: 1,
          bobotSalah: 1,
          tidakMenjawab: 1,
        },
        {
          idKategori: 2,
          userCreated: "admin",
          userUpdated: "admin",
          dateCreated: "2023-05-01",
          dateUpdated: "2023-05-01",
          bobotBenar: 1,
          bobotSalah: 1,
          tidakMenjawab: 1,
        },
        {
          idKategori: 3,
          userCreated: "admin",
          userUpdated: "admin",
          dateCreated: "2023-05-01",
          dateUpdated: "2023-05-01",
          bobotBenar: 1,
          bobotSalah: 1,
          tidakMenjawab: 1,
        },
      ],
      materiId: [
        {
          idMateri: 1,
          userCreated: "admin",
          userUpdated: "admin",
          dateCreated: "2023-05-01",
          dateUpdated: "2023-05-01",
          materi: "Materi 1",
        },
      ],
      jumlahSoal: 1,
    },
  ];

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
        const materiSoal = row.original.materiId.map((item) => item.materi);
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
        const kategoriSoal = row.original.kategoriId.map(
          (item) => item.idKategori
        );

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
        const distribusiSoal = row.original.kategoriId.map(
          (item) => item.idKategori
        );
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
        const bobotBenar = row.original.kategoriId.map(
          (item) => item.bobotBenar
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
        const bobotSalah = row.original.kategoriId.map(
          (item) => item.bobotSalah
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
        const tidakMenjawab = row.original.kategoriId.map(
          (item) => item.tidakMenjawab
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
        data={distribusiSoalData}
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
