import RunningSurveyManagement from "@/components/active-survey-mgm"
import GoBack from "@/components/go-back"
import NewQuestionForm from "@/components/new-question-form"
import QuestionsAccordion from "@/components/questions-accordion"
import { buttonVariants } from "@/components/ui/button"
import { getRunningSurvey, getSurvey } from "@/lib/source-api"
import Link from "next/link"

export default async function Running() {
  const data = await getRunningSurvey()
  if (!data) {
    return <GoBack
      title="Yanlis Anket"
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
      <RunningSurveyManagement survey={survey} />
      <QuestionsAccordion QnAs={qnas} editable />
    </div>
  )
}