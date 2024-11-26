import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

interface VideotronTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  speed: string;
  isLoading?: boolean;
}

export function VideotronTable<TData, TValue>({
  columns,
  data,
  speed,
  isLoading,
}: VideotronTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const containerRef = useRef(null); // Menyimpan referensi ke elemen kontainer
  const [isScrollingDown, setIsScrollingDown] = useState(true);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxScrollTop = container.scrollHeight - container.clientHeight;
        const currentScrollTop = container.scrollTop;
        if (isScrollingDown) {
          container.scrollTop = currentScrollTop + 2;
          if (currentScrollTop >= maxScrollTop) {
            setIsScrollingDown(false);
          }
        } else {
          container.scrollTop = 0;
          setIsScrollingDown(true);
        }
      }
    }, Number(speed));

    return () => clearInterval(scrollInterval);
  }, [isScrollingDown, speed]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-6 border rounded-md h-[82vh]">
      {isLoading ? (
        <div className="w-full h-[75vh]">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
      ) : (
        <>
          <Table refContainer={containerRef} height="100%">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      <p className="text-base">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </p>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="w-auto max-w-52 ">
                        <p className="text-base font-normal">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </p>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-[70vh] text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
