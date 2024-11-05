import BadgeCategory from "@/components/badge-category";
import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { PaginationTableProps } from "@/components/table-pagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IBankSoal } from "@/types/collection/bank-soal.type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useDeleteMutationBankSoal from "../hooks/useDeleteMutationBankSoal";

type IBankSoalTable = {
  data: IBankSoal[];
  isLoading: boolean;
  pagination: PaginationTableProps;
};

const BankSoalTable: React.FC<IBankSoalTable> = ({
  data,
  isLoading,
  pagination,
}) => {
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [id, setId] = React.useState<string | number>("");
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const navigate = useNavigate();

  const { mutate: deleteMutation, isLoading: isLoadingDelete } =
    useDeleteMutationBankSoal({
      onSuccess: () => {
        setIsOpenDeleteConfirm(false);
        setIsShowSuccessDialog(true);
        setId("");
      },
    });

  const columns: ColumnDef<IBankSoal>[] = [
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
      accessorKey: "id",
      header: "ID Soal",
    },
    {
      accessorKey: "question",
      header: "Soal",
      cell: ({ row }) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: row.original.question }} />
        );
      },
    },
    {
      accessorKey: "category",
      header: "Kategori Soal",
      cell: ({ row }) => {
        const kategori = row?.original.kategori_id?.nama_kategori;

        return <BadgeCategory name={kategori} />;
      },
    },
    {
      accessorKey: "materiSoal",
      header: "Materi Soal",
      cell: ({ row }) => {
        return <p>{row?.original?.materi_id?.materi || "-"}</p>;
      },
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
              setId(row.original.id);
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="cursor-pointer text-gray-400 w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2">
              <DropdownMenuItem
                onClick={() => navigate(`/bank-soal/edit/${row.original.id}`)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/bank-soal/preview/${row.original.id}`)
                }
              >
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
        onSubmit={() => navigate("/bank-soal")}
      />
      <DeleteDialogConfirm
        isLoading={isLoadingDelete}
        isOpen={isOpenDeleteConfirm}
        onOpenChange={setIsOpenDeleteConfirm}
        onSubmit={() => {
          deleteMutation({ id: id });
        }}
        description="Apakah anda yakin ingin menghapus soal ini ?"
      />
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
      />
    </>
  );
};

export default BankSoalTable;
