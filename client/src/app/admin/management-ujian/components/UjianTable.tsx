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

type IUjian = {
  idUjian: string;
  namaUjian: string;
  tanggalUjian: string;
  sesiUjian: string;
  pesertaUjian: string;
};

const UjianTable = () => {
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const navigate = useNavigate();

  const UjianData: IUjian[] = [
    {
      idUjian: "728ed52f",
      namaUjian: "Tes Kemampuan Dasar 1",
      tanggalUjian: "01/01/2025",
      sesiUjian: "1",
      pesertaUjian: "Peserta 1",
    },
    {
      idUjian: "489e1d42",
      namaUjian: "Tes Kemampuan Dasar 2",
      tanggalUjian: "02/02/2025",
      sesiUjian: "2",
      pesertaUjian: "Peserta 2",
    },
    {
      idUjian: "9b1d81a6",
      namaUjian: "Tes Kemampuan Dasar 3",
      tanggalUjian: "03/03/2025",
      sesiUjian: "3",
      pesertaUjian: "Peserta 3",
    },
  ];

  const columns: ColumnDef<IUjian>[] = [
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
      accessorKey: "namaUjian",
      header: "Nama Ujian",
    },
    {
      accessorKey: "tanggalUjian",
      header: "Tanggal Ujian",
    },
    {
      accessorKey: "sesiUjian",
      header: "Sesi Ujian",
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
        data={UjianData}
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

export default UjianTable;
