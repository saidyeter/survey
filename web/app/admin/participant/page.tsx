import { getParticipants } from "@/lib/source-api"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default async function Participants({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = getParams(searchParams)
  const { pageSize, pageNumber, search } = params;

  const data = await getParticipants(pageSize, pageNumber, search)


  return (
    <div className="w-full" >
      <div className="flex justify-between">
        <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
          Katılımcılar
        </h2>
        <Link href='/admin/participant/new'
          className={buttonVariants({ variant: 'outline'})}
        >
          Yeni katılımcı ekle
        </Link>
      </div>

      {!data?.list ?
        (
          <span>Katılımcı bulunamadi</span>
        ) :
        (
          <DataTable
            columns={columns}
            data={data.list}
            {...params}
            totalRecCount={data.totalCount} />
        )

      }
    </div>
  )
}

function getParams(searchParams: { [key: string]: string | string[] | undefined }) {
  const _pageSize = searchParams.s;
  const _pageNumber = searchParams.n;
  const _search = searchParams.q;

  let pageSize = 5;
  let pageNumber = 0;
  let search = '';

  if (_pageSize && typeof _pageSize === 'string') {
    pageSize = parseInt(_pageSize)
    if (pageSize.toString() != _pageSize) {
      pageSize = 5
    }
  }

  if (_pageNumber && typeof _pageNumber === 'string') {
    pageNumber = parseInt(_pageNumber)
    if (pageNumber.toString() != _pageNumber) {
      pageNumber = 1
    }
  }
  if (_search && typeof _search === 'string') {
    search = _search
  }

  return {
    pageNumber,
    pageSize,
    search
  }
}