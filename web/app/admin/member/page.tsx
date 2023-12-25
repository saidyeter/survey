import { getParticipants } from "@/lib/source-api"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import Link from "next/link"

export default async function Members() {

  const data = await getParticipants()


  return (
    <div className="w-full" >
      <div className="flex justify-between">
        <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
          Katılımcılar
        </h2>
        <Link href='/admin/member/new'>
          Yeni ekle
        </Link>
      </div>

      {!data?.list ?
        (
          <span>Katılımcı bulunamadi</span>
        ) :
        (

          <DataTable columns={columns} data={data.list} pageNumber={data.nextPage} pageSize={data.pageSize} totalRecCount={data.totalCount} />

        )

      }
    </div>
  )
}

