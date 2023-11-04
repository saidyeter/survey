import NewSurveyForm from "@/components/new-survey-form"
import { checkNewSurveyIsAllowed } from "@/lib/source-api"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Terminal } from "lucide-react"

export default async function NewSurvey() {

    const allowed = await checkNewSurveyIsAllowed()
    if (!allowed) {
        return (

            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Aktif anket var!</AlertTitle>
                <AlertDescription>
                    Yeni anket olusturmak icin tum anketlerin tamamlanmis olmasi gerekir.
                    <br />
                    <Link
                        href={`/admin/`}
                        className="underline"
                    >
                        Buraya
                    </Link>
                    &nbsp;tiklayarak geri donebilirsiniz
                </AlertDescription>
            </Alert>


        )
    }

    return (
        <NewSurveyForm />
    )
}