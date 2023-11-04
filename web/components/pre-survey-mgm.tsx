"use client"

import { TSurveySchema } from "@/lib/types";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import { getLocaleDate } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { start } from "@/actions/survey";


interface PreSurveyShowcaseProps {
    survey?: TSurveySchema
}

export default function PreSurveyManagement(params: PreSurveyShowcaseProps) {
    const { survey } = params

    if (!survey || survey.status != 'pre') {
        return (
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Aktif anket yok!</AlertTitle>
                <AlertDescription>
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
    const { id, startDate, status, description, endDate, name } = survey
    const statusDesc = status == "pre" ? "Henuz yayinlanmadi" : "Aktif"


    return (

        <div className="w-full pt-4 border-t-foreground border-b-2">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {name}
                    </CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{statusDesc}</p>
                </CardContent>
                <CardFooter>
                    <>
                        <Button onClick={async () => {
                            const r = await start()
                            console.log('r', r);
                        }}>
                            Baslat
                        </Button>
                        <Button variant={'outline'}>
                            Isim/Aciklama Duzenle
                        </Button>
                        <Button variant={'destructive'}>
                            SIL
                        </Button>
                    </>
                </CardFooter>
            </Card>

        </div>

    )
}