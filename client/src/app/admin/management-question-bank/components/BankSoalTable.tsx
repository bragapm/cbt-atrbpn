import BadgeCategory from "@/components/badge-category";
import { DataTable } from "@/components/data-table";
import DeleteDialogConfirm from "@/components/delete-dialog-confirm";
import SuccessDialog from "@/components/success-dialog";
import { PaginationTableProps } from "@/components/table-pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteMutationBankSoal from "../hooks/useDeleteMutationBankSoal";
import TableHeaderSorting from "@/components/table-header-sorting";
import useGetKategoriSoal from "../hooks/useGetKategoriSoal";
import useGetMateriSoal from "../hooks/useGetMateriSoal";

type IBankSoalTable = {
  data: IBankSoal[];
  isLoading: boolean;
  pagination: PaginationTableProps;
  refetch: () => void;
  onSelectCategory?: (category: string | null) => void;
  onSelectMateri?: (materi: string | null) => void;
};

const BankSoalTable: React.FC<IBankSoalTable> = ({
  data,
  isLoading,
  pagination,
  refetch,
  onSelectCategory,
  onSelectMateri,
}) => {
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = React.useState(false);
  const [id, setId] = React.useState<string | number>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isShowSuccessDialog, setIsShowSuccessDialog] = React.useState(false);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedMateri, setSelectedMateri] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const { data: dataMateri, isLoading: isLoadingMateri } = useGetMateriSoal();
  const { data: dataKategori, isLoading: isLoadingKategori } =
    useGetKategoriSoal();

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
      header: () => {
        return <TableHeaderSorting title="ID Soal" />;
      },
    },
    {
      accessorKey: "question",
      header: () => {
        return <TableHeaderSorting title="Soal" />;
      },
      cell: ({ row }) => {
        const questionHtml = row.original.question;
        const previewText = questionHtml?.replace(/<[^>]+>/g, "").slice(0, 50);
        return (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={(value) =>
              setIsOpen(value === row.original.id.toString())
            }
          >
            <AccordionItem
              value={row.original.id.toString()}
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
      accessorKey: "category",
      header: () => {
        return (
          <TableHeaderSorting
            title="Kategori"
            dropdownData={
              isLoadingKategori
                ? [{ label: "Loading...", value: "" }]
                : dataKategori?.data?.map((item) => ({
                    value: String(item.id),
                    label: item.nama_kategori,
                  }))
            }
            selectedDropdownValue={selectedCategory}
            onSelectedDropdownValue={(selected) => {
              setSelectedCategory(selected);
              onSelectCategory(selected.value);
            }}
          />
        );
      },
      cell: ({ row }) => {
        const kategori = row?.original.kategori_id?.nama_kategori;
        return <BadgeCategory name={kategori} />;
      },
    },
    {
      accessorKey: "materiSoal",
      header: () => {
        return (
          <TableHeaderSorting
            title="Materi"
            dropdownData={
              isLoadingMateri
                ? [{ label: "Loading...", value: "" }]
                : dataMateri?.data?.map((item) => ({
                    value: String(item.id),
                    label: item.materi,
                  }))
            }
            selectedDropdownValue={selectedMateri}
            onSelectedDropdownValue={(selected) => {
              setSelectedMateri(selected);
              onSelectMateri(selected.value);
            }}
          />
        );
      },
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
        onSubmit={() => {
          navigate("/bank-soal");
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
