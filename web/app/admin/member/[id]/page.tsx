import GoBack from "@/components/go-back"
import EditForm from "@/components/partipiciant-edit-form"
import { getSingleParticipant } from "@/lib/source-api"

export default async function Edit({ params }: { params: { id: string } }) {

  const id = parseInt(params.id)

  if (id.toString() != params.id) {
    return <GoBack
      title="Bulunamadi"
      desc=""
      link="/admin/member"
    />

  }

  const data = await getSingleParticipant(id)
  if (!data) {
    return <GoBack
      title="Bulunamadi"
      desc=""
      link="/admin/member"
    />

  }
  return (
    <EditForm data={data} id={id}/>
  )
}