import { Button, buttonVariants } from "@/components/ui/button"
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
    const active = surveys.find(s => s.status != 'ended')
    const olders = surveys.filter(s => s.status == 'ended')
    // console.log(active, olders);
    return (
        <>
            <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
                Aktif Anket
            </h2>
            {active ?
                <div className="w-full border-t-2 ">
                    <span>{active.name}</span>
                    <Link
                        href={`/admin/new-survey/${active.id}`}
                        className={buttonVariants({ variant: 'outline' })}
                    >
                        Detaylar
                    </Link>
                </div>
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
        <div className="w-full pt-4 border-t-foreground border-b-2">
            <Link
                href={`/admin/survey-details/${id}`}
                className="flex flex-col space-y-1"
            >
                <span className="text-lg font-semibold aling-center">
                    {name}
                </span>
                <span className="text-sm text-muted-foreground font-normal">
                    {startDate && ` · ${getLocaleDate(startDate)}`}
                    {endDate && ` · ${getLocaleDate(endDate)}`}
                </span>

                <Button variant={'outline'} className="w-1/3">
                    Detaylar
                </Button>

            </Link>
        </div>
    )
}