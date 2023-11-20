import ParticipantValidation from "@/components/participant-validation"
import { getRunningSurvey } from "@/lib/source-api"

export default async function SurveyStart() {
    const survey = await getRunningSurvey()

    if (!survey) {
        return (
            <p className="max-w-[700px] text-lg text-muted-foreground">
                Şu an aktif bir anket bulunmamaktadır.<br className="hidden sm:inline" />
                Anket açıldığı zaman size bildirilecektir.
            </p>
        )
    }
    return (
        <div>
            <div>
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    {survey.name}
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    {survey.description}
                </p>
            </div>
            <div>
                <ParticipantValidation />

            </div>
        </div>
    )
}