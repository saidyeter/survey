import { buttonVariants } from "@/components/ui/button"
import { getSurveys } from "@/lib/source-api"
import { TSurveySchema } from "@/lib/types"
import { getLocaleDate } from "@/lib/utils"
import Link from "next/link"

export default async function Admin() {
    const response = await getSurveys()

    if (!response || !response.surveys || response.surveys.length == 0) {
        return <span>Hiçbir Anket bulunamadı</span>
    }

    const { surveys } = response
    const activeStatus = 'active'
    const active = surveys.find(s => s.status == activeStatus)
    const olders = surveys.filter(s => s.status != activeStatus)
    console.log(active, olders);
    return (
        <>
            <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
                Aktif Anket
            </h2>
            {active ?
                <>
                    <span>{active.name}</span>
                </>
                :
                <>
                    <span>Aktif anket bulunamadi</span>
                    <Link
                        href='/admin/new-survey'
                        className={buttonVariants()}
                    >
                        Yeni Anket Olustur
                    </Link>
                </>
            }
            <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
                Eski Anketler
            </h2>
            {olders?.length > 0 ?
                <>
                    {olders.map(s => {
                        return (
                            <SingleSurvey key={s.id} {...s} />
                        )
                    })}
                </>
                : <>
                    <span>Eski anket bulunamadi</span>
                </>
            }

        </>
    )
}


function SingleSurvey(params: TSurveySchema) {
    const { id, startDate, status, description, endDate, name } = params
    return (
        <div className="w-full pt-4 border-t-muted-foreground border-t-2">
            <div className="text-lg font-semibold aling-center">
                {name}
                <span className="text-sm text-muted-foreground font-normal">
                    {` · ${getLocaleDate(startDate)}`}
                    {endDate && ` · ${getLocaleDate(endDate)}`}
                </span>
            </div>

            <Link
                href={`/admin/survey-details/${id}`}
                className={buttonVariants({ variant: "secondary" })}
            >
                Anket detaylari icin tiklayiniz
            </Link>
        </div>
    )
}