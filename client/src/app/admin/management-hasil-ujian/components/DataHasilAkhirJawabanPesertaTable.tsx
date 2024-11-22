/* eslint-disable react-hooks/rules-of-hooks */
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
import { MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetQuestionMetricsQuery, {
  QuestionMetric,
} from "../hooks/useGetQuestionMetricsQuery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TableSearch from "@/components/table-search";
import { useDebounceSearch } from "@/hooks/useDebounce";

export const DataHasilAkhirJawabanPesertaTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounceSearch({ value: search });

  const { data: questionMetric } = useGetQuestionMetricsQuery({
    limit: 10,
    page,
    search: debouncedSearch,
  });
  console.log(questionMetric);

  // if (!questionMetric) {
  //   return null;
  // }
  const columns: ColumnDef<QuestionMetric>[] = [
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
      accessorKey: "question_text",
      header: "Soal Pertanyaan",
      cell: ({ row }) => {
        const questionHtml = row.original.question_text;
        const previewText = questionHtml?.replace(/<[^>]+>/g, "").slice(0, 50);
        const [isOpen, setIsOpen] = useState(false);

        return (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={(value) =>
              setIsOpen(value === row.original.question_id.toString())
            }
          >
            <AccordionItem
              value={row.original.question_id.toString()}
              className="border-none"
            >
              <AccordionTrigger className="hover:no-underline py-0">
                {!isOpen && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-normal">
                      {previewText}...
                    </span>
                  </div>
                )}
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div
                  dangerouslySetInnerHTML={{ __html: questionHtml }}
                  className="text-sm text-gray-600"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
      <div className="flex w-full justify-end">
        <TableSearch value={search} onChange={setSearch} />
      </div>
      <DataTable
        data={questionMetric ? questionMetric?.data?.data : []}
        columns={columns}
        pagination={{
          pageSize: 10,
          totalItems: questionMetric
            ? Number(questionMetric?.data?.pagination?.totalRecords)
            : 0,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
      />
    </>
  );
};
