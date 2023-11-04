import RunningSurveyManagement from "@/components/active-survey-mgm"
import NewQuestionForm from "@/components/new-question-form"
import PreSurveyManagement from "@/components/pre-survey-mgm"
import QuestionsAccordion from "@/components/questions-accordion"
import { buttonVariants } from "@/components/ui/button"
import { getPreSurvey, getSurvey } from "@/lib/source-api"
import Link from "next/link"

export default async function Pre() {


    const data = await getPreSurvey()
    if (!data) {
        return (<div>
            Yanlis Anket
            <Link
                href={`/admin`}
                className={buttonVariants({ variant: "secondary" })}
            >
                Geri donmek icin tiklayiniz
            </Link>
        </div>)
    }

    const pre = await getSurvey(data.id)
    if (!pre) {
        return (<div>
            Yanlis Anket
            <Link
                href={`/admin`}
                className={buttonVariants({ variant: "secondary" })}
            >
                Geri donmek icin tiklayiniz
            </Link>
        </div>)
    }
    const { survey, qnas } = pre

    return (
        <div className="w-full">
            <PreSurveyManagement survey={survey} />
            <QuestionsAccordion QnAs={qnas} />
            <NewQuestionForm surveyid={data.id} order={qnas.length + 1} />
        </div>
    )
}