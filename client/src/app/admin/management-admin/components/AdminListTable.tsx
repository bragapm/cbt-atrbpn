import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash } from "lucide-react";
import React from "react";
import { PaginationTableProps } from "@/components/table-pagination";
import { useNavigate } from "react-router-dom";
// import useDeleteMutationKategoriSoal from "../hooks/useDeleteMutationKategoriSoal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type IAdminTable = {
  data: any[];
  isLoading: boolean;
  pagination: PaginationTableProps;
  refetch: () => void;
};

const AdminListTable: React.FC<IAdminTable> = ({
  data,
  isLoading,
  pagination,
  refetch,
}) => {
  const [id, setId] = React.useState<string | number>("");
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const navigate = useNavigate();

  //   const { mutate: deleteMutation, isLoading: isLoadingDelete } =
  //     useDeleteMutationKategoriSoal({
  //       onSuccess: () => {
  //         setIsOpenDeleteConfirm(false);
  //         setIsShowSuccessDialog(true);
  //         setId("");
  //       },
  //     });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "first_name",
      header: "Nama",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "roleName",
      header: "Role",
    },
    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: ({ row }) => (
    //     <div className="flex space-x-2">
    //       <Trash
    //         className="cursor-pointer text-gray-400 w-4 h-4"
    //         onClick={() => {
    //           setIsOpenDeleteConfirm(true);
    //           setId(row.original.id);
    //         }}
    //       />
    //       <DropdownMenu>
    //         <DropdownMenuTrigger>
    //           <MoreVertical className="cursor-pointer text-gray-400 w-4 h-4" />
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent className="bg-white p-2">
    //           <DropdownMenuItem
    //             onClick={() =>
    //               navigate(`/admin/edit/${row.original.id}`)
    //             }
    //           >
    //             Edit
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     </div>
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
  ];

  return (
    <>
      <SuccessDialog
        isOpen={isShowSuccessDialog}
        onOpenChange={setIsShowSuccessDialog}
        description="Akun admin berhasil dihapus"
        onSubmit={() => {
          navigate("/admin");
          refetch();
        }}
      />
      {/* <DeleteDialogConfirm
        isLoading={isLoadingDelete}
        isOpen={isOpenDeleteConfirm}
        onOpenChange={setIsOpenDeleteConfirm}
        onSubmit={() => {
          deleteMutation({ id: id });
        }}
        description="Apakah anda yakin ingin menghapus kategori soal ini ?"
      /> */}
      <DataTable
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
      />
    </>
  );
};

export default AdminListTable;
