"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { participantSchema } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { remove } from "@/actions/participant"

export const columns: ColumnDef<z.infer<typeof participantSchema>>[] = [
  {
    accessorKey: "title",
    header: "Unvan",
  },
  {
    accessorKey: "email",
    header: "E Mail",
  },
  {
    accessorKey: "city",
    header: "Şehir",
  },
  {
    accessorKey: "subcity",
    header: "İlçe",
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
        <div className="flex space-x-3">
          <Link href={'/admin/participant/' + d.id}
            className={buttonVariants({ variant: "outline", size: 'icon' })}
          >
            <Pencil size='1.25rem' />
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size='icon'>
                <Trash2 stroke='red' />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Onay Gerekli</DialogTitle>
                <DialogDescription>
                  Bu katılımcıyı silmek istediginizden emin misiniz?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="md:justify-between sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Vazgeç
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" variant="destructive" onClick={() => { remove(d.id) }}>
                    Sil
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      )
    },
  }
]
