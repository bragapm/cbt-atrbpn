import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash } from "lucide-react";
import React from "react";
import UjianDropdown from "./UjianDropdown";
import { IUjian } from "@/types/collection/ujian.type";
import { useNavigate } from "react-router-dom";
import { PaginationTableProps } from "@/components/table-pagination";
import useDeleteMutationUjian from "../hooks/useDeleteMutationUjian";
import { format } from "date-fns";

type IUjianTable = {
  data: IUjian[];
  isLoading: boolean;
  pagination: PaginationTableProps;
};

const UjianTable: React.FC<IUjianTable> = ({ data, isLoading, pagination }) => {
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [id, setId] = React.useState<string | number>("");
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const navigate = useNavigate();

  const { mutate: deleteMutation, isLoading: isLoadingDelete } =
    useDeleteMutationUjian({
      onSuccess: () => {
        setIsOpenDeleteConfirm(false);
        setIsShowSuccessDialog(true);
        setId("");
      },
    });

  const columns: ColumnDef<any>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const id = row.original.session_id;
        return id;
      },
    },
    {
      accessorKey: "namaUjian",
      header: "Nama Ujian",
      cell: ({ row }) => {
        const namaUjian = row.original.nama;
        return namaUjian;
      },
    },
    {
      accessorKey: "jumlahpeserta",
      header: "Jumlah Peserta",
      cell: ({ row }) => {
        const peserta = row.original.jumlah_peserta;
        return peserta;
      },
    },
    {
      accessorKey: "mulailogin",
      header: "Mulai Login",
      cell: ({ row }) => {
        const login = row.original?.login_start;
        if (login) {
          const date = new Date(login);
          const formattedDate = format(date, "dd/MM/yyyy");
          return formattedDate;
        }
        return "-";
      },
    },
    {
      accessorKey: "tanggalUjian",
      header: "Tanggal Ujian",
      cell: ({ row }) => {
        const tanggalUjian = row.original.tanggal_ujian;
        const date = new Date(tanggalUjian);
        const formattedDate = format(date, "dd/MM/yyyy");

        return formattedDate;
      },
    },
    {
      accessorKey: "mulaiUjian",
      header: "Mulai Ujian",
      cell: ({ row }) => {
        const mulaiUjian = row.original.mulai_ujian;
        // const date = new Date(mulaiUjian);
        // const formattedDate = format(date, "HH:mm:ss");
        return mulaiUjian;
      },
    },
    {
      accessorKey: "selesaiUjian",
      header: "Selesai Ujian",
      cell: ({ row }) => {
        const selesaiUjian = row.original.selesai_ujian;
        // const date = new Date(selesaiUjian);
        // const formattedDate = format(date, "HH:mm:ss");
        return selesaiUjian;
      },
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
              setId(row.original.session_id);
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="cursor-pointer text-gray-400 w-4 h-4 hover:text-primary" />
            </DropdownMenuTrigger>
            <UjianDropdown
              ujianData={row.original}
              sessionId={row.original.session_id}
            />
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
        onSubmit={() => navigate("/ujian")}
      />
      <DeleteDialogConfirm
        isLoading={isLoadingDelete}
        isOpen={isOpenDeleteConfirm}
        onOpenChange={setIsOpenDeleteConfirm}
        onSubmit={() => {
          deleteMutation({ id: id });
        }}
        description="Apakah anda yakin ingin menghapus sesi ini ?"
      />
      <DataTable
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
      />
    </>
  );
};

export default UjianTable;
