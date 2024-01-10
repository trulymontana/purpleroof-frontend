'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'

import { DataTablePagination } from '@/components/tables/data-table/data-table-pagination'
import { DataTableToolbar } from '@/components/tables/data-table/data-table-toolbar'
import Loader from '@/components/Loader'
import { FacetOption } from './data'
import { DateRange } from 'react-day-picker'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  filterKey?: string
  facetKey?: string
  facetOptions?: FacetOption[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  filterKey,
  facetKey,
  facetOptions
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [date, setDate] = React.useState<DateRange | undefined>()
  const [tableData, setTableData] = React.useState<TData[]>(data)

  React.useEffect(() => {
    if (data) {
      setTableData(data)
    }
    if (date && date?.from && date?.to) {
      const from = date?.from?.toISOString();
      const to = date?.to?.toISOString();
      // @ts-ignore
      const filteredData = data.filter(item => item.createdAt > from && item.createdAt < to)
      setTableData(filteredData)
    }
  }, [date, data])

  console.log({ tableData, data })

  const table = useReactTable({
    data: tableData ?? data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar
        date={date}
        setDate={setDate}
        table={table}
        filterKey={filterKey ?? 'email'}
        facetKey={facetKey ?? 'status'}
        facetOptions={facetOptions}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {/* <div className="flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-slate-600"></div>
                  </div> */}
                  <Loader />
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows?.length && !isLoading ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
