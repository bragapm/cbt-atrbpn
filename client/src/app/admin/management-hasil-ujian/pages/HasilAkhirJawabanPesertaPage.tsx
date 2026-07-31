import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import useGetUserTestQueries, {
  IUserTest,
} from "../../management-peserta/hooks/useGetUserTestQueries";
import { useParams } from "react-router-dom";

export const HasilAkhirJawabanPesertaPage: FC = () => {
  const params = useParams();
  const [page, setPage] = React.useState(1);

  const { data: userTest, isLoading } = useGetUserTestQueries({
    page,
    limit: 10,
    problemId: params.questionId,
  });

  const columns: ColumnDef<IUserTest>[] = [
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
      accessorKey: "user_session_id.info_peserta.nama_peserta",
      header: "Nama Peserta",
      cell: ({ row }) => {
        const nama =
          row?.original?.user_session_id?.info_peserta?.nama_peserta || "-";
        return nama;
      },
    },
    {
      accessorKey: "answer.is_correct",
      header: "Hasil Jawaban",
      cell: ({ row }) => {
        const jawaban = row?.original?.answer?.is_correct
          ? "Benar"
          : row?.original?.answer?.is_correct === false
          ? "Salah"
          : "Tidak Menjawab";
        return jawaban;
      },
    },
    // Tombol hapus belum terhubung ke endpoint mana pun, jadi disembunyikan
    // dulu supaya tidak memunculkan notifikasi berhasil yang palsu.
    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: () => (
    //     <div className="flex space-x-2">
    //       <Trash
    //         className="cursor-pointer text-gray-400 w-4 h-4"
    //         onClick={() => {
    //           setIsOpenDeleteConfirm(true);
    //         }}
    //       />
    //     </div>
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3 pt-1">
      <Breadcrumbs
        paths={[
          { label: "Management Hasil Ujian" },
          { label: "List Pertanyaan", path: "/hasil-ujian/list-pertanyaan" },
          {
            label:
              userTest?.data?.data?.[0]?.user_session_id?.info_peserta
                ?.nama_peserta || "Detail Jawaban",
          },
        ]}
      />
      {/* Dialognya ikut dinonaktifkan karena hanya dipakai tombol hapus di atas.
      <SuccessDialog
        isOpen={isShowSuccessDialog}
        onOpenChange={setIsShowSuccessDialog}
        description="Peserta berhasil dihapus"
      />
      <DeleteDialogConfirm
        isOpen={isOpenDeleteConfirm}
        onOpenChange={setIsOpenDeleteConfirm}
        onSubmit={() => {
          setIsOpenDeleteConfirm(false);
          setIsShowSuccessDialog(true);
        }}
        description="Apakah anda yakin ingin menghapus peserta ini ?"
      /> */}
      <DataTable
        isLoading={isLoading}
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
