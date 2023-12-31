"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  totalRecCount: number,
  pageSize: number,
  pageNumber: number,
  search: string | undefined
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalRecCount,
  pageSize,
  pageNumber,
  search
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const [query, setQuery] = useState(search)

  const pageCount = Math.ceil(totalRecCount / pageSize)

  const nextDisabled = pageNumber + 1 >= pageCount
  const previousDisabled = pageNumber == 0
  const currentPage = `?n=${pageNumber}&s=${pageSize}&q=${query}`

  const previousLink = previousDisabled ? currentPage :
    `?n=${pageNumber - 1}&s=${pageSize}&q=${query}`
  const nextLink = nextDisabled ? currentPage :
    `?n=${pageNumber + 1}&s=${pageSize}&q=${query}`

  const queryLink = `?n=${0}&s=${pageSize}&q=${query}`
  const resetQueryLink = `?n=${0}&s=${pageSize}`

  return (
    <>
      <div className="flex items-center py-4 space-x-3">
        <Input
          placeholder="Katılımcılar arasında ara..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {query?.trim() !== search &&

          <Link
            href={queryLink}
            className={buttonVariants({ variant: 'default' })}
          >
            Ara
          </Link>
        }

        {search &&
          <a
            href={resetQueryLink}
            className={buttonVariants({ variant: 'outline' })}
          >
            Temizle
          </a>
        }
      </div>
      <div className="rounded-md border">
        <Table>
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
                  )
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
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sonuç yok.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {!previousDisabled &&
          <Link
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            style={{}}
            href={previousLink}
          >
            Onceki
          </Link>
        }
        <div className="border-2 rounded px-2">
          <Label>{pageNumber + 1} / {pageCount}</Label>
        </div>
        {!nextDisabled &&
          <Link
            className={`${buttonVariants({ variant: 'outline', size: 'sm' })} `}
            href={nextLink}
          >
            Sonraki
          </Link>
        }
      </div>
    </>
  )
}
