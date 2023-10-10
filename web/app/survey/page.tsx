import ParticipantValidation from "@/components/participant-validation"
import { getActiveSurvey } from "@/lib/source-api"

export default async function Survey() {
    const survey = await getActiveSurvey()

    if (!survey) {
        return (
            <p className="max-w-[700px] text-lg text-muted-foreground">
                Şu an aktif bir anket bulunmamaktadır.<br className="hidden sm:inline" />
                Anket açıldığı zaman size bildirilecektir.
            </p>
        )
    }
    return (
        <>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                {survey.name}
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
                {survey.description}
            </p>
            <ParticipantValidation />
        </>
    )
}