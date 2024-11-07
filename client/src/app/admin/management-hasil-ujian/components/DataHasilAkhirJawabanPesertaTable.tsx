import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreVertical, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useGetQuestionMetricsQuery, {
  QuestionMetric,
} from "../hooks/useGetQuestionMetricsQuery";

export const DataHasilAkhirJawabanPesertaTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);

  const { data: questionMetric } = useGetQuestionMetricsQuery({
    limit: 10,
    page,
  });

  if (!questionMetric) {
    return null;
  }

  const columns: ColumnDef<QuestionMetric>[] = [
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
      accessorKey: "question_text",
      header: "Soal Pertanyaan",
      cell: ({ row }) => {
        const question = row.original.question_text;
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: question,
            }}
          />
        );
      },
    },
    {
      accessorKey: "correct_count",
      header: "Jawaban Benar",
    },
    {
      accessorKey: "incorrect_count",
      header: "Jawaban Salah",
    },
    {
      accessorKey: "no_answer_count",
      header: "Tidak Menjawab",
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
              <DropdownMenuItem
                onClick={() => navigate("/hasil-ujian/list-pertanyaan/171")}
              >
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
    <>
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
        data={questionMetric.data.data}
        columns={columns}
        pagination={{
          pageSize: 10,
          totalItems: Number(questionMetric.data.pagination.totalRecords),
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
      />
    </>
  );
};
