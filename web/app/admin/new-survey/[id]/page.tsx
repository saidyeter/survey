import NewQuestionForm from "@/components/new-question-form"
import QuestionsAccordion from "@/components/questions-accordion"
import { buttonVariants } from "@/components/ui/button"
import { getSurvey } from "@/lib/source-api"
import Link from "next/link"

export default async function SurveyPrep({ params }: { params: { id: string } }) {

    const surveyId = parseInt(params.id)
    // console.log('surveyId', surveyId);

    if (surveyId.toString() != params.id) {

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

    const data = await getSurvey(surveyId)
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

    const { survey, qnas } = data
    return (
        <div className="w-full">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                {survey.name}
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
                {survey.description}
            </p>
            <QuestionsAccordion QnAs={qnas} />

            <NewQuestionForm surveyid={surveyId} order={qnas.length + 1} />

        </div>
    )
}