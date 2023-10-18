import { PartipicationProgress } from "@/components/partipication-progress"
import { buttonVariants } from "@/components/ui/button"
import { getSurveyDetails } from "@/lib/source-api"
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
    return (
        <div className="w-full">
            <h1 className="text-xl leading-tight tracking-tighter md:text-2xl">
                Anket ismi :  {survey.name}
            </h1>

            <p className="max-w-[700px] pt-2">
                Anket Aciklamasi : {survey.description}
            </p>

            <p className="text-sm  pt-2">
                {getLocaleDate(survey.startDate)}-{getLocaleDate(survey.endDate ?? new Date())}
            </p>

            <PartipicationProgress
                current={details.participationCount}
                currentText="Katilan Sayisi"
                total={details.allParticipantCount}
                totalText="Tum katilimci sayisi"
            />

            {questionDetails.map(qd => {
                return (
                    <div key={qd.question.id} className="w-full pt-2 pb-2 border-t-muted-foreground border-t-2">
                        <div className="text-lg font-semibold ">
                            <span className="text-sm text-muted-foreground font-normal pr-2">
                                {qd.question.orderNumber} :
                            </span>
                            <span>
                                {qd.question.text}
                            </span>
                        </div>
                        <span>
                            Cevaplama sayisi : {qd.answeredCount}
                        </span>

                        {qd.answerDetails.map((ad, i) => {
                            return (
                                <div key={i}>
                                    <span className="pr-2">
                                        {ad.label} :  {ad.text}
                                    </span>
                                    <span className="font-bold">
                                        {ad.choosenCount}
                                    </span>
                                </div>

                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}