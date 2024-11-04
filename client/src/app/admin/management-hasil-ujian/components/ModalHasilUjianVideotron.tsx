import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React, { FC } from "react";
import useGetUserSessionTestQueries, {
  IUserSessionTest,
} from "../../management-peserta/hooks/useGetUserSessionTestQueries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ModalHasilUjianVideotronProps {
  opened: boolean;
  onOpenChange: () => void;
}

export const ModalHasilUjianVideotron: FC<ModalHasilUjianVideotronProps> = ({
  opened,
  onOpenChange,
}) => {
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const { data: userSessionTest } = useGetUserSessionTestQueries({
    page,
    limit: 10,
  });

  if (!userSessionTest) {
    return null;
  }

  const columns: ColumnDef<IUserSessionTest>[] = [
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
      accessorKey: "info_peserta.code",
      header: "ID Peseta",
    },
    {
      accessorKey: "info_peserta.nama_peserta",
      header: "Nama Peserta",
    },
    {
      accessorKey: "score",
      header: "Skor",
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
              <DropdownMenuItem onClick={() => {}}>
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
    <Dialog open={opened} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-lg">
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
          data={userSessionTest?.data?.data}
          columns={columns}
          pagination={{
            pageSize: 10,
            totalItems: userSessionTest?.data?.meta?.total_count,
            onPageChange: (page) => setPage(page),
            currentPage: page,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};