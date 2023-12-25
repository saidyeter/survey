"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { participantSchema } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { Trash2, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link"

export const columns: ColumnDef<z.infer<typeof participantSchema>>[] = [
  {
    accessorKey: "email",
    header: "E Mail",
  },
  {
    accessorKey: "title",
    header: "Unvan",
  },
  {
    accessorKey: "city",
    header: "Sehir",
  },
  {
    accessorKey: "subcity",
    header: "Ilce",
  },
  {
    accessorKey: "code",
    header: "Eczane kodu",
  },
  {
    header: "#",
    cell: ({ row }) => {
      const d = row.original

      return (
        <div>
          <Link href={'/admin/member/' + d.id}
            className={buttonVariants({ variant: "ghost", size: 'icon' })}
          >
            <Pencil size='1.25rem' />
          </Link>

      
          <Button type="button" variant={'ghost'}
            size={'icon'} onClick={() => { }}>
            <Trash2 stroke='red' />
          </Button>
        </div>
      )
    },
  }
]
