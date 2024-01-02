import { getParticipants } from "@/lib/source-api"
import { columns } from "./columns"
import { DataTable } from "@/components/partipicant-data-table"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { createPagingSearchQuery, getPagingParams } from "@/lib/utils"
import PageInfoAndDownloadLink from "@/components/info-and-download-link"

export default async function Participants({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = getPagingParams(searchParams)
  const { pageSize, pageNumber, search, orderDirection, orderColumn } = params;

  const data = await getParticipants(pageSize, pageNumber, search, orderColumn, orderDirection)
  const downloadLink = "/api/file/all" + createPagingSearchQuery(undefined, undefined, search, orderColumn, orderDirection)
  return (
    <div className="w-full" >
      <div className="flex justify-between">
        <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
          Tüm Katılımcılar
        </h2>
        <Link href='/admin/participant/new'
          className={buttonVariants({ variant: 'outline' })}
        >
          Yeni katılımcı ekle
        </Link>
      </div>
      <PageInfoAndDownloadLink totalRecCount={data?.totalCount ?? -1} url={downloadLink} />
      <DataTable
        columns={columns}
        data={data?.list ?? []}
        {...params}
        totalRecCount={data?.totalCount ?? 0} />

    </div>
  )
}