import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash } from "lucide-react";
import React from "react";
import { IDistribusiSoal } from "../hooks/useGetManagementDistribusiSoal";
import { PaginationTableProps } from "@/components/table-pagination";
import BadgeCategory from "@/components/badge-category";
import { useNavigate } from "react-router-dom";
import useDeleteMutationDistribusiSoal from "../hooks/useDeleteMutationDistribusiSoal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type IDistribusiTable = {
  data: IDistribusiSoal[];
  isLoading: boolean;
  pagination: PaginationTableProps;
  refetch: () => void;
};

const DistribusiSoalTable: React.FC<IDistribusiTable> = ({
  data,
  isLoading,
  pagination,
  refetch,
}) => {
  const [id, setId] = React.useState<string | number>("");
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const navigate = useNavigate();

  const { mutate: deleteMutation, isLoading: isLoadingDelete } =
    useDeleteMutationDistribusiSoal({
      onSuccess: () => {
        setIsOpenDeleteConfirm(false);
        setIsShowSuccessDialog(true);
        setId("");
      },
    });

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
        return (
          <div className="flex flex-col gap-2">
            {row?.original?.materi_id?.materi ?? "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Kategori Soal",
      cell: ({ row }) => {
        const kategori = row?.original.kategori_id?.nama_kategori;

        return (
          <div className="w-[80px]">
            {kategori ? <BadgeCategory name={kategori} /> : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "distribusiSoal",
      header: "Distribusi Soal",
      cell: ({ row }) => {
        const jumlahSoal = row?.original?.jumlah_soal;
        return (
          <div className="w-full flex flex-col gap-3">{jumlahSoal ?? "-"}</div>
        );
      },
    },
    {
      accessorKey: "bobotBenar",
      header: "Bobot Nilai Benar",
      cell: ({ row }) => {
        const jumlahBenar = row?.original?.kategori_id?.bobot_benar;
        return (
          <div className="w-full flex flex-col gap-3">{jumlahBenar ?? "-"}</div>
        );
      },
    },
    {
      accessorKey: "bobotSalah",
      header: "Bobot Nilai Salah",
      cell: ({ row }) => {
        const jumlahSalah = row?.original?.kategori_id?.bobot_salah;
        return (
          <div className="w-full flex flex-col gap-3">{jumlahSalah ?? "-"}</div>
        );
      },
    },
    {
      accessorKey: "tidakMenjawab",
      header: "Tidak Menjawab",
      cell: ({ row }) => {
        const tidakMenjawab = row?.original?.kategori_id?.tidak_menjawab;
        return (
          <div className="w-full flex flex-col gap-3">
            {tidakMenjawab ?? "-"}
          </div>
        );
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
                onClick={() =>
                  navigate(`/pendistribusian-soal/edit/${row.original.id}`)
                }
              >
                Edit
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
        description="Pendistribusian Soal berhasil dihapus"
        onSubmit={() => {
          navigate("/pendistribusian-soal");
          refetch();
        }}
      />
      <DeleteDialogConfirm
        isLoading={isLoadingDelete}
        isOpen={isOpenDeleteConfirm}
        onOpenChange={setIsOpenDeleteConfirm}
        onSubmit={() => {
          deleteMutation({ id: id });
        }}
        description="Apakah anda yakin ingin menghapus Pendistribusian Soal ini ?"
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

export default DistribusiSoalTable;
