import { PartipicationProgress } from "@/components/partipication-progress"
import QuestionDetailCard from "@/components/question-detail-card"
import { buttonVariants } from "@/components/ui/button"
import { checkPreSurveyExists, getSurveyDetails } from "@/lib/source-api"
import { getLocaleDate } from "@/lib/utils"
import Link from "next/link"

export default async function SurveyDetails({ params }: { params: { id: string } }) {

    // katilim sayisi
    // katilimci sayisi
    // sorular
    // her bir soru icin
    // sorunun kendisi
    // toplam siklar
    // hangi sik kac defa secilmis
    // katilimci listesi linki 
    // soru listesi linki

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

    const details = await getSurveyDetails(surveyId)

    if (!details) {
        return (<div>
            Anket raporu hazir degil
            <Link
                href={`/admin`}
                className={buttonVariants({ variant: "secondary" })}
            >
                Geri donmek icin tiklayiniz
            </Link>
        </div>)
    }
    const { questionDetails, survey } = details

    const preSurvey = await checkPreSurveyExists()

    return (
        <div className="w-full">
            <h1 className="text-xl leading-tight tracking-tighter md:text-2xl">
                Anket ismi :  {survey.name}
            </h1>

            <p className="max-w-[700px] pt-2">
                Anket Aciklamasi : {survey.description}
            </p>

            <p className="text-sm  pt-2">
                {getLocaleDate(survey.startDate ?? new Date())}-{getLocaleDate(survey.endDate ?? new Date())}
            </p>

            <PartipicationProgress
                current={details.participationCount}
                currentText="Katilan Sayisi"
                total={details.allParticipantCount}
                totalText="Tum katilimci sayisi"
            />

            {questionDetails.map(qd => {
                return (
                    <QuestionDetailCard
                        showCopy={preSurvey?.exists}
                        key={qd.question.id}
                        questionDetail={qd}
                    />
                )
            })}
        </div>
    )
}