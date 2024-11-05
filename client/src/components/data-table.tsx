import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import React, { ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PaginationTable, { PaginationTableProps } from "./table-pagination";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: PaginationTableProps;
  labelButtonAction?: string;
  iconButtonAction?: ReactNode;
  buttonAction?: () => void;
  isLoading?: boolean;
  actionButton?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  buttonAction,
  labelButtonAction = "Load More Data",
  iconButtonAction,
  isLoading,
  pagination,
  actionButton,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
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
    <div className="flex flex-col gap-6">
      {isLoading ? (
        <div className="w-full h-[75vh]">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
      ) : (
        <>
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
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
                      <TableCell key={cell.id} className="w-auto max-w-20 ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-between w-full items-center">
            <p className="text-xs w-full">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} Rows Selected
            </p>
            <PaginationTable
              pageSize={pagination.pageSize}
              currentPage={pagination.currentPage}
              onPageChange={pagination.onPageChange}
              totalItems={pagination.totalItems}
            />
            <div className="w-full flex justify-end">
              <Button
                variant="actions"
                size="actions"
                startContent={
                  iconButtonAction || <RefreshCw className="w-5 h-5" />
                }
                onClick={buttonAction}
              >
                {labelButtonAction}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
