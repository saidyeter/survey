"use client"

import { participantSchema } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

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
]
