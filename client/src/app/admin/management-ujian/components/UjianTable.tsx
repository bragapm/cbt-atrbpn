import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React from "react";
import UjianDropdown from "./UjianDropdown";
import { IUjian } from "../hooks/useGetManagementUjian";
import { useNavigate } from "react-router-dom";

type IUjianTable = {
  data: IUjian[];
};

const UjianTable: React.FC<IUjianTable> = ({ data }) => {
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  //const navigate = useNavigate();

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
      cell: ({ row }) => {
        const namaUjian = row.original.name;
        return namaUjian;
      },
    },
    {
      accessorKey: "tanggalUjian",
      header: "Tanggal Ujian",
      cell: ({ row }) => {
        const tanggalUjian = row.original.start_time;
        const date = new Date(tanggalUjian);
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;

        return formattedDate;
      },
    },
    {
      accessorKey: "sesiUjian",
      header: "Sesi Ujian",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
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
            <UjianDropdown ujianData={[row.original]} />
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
        description="Ujian berhasil dihapus"
      />
      <DeleteDialogConfirm
        isOpen={isOpenDeleteConfirm}
        onOpenChange={setIsOpenDeleteConfirm}
        onSubmit={() => {
          console.log("delete");
          setIsOpenDeleteConfirm(false);
          setIsShowSuccessDialog(true);
        }}
        description="Apakah anda yakin ingin menghapus sesi ini ?"
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

export default UjianTable;
