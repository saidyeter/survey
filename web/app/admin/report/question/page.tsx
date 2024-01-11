import { getParticipantsWhoVotedQuestion } from "@/lib/source-api"
import { columns } from "./columns"

import { createPagingSearchQuery, getIdParams, getPagingParams } from "@/lib/utils"
import GoBack from "@/components/go-back"
import { DataTable } from "@/components/partipicant-data-table"
import PageInfoAndDownloadLink from "@/components/info-and-download-link"

export default async function QuestionReport({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = getPagingParams(searchParams)
  const { pageSize, pageNumber, search, orderDirection, orderColumn } = params;
  const id = getIdParams(searchParams)
  if (!id) {
    return <GoBack
      title="Bulunamadi"
      desc=""
      link="/admin/participant"
    />
  }

  const data = await getParticipantsWhoVotedQuestion(id, pageSize, pageNumber, search, orderColumn, orderDirection)
  const downloadLink = "/api/file/q" + createPagingSearchQuery(undefined, undefined, search, orderColumn, orderDirection,id)

  return (
    <div className="w-full" >
      <div className="flex justify-between">
        <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
         {id} Id&apos;li soruya cevap veren katılımcılar
        </h2>
      </div>
      <PageInfoAndDownloadLink totalRecCount={data?.totalCount ?? 0} url={downloadLink} />
     
      <DataTable
        columns={columns}
        data={data?.list ?? []}
        {...params}
        id={id}
        totalRecCount={data?.totalCount ?? 0} />

    </div>
  )
}