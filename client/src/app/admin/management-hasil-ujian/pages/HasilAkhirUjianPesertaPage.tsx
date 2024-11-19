import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import useGetUserTestQueries, {
  IUserTest,
} from "../../management-peserta/hooks/useGetUserTestQueries";
import { useParams } from "react-router-dom";

export const HasilAkhirUjianPesertaPage: FC = () => {
  const params = useParams();
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const { data: userTest } = useGetUserTestQueries({
    page,
    limit: 10,
    pesertaId: params.pesertaId,
  });

  if (!userTest) {
    return null;
  }

  console.log(userTest);

  const columns: ColumnDef<IUserTest>[] = [
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
      accessorKey: "problem.question",
      header: "Soal Pertanyaan",
    },
    {
      accessorKey: "answer.is_correct",
      header: "Jawaban",
    },
    {
      accessorKey: "problem.kategori_id.nama_kategori",
      header: "Kategori Soal",
    },
    {
      accessorKey: "problem.materi_id.materi",
      header: "Materi Soal",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3 pt-1">
      <Breadcrumbs
        paths={[
          { label: "Management Hasil Ujian" },
          {
            label: "Hasil Akhir Ujian",
            path: "/hasil-ujian/hasil-akhir-ujian",
          },
          {
            label: "Detail Hasil Ujian",
            path: "/hasil-ujian/hasil-akhir-ujian/detail",
          },
          {
            label:
              userTest?.data?.data[0]?.user_session_id?.info_peserta
                ?.nama_peserta,
          },
        ]}
      />
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
        data={userTest?.data?.data}
        columns={columns}
        pagination={{
          pageSize: 10,
          totalItems: userTest?.data?.meta?.filter_count,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
      />
    </div>
  );
};
