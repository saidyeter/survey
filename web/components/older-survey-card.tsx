import { TSurveySchema } from "@/lib/types"
import { getLocaleDate } from "@/lib/utils"
import Link from "next/link"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function OlderSurveyCard(params: TSurveySchema) {
    const { id, startDate, status, description, endDate, name } = params
    return (
        <div className="w-full pt-4 border-t-foreground border-b-2">
            <Link
                href={`/admin/survey-details/${id}`}
                className="flex flex-col space-y-1"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>
                            {startDate && `${getLocaleDate(startDate)}`}
                            {endDate && ` · ${getLocaleDate(endDate)}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant={'outline'} className="w-1/3">
                            Detaylar
                        </Button>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    )
}