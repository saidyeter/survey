import { buttonVariants } from "@/components/ui/button"
import { getSurvey } from "@/lib/source-api"
import Link from "next/link"

export default async function SurveyPrep({ params }: { params: { id: string } }) {

    const surveyId = parseInt(params.id)

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

    const { survey, questions } = data
    return (
        <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                {survey.name}
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
                {survey.description}
            </p>
            <Link
                href={`/admin/new-survey/${surveyId}/new-question`}
                className={buttonVariants()}
            >
                Yeni soru ekle
            </Link>
            <div>
                {questions.map(q => {
                    return (
                        <div>
                            {q.text}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}