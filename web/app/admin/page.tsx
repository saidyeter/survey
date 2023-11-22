import ActiveSurveyShowcase from "@/components/active-survey-showcase"
import OlderSurveysAccordion from "@/components/older-surveys-accordion"
import { getSurveys } from "@/lib/source-api"

export default async function Admin() {
  const response = await getSurveys()
  if (!response || !response.surveys || response.surveys.length == 0) {
    return <span>Hiçbir Anket bulunamadı</span>
  }
  const { surveys } = response
  const active = surveys.find(s => s.status != 'ended')
  const olders = surveys.filter(s => s.status == 'ended')

  return (
    <div className="w-full" >
      <div className="">
        <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
          Aktif Anket
        </h2>

        <ActiveSurveyShowcase survey={active} />
      </div>
      <div className="">
        <h2 className="pt-4 text-2xl font-bold leading-tight tracking-tighter md:text-xl">
          Eski Anketler
        </h2>
        <OlderSurveysAccordion surveys={olders} />

      </div>
    </div>
  )
}

