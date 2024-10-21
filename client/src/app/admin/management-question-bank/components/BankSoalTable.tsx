import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type BankSoal = {
  idSoal: string;
  namaSoal: string;
  kategoriSoal: "sulit" | "mudah" | "sangat mudah";
  materiSoal: string;
};

const BankSoalTable = () => {
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const navigate = useNavigate();

  const bankSoalData: BankSoal[] = [
    {
      idSoal: "728ed52f",
      namaSoal: "Matematika Dasar",
      kategoriSoal: "sulit",
      materiSoal: "Persamaan Linear",
    },
    {
      idSoal: "489e1d42",
      namaSoal: "Bahasa Inggris",
      kategoriSoal: "mudah",
      materiSoal: "Grammar",
    },
    {
      idSoal: "9b1d81a6",
      namaSoal: "Ilmu Pengetahuan Alam",
      kategoriSoal: "sangat mudah",
      materiSoal: "Sistem Tata Surya",
    },
  ];

  const columns: ColumnDef<BankSoal>[] = [
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
      accessorKey: "namaSoal",
      header: "Nama Soal",
    },
    {
      accessorKey: "kategoriSoal",
      header: "Kategori Soal",
      cell: ({ row }) => {
        const kategori = row.original.kategoriSoal;

        return <Badge variant="outline">{kategori}</Badge>;
      },
    },
    {
      accessorKey: "materiSoal",
      header: "Materi Soal",
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
              <DropdownMenuItem onClick={() => navigate("/bank-soal/edit")}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/bank-soal/preview")}>
                Preview
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
        data={bankSoalData}
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

export default BankSoalTable;
