import NewSurveyForm from "@/components/new-survey-form"
import { checkNewSurveyIsAllowed } from "@/lib/source-api"
import GoBack from "@/components/go-back"

export default async function NewSurvey() {

  const allowed = await checkNewSurveyIsAllowed()
  if (!allowed) {
    return <GoBack
      title="Aktif anket var"
      desc="Yeni anket olusturmak icin tum anketlerin tamamlanmis olmasi gerekir."
      link="/admin"
    />
  }

  return (
    <NewSurveyForm />
  )
}