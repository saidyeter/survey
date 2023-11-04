import RunningSurveyManagement from "@/components/active-survey-mgm"
import NewQuestionForm from "@/components/new-question-form"
import QuestionsAccordion from "@/components/questions-accordion"
import { buttonVariants } from "@/components/ui/button"
import { getRunningSurvey,  getSurvey } from "@/lib/source-api"
import Link from "next/link"

export default async function Running() {
    const data = await getRunningSurvey()
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
            <RunningSurveyManagement survey={survey} />
            <QuestionsAccordion QnAs={qnas}  />
        </div>
    )
}