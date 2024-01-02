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
import { ChevronDown, ChevronUp } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  totalRecCount: number,
  pageSize: number,
  pageNumber: number,
  search: string,
  orderDirection: string,
  orderColumn: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalRecCount,
  pageSize,
  pageNumber,
  search,
  orderColumn,
  orderDirection
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // const [ascending, setAscending] = useState(orderDirection)
  const [query, setQuery] = useState(search)

  const pageCount = Math.ceil(totalRecCount / pageSize)

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
            href={createSearchQuery(pageSize, 0, query, orderColumn, orderDirection)}
            className={buttonVariants({ variant: 'default' })}
          >
            Ara
          </Link>
        }

        {search &&
          <a
            href={createSearchQuery(pageSize, 0, "", orderColumn, orderDirection)}
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
                  const currentCol = header.id === orderColumn
                  const asc = orderDirection === 'a'
                  let link = createSearchQuery(pageSize, pageNumber, search, header.id, 'a')
                  if (currentCol) {
                    link = createSearchQuery(pageSize, pageNumber, search, header.id, asc ? 'd' : 'a')
                  }

                  return (
                    <TableHead key={header.id}>
                      <Link href={link} className=' underline underline-offset-2 flex space-x-1'>

                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {currentCol && asc && <ChevronDown size='1rem' />}
                        {currentCol && !asc && <ChevronUp size='1rem' />}
                      </Link>
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
      <div className="flex items-center justify-between">
        <Label>Toplam {totalRecCount} kayıt var. Tamamını&nbsp;
          <Link href={"/api/file" + createSearchQuery(undefined, undefined, query, orderColumn, orderDirection)} target="_blank" className="underline">buradan</Link>&nbsp;indirebilirsiniz</Label>
        <div className="flex items-center justify-end space-x-2 py-4">
          {pageNumber > 0 &&
            <Link
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
              href={createSearchQuery(pageSize, pageNumber - 1, query, orderColumn, orderDirection)}
            >
              Onceki
            </Link>
          }
          <div className="border-2 rounded px-2">
            <Label>{pageNumber + 1} / {pageCount}</Label>
          </div>
          {pageNumber < pageCount &&
            <Link
              className={`${buttonVariants({ variant: 'outline', size: 'sm' })} `}
              href={createSearchQuery(pageSize, pageNumber + 1, query, orderColumn, orderDirection)}
            >
              Sonraki
            </Link>
          }
        </div>
      </div>
    </>
  )
}



function createSearchQuery(
  pageSize?: number,
  pageNumber?: number,
  search?: string,
  orderColumn?: string,
  orderDirection?: string) {

  const params = new URLSearchParams();

  if (pageSize) { params.append("s", pageSize.toString()) }
  if (pageNumber) { params.append("n", pageNumber.toString()) }
  if (search) { params.append("q", search.toString()) }
  if (orderColumn) { params.append("oc", orderColumn.toString()) }
  if (orderDirection) { params.append("od", orderDirection.toString()) }

  return '?' + params.toString()
}