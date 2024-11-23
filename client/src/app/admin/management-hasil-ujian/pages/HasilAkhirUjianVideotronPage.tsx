import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useMemo, useState } from "react";
import { VideotronTable } from "../components/VideotronTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetSessionTestQueries from "../../management-peserta/hooks/useGetSessionTestQueries";
import useGetVideotron from "../hooks/useGetVideotron";

export const HasilAkhirUjianVideotron: FC = () => {
  const [sessionIdSelected, setSessionIdSelected] = useState("1");

  const { data: userSessionTest } = useGetVideotron({
    page: 1,
    limit: 100,
    sessionId: sessionIdSelected,
  });

  const { data: sessionTest } = useGetSessionTestQueries();

  const sessionTestOption = useMemo(() => {
    if (sessionTest?.data?.data) {
      setSessionIdSelected(String(sessionTest?.data?.data[0]?.id));
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

  // if (!userSessionTest) {
  //   return null;
  // }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id_peserta",
      header: "ID Peseta",
    },
    {
      accessorKey: "nama_peserta",
      header: "Nama Peserta",
    },
    {
      accessorKey: "score",
      header: "Skor",
      cell: ({ row }) => {
        return row.original.score || "-";
      },
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
              <SelectContent className=" max-h-60 overflow-y-scroll">
                {sessionTestOption.map((option, idx) => (
                  <SelectItem key={idx} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </header>
        </div>
        {userSessionTest && (
          <VideotronTable
            data={userSessionTest?.data?.data}
            columns={columns}
          />
        )}
      </div>
    </>
  );
};
