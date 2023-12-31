import GoBack from "@/components/go-back"
import UpdateQuestionOnRunningSurvey from "@/components/update-question-on-running-survey"
import { getSingleQuestion } from "@/lib/source-api"


export default async function EditQuestion({ params }: { params: { id: string } }) {

  const id = parseInt(params.id)

  if (id.toString() != params.id) {
    return <GoBack
      title="Yanlis soru"
      desc=""
      link="/admin/survey/running"
    />
  }

  const qna = await getSingleQuestion(id)
  if (!qna) {
    return <GoBack
      title="Yanlis soru"
      desc=""
      link="/admin/survey/running"
    />
  }
  

  return (
    <UpdateQuestionOnRunningSurvey qna={qna} />
  )
}