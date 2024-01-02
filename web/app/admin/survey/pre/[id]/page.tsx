import GoBack from "@/components/go-back"
import UpdateQuestionForm from "@/components/update-question-form"
import { getSingleQuestion } from "@/lib/source-api"

export default async function EditQuestion({ params }: { params: { id: string } }) {

  const id = parseInt(params.id)

  if (id.toString() != params.id) {
    return <GoBack
      title="Yanlış soru"
      desc=""
      link="/admin/survey/running"
    />
  }

  const qna = await getSingleQuestion(id)
  if (!qna) {
    return <GoBack
      title="Yanlış soru"
      desc=""
      link="/admin/survey/running"
    />
  }

  return (
    <UpdateQuestionForm {...qna} />
  )
}