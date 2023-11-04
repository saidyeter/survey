import OlderSurveysAccordion from "@/components/older-surveys-accordion"
import { getSurveys } from "@/lib/source-api"

export default async function Ended() {
    const response = await getSurveys()

    if (!response || !response.surveys || response.surveys.length == 0) {
        return <span>Hiçbir Anket bulunamadı</span>
    }

    const { surveys } = response
    const olders = surveys.filter(s => s.status == 'ended')

    return (
        <div className="w-full" >
            <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
                Eski Anketler
            </h2>
            <OlderSurveysAccordion surveys={olders} />
        </div>
    )
}

