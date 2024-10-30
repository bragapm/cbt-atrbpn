import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import UjianInputForm from "./UjianInputForm";
import { DataTable } from "@/components/data-table";
import { IUser } from "@/types/collection/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { PaginationTableProps } from "@/components/table-pagination";
import { Checkbox } from "@/components/ui/checkbox";

type IUjianTablePeserta = {
  data: IUser[];
  isLoading: boolean;
  pagination: PaginationTableProps;
};

const UjianTablePeserta: React.FC<IUjianTablePeserta> = ({
  data,
  isLoading,
  pagination,
}) => {
  const columns: ColumnDef<IUser>[] = [
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
      header: "ID Peserta",
      cell: ({ row }) => {
        const id = row.original.id;
        return id;
      },
    },
    {
      accessorKey: "name",
      header: "Nama Peserta",
      cell: ({ row }) => {
        const nama = row.original.first_name + " " + row.original.last_name;
        return nama;
      },
    },
    {
      accessorKey: "session",
      header: "Sesi Ujian",
      // cell: ({ row }) => {
      //   const session = row.original.session;
      //   return session;
      // },
    },
    {
      accessorKey: "phone",
      header: "No. Hp",
      // cell: ({ row }) => {
      //   const phone = row.original.phone;
      //   return phone;
      // },
    },
  ];

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button
          variant="outline"
          className="w-full items-start flex flex-col gap-1 h-[60px] border-gray-300"
        >
          <p className="text-gray-500 font-light text-xs">Peserta Ujian</p>
          <p>Buka Data Peserta Ujian</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="pt-10 max-w-2xl">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <DialogTitle>Data Peserta CBT</DialogTitle>
            <DialogDescription>
              Data ditampilkan sesuai dengan filter
            </DialogDescription>
          </div>

          <div>
            <UjianInputForm title="Cari Peserta" />
          </div>
        </div>

        <div className="w-full h-full bg-gray-200 rounded-lg p-2">
          <DataTable
            data={data || []}
            columns={columns}
            isLoading={isLoading}
            pagination={pagination}
          />
        </div>
        <DialogFooter>
          <Button variant="actions" size="actions">
            Pilih Peserta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UjianTablePeserta;
