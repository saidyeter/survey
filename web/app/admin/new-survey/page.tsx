import NewSurveyForm from "@/components/new-survey-form"
import { checkNewSurveyIsAllowed } from "@/lib/source-api"

export default async function NewSurvey() {

    const allowed = await checkNewSurveyIsAllowed()
    if (!allowed) {
        return (
            <span>Yeni anket olusturmak icin tum anketlerin tamamlanmis olmasi gerekir</span>
        )
    }

    return (
        <NewSurveyForm/>
    )
}