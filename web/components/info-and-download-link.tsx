'use client'

import Link from "next/link"
import { Label } from "./ui/label"
import { createPagingSearchQuery } from "@/lib/utils"

interface PageInfoAndDownloadLinkProps {
  totalRecCount: number,
  url: string
}
export default function PageInfoAndDownloadLink({ totalRecCount, url }: PageInfoAndDownloadLinkProps) {
  return (
    <Label>Toplam {totalRecCount} kayıt var. 
    {totalRecCount>0  && <>Tamamını&nbsp;
      <Link href={url} target="_blank" className="underline">buradan</Link>&nbsp;indirebilirsiniz</>}
    </Label>
  )
}