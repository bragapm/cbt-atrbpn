import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type HasilAkhirJawabanPeserta = {
  soalPertanyaan: string;
  materiSoal: string;
  kategoriSoal: string;
  jawabanBenar: number;
  jawabanSalah: number;
  tidakMenjawab: number;
};

export const DataHasilAkhirJawabanPesertaTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const hasilJawabanDummy: HasilAkhirJawabanPeserta[] = [
    {
      soalPertanyaan: "Lorem ipsum",
      materiSoal: "TPU",
      kategoriSoal: "Sulit",
      jawabanBenar: 10,
      jawabanSalah: 20,
      tidakMenjawab: 20,
    },
    {
      soalPertanyaan: "Lorem ipsum",
      materiSoal: "TPU",
      kategoriSoal: "Sulit",
      jawabanBenar: 10,
      jawabanSalah: 20,
      tidakMenjawab: 20,
    },
    {
      soalPertanyaan: "Lorem ipsum",
      materiSoal: "TPU",
      kategoriSoal: "Sulit",
      jawabanBenar: 10,
      jawabanSalah: 20,
      tidakMenjawab: 20,
    },
    {
      soalPertanyaan: "Lorem ipsum",
      materiSoal: "TPU",
      kategoriSoal: "Sulit",
      jawabanBenar: 10,
      jawabanSalah: 20,
      tidakMenjawab: 20,
    },
    {
      soalPertanyaan: "Lorem ipsum",
      materiSoal: "TPU",
      kategoriSoal: "Sulit",
      jawabanBenar: 10,
      jawabanSalah: 20,
      tidakMenjawab: 20,
    },
  ];

  const columns: ColumnDef<HasilAkhirJawabanPeserta>[] = [
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
      accessorKey: "soalPertanyaan",
      header: "Soal Pertanyaan",
    },
    {
      accessorKey: "materiSoal",
      header: "Materi Soal",
    },
    {
      accessorKey: "kategoriSoal",
      header: "Kategori Soal",
    },
    {
      accessorKey: "jawabanBenar",
      header: "Jawaban Benar",
    },
    {
      accessorKey: "jawabanSalah",
      header: "Jawaban Salah",
    },
    {
      accessorKey: "tidakMenjawab",
      header: "Tidak Menjawab",
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="cursor-pointer text-gray-400 w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2">
              <DropdownMenuItem
                onClick={() => navigate("/hasil-ujian/list-pertanyaan/171")}
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
        data={hasilJawabanDummy}
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
