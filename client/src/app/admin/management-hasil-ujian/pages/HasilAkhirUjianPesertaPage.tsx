import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useParams } from "react-router-dom";
import useGetSummarize from "../../management-peserta/hooks/useGetSummarize";
import useGetJawabanPeserta, {
  IJawabPeserta,
} from "../../management-peserta/hooks/useGetJawabanPeserta";

export const HasilAkhirUjianPesertaPage: FC = () => {
  const params = useParams();
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const formatScore = (score: any) => {
    const [integerPart, decimalPart = ""] = score.toString().split(".");
    const paddedDecimal = decimalPart.padEnd(6, "0").slice(0, 6);
    return `${integerPart}.${paddedDecimal}`;
  };

  const { data: userTest } = useGetJawabanPeserta({
    user_session_id: params.pesertaId,
  });

  let { data: sumarize } = useGetSummarize({
    id: params.pesertaId,
  });

  let sumaryDataFormated: { max_score: any; score: string };

  if (sumarize?.data) {
    sumaryDataFormated = {
      max_score: sumarize?.data.max_score,
      score: formatScore(sumarize?.data.score),
    };
  }
  if (!userTest) {
    return null;
  }

  console.log(userTest);

  const columns: ColumnDef<IJawabPeserta>[] = [
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
      accessorKey: "soal_pertanyaan",
      header: "Soal Pertanyaan",
    },
    {
      accessorKey: "jawaban",
      header: "Jawaban",
      cell: ({ row }) => {
        const jawaban =
          row?.original?.jawaban === 1
            ? "Benar"
            : row?.original?.jawaban === -1
            ? "Salah"
            : "Tidak Menjawab";
        return jawaban;
      },
    },
    {
      accessorKey: "kategori",
      header: "Kategori Soal",
    },
    {
      accessorKey: "skor",
      header: "Skor",
    },
    {
      accessorKey: "nilai_jawaban_benar",
      header: "Nilai Jawaban Benar",
    },
    {
      accessorKey: "materi",
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
          // {
          //   label:
          //     userTest?.data?.data[0]?.user_session_id?.info_peserta
          //       ?.nama_peserta,
          // },
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
        hidePagination
        data={userTest?.data?.data}
        columns={columns}
        pagination={{
          pageSize: 10,
          totalItems: userTest?.data?.meta?.filter_count,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
        dataSumary={sumaryDataFormated}
      />
    </div>
  );
};
