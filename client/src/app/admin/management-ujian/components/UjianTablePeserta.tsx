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
} from "@/components/ui/dialog";
import { IUser } from "@/types/collection/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import useMutatePinUjian from "../hooks/useMutatePinUjian";
import UjianPIN from "@/app/admin/management-ujian/components/UjianPIN";

type IUjianTablePeserta = {
  isDetail?: boolean;
  value?: string;
  sessionId?: string | number;
  onChange?: (value: string) => void;
};

const UjianTablePeserta: React.FC<IUjianTablePeserta> = ({
  isDetail = false,
  sessionId,
  value,
  onChange,
}) => {
  const limit: number = 10;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [studentVal, setStudentVal] = useState<string[]>([]);

  const { data: dataUser, isLoading: isLoadingUser } = useGetUserUjian({
    page: page,
    limit: limit,
    search: search,
  });

  const handleSearchChange = (searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1);
  };

  const getCurrentUser = () => {
    if (value) {
      return dataUser?.data?.find((item) => item.id === value);
    }
    return "";
  };

  const currentUser = getCurrentUser();

  const handleCheckValue = (val: string, bool: boolean) => {
    if (bool) {
      setStudentVal([val]);
    } else {
      setStudentVal([]);
    }
  };

  const getCheckValue = (val: string) => {
    return studentVal.includes(val);
  };

  // TODO: UNCOMMENT THIS IF USERS RETRIVE ARRAY

  // const handleCheckAll = (bool: boolean) => {
  //   if (bool) {
  //     setStudentVal(dataUser?.data?.map((item) => item.id));
  //   } else {
  //     setStudentVal([]);
  //   }
  // };

  // const getCheckAll = () => {
  //   return studentVal.length === dataUser?.data?.length;
  // };

  const handleSubmit = () => {
    onChange(studentVal[0]);
    setIsOpen(false);
  };

  const columns: ColumnDef<IUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        // TODO: UNCOMENT THIS IF USER RETRIVE ARRAY
        // <Checkbox
        //   checked={getCheckAll()}
        //   onCheckedChange={(value) => {
        //     table.toggleAllPageRowsSelected(!!value);
        //     handleCheckAll(!!value);
        //   }}
        //   aria-label="Select all"
        // />
        <></>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={getCheckValue(row.original.id)}
          onCheckedChange={(value) => {
            handleCheckValue(row.original.id, !!value);
          }}
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
  ];

  return (
    <>
      {isDetail ? (
        <Button
          className="px-2 py-1 font-normal"
          variant="ghost"
          onClick={() => setIsOpen(true)}
        >
          Lihat Detail Ujian
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full items-start flex flex-col gap-1 h-[60px] border-gray-300"
          onClick={() => {
            if (value) {
              setStudentVal([value]);
            }
            setIsOpen(true);
          }}
        >
          <p className="text-gray-500 font-light text-xs">Peserta Ujian</p>
          <p>
            {currentUser
              ? `${currentUser?.first_name} - ${currentUser?.last_name}`
              : "Data Peserta Ujian"}
          </p>
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="pt-10 max-w-4xl">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-col  gap-1">
              <DialogTitle>Data Peserta CBT</DialogTitle>
              <DialogDescription>
                Data ditampilkan sesuai dengan filter
              </DialogDescription>
            </div>

            <div className="w-1/2">
              <SearchBox onSearch={handleSearchChange} />
            </div>
          </div>

          <div className="p-2 w-full h-full">
            <DataTable
              customSelectedFooter={studentVal?.length}
              buttonAction={handleSubmit}
              iconButtonAction={isDetail ? <Lock /> : <></>}
              labelButtonAction={
                isDetail ? "Generate Pin Ujian" : "Pilih Peserta"
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
    </>
  );
};

export default UjianTablePeserta;
