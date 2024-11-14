import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC, useMemo, useState } from "react";
import useGetUserSessionTestQueries, {
  IUserSessionTest,
} from "../../management-peserta/hooks/useGetUserSessionTestQueries";
import { VideotronTable } from "../components/VideotronTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetSessionTestQueries from "../../management-peserta/hooks/useGetSessionTestQueries";

export const HasilAkhirUjianVideotron: FC = () => {
  const [sessionIdSelected, setSessionIdSelected] = useState(undefined);

  const { data: userSessionTest } = useGetUserSessionTestQueries({
    page: 1,
    limit: 10000,
    sessionId: sessionIdSelected,
  });

  const { data: sessionTest } = useGetSessionTestQueries();

  const sessionTestOption = useMemo(() => {
    if (sessionTest?.data?.data) {
      const options = sessionTest.data.data.map((item) => {
        return {
          label: item.name,
          value: String(item.id),
        };
      });
      return options;
    }
    return [];
  }, [sessionTest]);

  if (!userSessionTest) {
    return null;
  }

  const columns: ColumnDef<IUserSessionTest>[] = [
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
      accessorKey: "info_peserta.code",
      header: "ID Peseta",
    },
    {
      accessorKey: "info_peserta.nama_peserta",
      header: "Nama Peserta",
    },
    {
      accessorKey: "score",
      header: "Skor",
    },
  ];

  return (
    <>
      <div className="px-5 py-10 h-screen">
        <div className="w-full h-[80px] mb-4 ">
          <header className="flex w-full justify-between px-6 py-4 items-center border border-gray-200 rounded-xl h-[80px] shadow bg-white ">
            <div className="w-fit h-fit flex gap-2 p-2 border border-gray-200 rounded-xl ">
              <img src="/images/logo.svg" alt="logo" />
              <div className="flex flex-col ">
                <p className="text-sm font-light">Computer Based Test</p>
                <p className="text-xs font-light">Pejabat Pembuat Akta Tanah</p>
              </div>
            </div>
            <Select
              value={sessionIdSelected}
              onValueChange={(value) => setSessionIdSelected(value)}
            >
              <SelectTrigger className=" px-3 w-[200px]">
                <SelectValue placeholder="Pilih Sesi Ujian" />
              </SelectTrigger>
              <SelectContent>
                {sessionTestOption.map((option, idx) => (
                  <SelectItem key={idx} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </header>
        </div>
        <VideotronTable data={userSessionTest?.data?.data} columns={columns} />
      </div>
    </>
  );
};
