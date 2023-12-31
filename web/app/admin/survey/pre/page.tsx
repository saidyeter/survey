import GoBack from "@/components/go-back"
import NewQuestionForm from "@/components/new-question-form"
import PreSurveyManagement from "@/components/pre-survey-mgm"
import QuestionsAccordion from "@/components/questions-accordion"
import { getPreSurvey, getSurvey } from "@/lib/source-api"

export default async function Pre() {
  const data = await getPreSurvey()
  if (!data) {
    return <GoBack
      title="Anket bulunamadi"
      desc=""
      link="/admin"
    />
  }

  const pre = await getSurvey(data.id)
  if (!pre) {
    return <GoBack
      title="Yanlis Anket"
      desc=""
      link="/admin"
    />
  }
  
  const { survey, qnas } = pre

  return (
    <div className="w-full">
      <PreSurveyManagement survey={survey} showStart={qnas.length > 0} />
      <QuestionsAccordion QnAs={qnas} showButtons />
      <NewQuestionForm surveyid={data.id} order={qnas.length + 1} />
    </div>
  )
}