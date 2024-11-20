"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Pagination } from "./pagination";
import { ColumnToggle } from "./column-toggle";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
}

export function DataTable<TData>({
  columns,
  data,
  pageCount,
  pageIndex,
  pageSize,
}: DataTableProps<TData>) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [sorting, setSorting] = React.useState<SortingState>(() => {
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");
    return sort && order ? [{ id: sort, desc: order === "desc" }] : [];
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("page", "1"); // reset the page when query changes
    // persist sorting
    if (sorting.length > 0 && sorting[0]) {
      params.set("sort", sorting[0].id);
      params.set("order", sorting[0].desc ? "desc" : "asc");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    //onSortingChange: setSorting,
    //getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({
          pageIndex,
          pageSize,
        });
        const params = new URLSearchParams();
        params.set("page", (newState.pageIndex + 1).toString());
        params.set("limit", newState.pageSize.toString());
        
        // Preserve sorting and search parameters
        const currentQuery = searchParams.get("query");
        if (currentQuery) params.set("query", currentQuery);
        if (sorting.length > 0 && sorting[0]) {
          params.set("sort", sorting[0].id);
          params.set("order", sorting[0].desc ? "desc" : "asc");
        }
        replace(`${pathname}?${params.toString()}`);
      }
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      const params = new URLSearchParams(searchParams);
      if (newSorting.length > 0 && newSorting[0]) {
        params.set("sort", newSorting[0].id);
        params.set("order", newSorting[0].desc ? "desc" : "asc");
      } else {
        params.delete("sort");
        params.delete("order");
      }
      
      // Preserve other parameters
      const currentPage = params.get("page");
      const currentLimit = params.get("limit");
      const currentQuery = params.get("query");
      
      if (currentPage) params.set("page", currentPage);
      if (currentLimit) params.set("limit", currentLimit);
      if (currentQuery) params.set("query", currentQuery);
      
      replace(`${pathname}?${params.toString()}`);
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          className="max-w-sm"
          placeholder="Filter vendors or descriptions..."
          defaultValue={searchParams.get("query")?.toString()} // saving query to url, no need for state
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ColumnToggle table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
      </div>
      <div className="py-4">
        <Pagination table={table}/>
      </div>
    </div>
  );
}
