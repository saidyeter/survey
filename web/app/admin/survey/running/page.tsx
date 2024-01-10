import RunningSurveyManagement from "@/components/active-survey-mgm"
import GoBack from "@/components/go-back"
import QuestionsAccordion from "@/components/questions-accordion"
import { getRunningSurvey, getSurvey } from "@/lib/source-api"

export default async function Running() {
  const data = await getRunningSurvey()
  if (!data) {
    return <GoBack
      title="Yanlış Anket"
      desc=""
      link="/admin"
    />
  }
  const pre = await getSurvey(data.survey.id)
  if (!pre) {
    return <GoBack
      title="Yanlış Anket"
      desc=""
      link="/admin"
    />
  }
  const { survey, qnas } = pre

  return (
    <div className="w-full">
      <RunningSurveyManagement survey={survey} startedCount={data.startedCount ?? -1} finishedCount={data.finishedCount ?? -1} totalParticipants={data.totalParticipants ?? -1} />
      <QuestionsAccordion QnAs={qnas} editable />
    </div>
  )
}