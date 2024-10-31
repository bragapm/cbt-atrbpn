import UjianPIN from "@/app/admin/management-ujian/components/UjianPIN";
import useGetUserUjian from "@/app/admin/management-ujian/hooks/useGetUserUjian";
import { DataTable } from "@/components/data-table";
import SearchBox from "@/components/search-box";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IUser } from "@/types/collection/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { Lock } from "lucide-react";
import React, { useState } from "react";

type IUjianTablePeserta = {
  triggerButton: React.ReactNode;
  isDetail?: boolean;
};

const UjianTablePeserta: React.FC<IUjianTablePeserta> = ({
  triggerButton,
  isDetail = false,
}) => {
  const limit: number = 10;
  const [page, setPage] = useState(1);
  const { data: dataUser, isLoading: isLoadingUser } = useGetUserUjian({
    page: page,
    limit: limit,
  });

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
      <DialogTrigger className="w-full">{triggerButton}</DialogTrigger>
      <DialogContent className="pt-10 max-w-4xl">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-col  gap-1">
            <DialogTitle>Data Peserta CBT</DialogTitle>
            <DialogDescription>
              Data ditampilkan sesuai dengan filter
            </DialogDescription>
          </div>

          <div className="w-1/2">
            <SearchBox />
          </div>
        </div>

        <div className="p-2 w-full h-full">
          <DataTable
            actionButton={
              <>
                {isDetail ? (
                  <UjianPIN
                    triggerButton={
                      <Button
                        variant="actions"
                        size="actions"
                        startContent={<Lock />}
                      >
                        Generate Pin Ujian
                      </Button>
                    }
                  />
                ) : (
                  <Button variant="actions" size="actions">
                    Pilih Peserta
                  </Button>
                )}
              </>
            }
            data={dataUser?.data || []}
            columns={columns}
            isLoading={isLoadingUser}
            pagination={{
              pageSize: limit,
              totalItems: dataUser?.meta.total_count,
              onPageChange: (page) => setPage(page),
              currentPage: page,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UjianTablePeserta;
