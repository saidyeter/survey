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
import { finish } from "@/actions/survey";


interface RunningSurveyShowcaseProps {
  survey?: TSurveySchema
}

export default function RunningSurveyManagement(params: RunningSurveyShowcaseProps) {
  const { survey } = params

  if (!survey || survey.status != 'running') {
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

  return (

    <div className="w-full pt-4 border-t-foreground border-b-2">
      <Card>
        <CardHeader>
          <CardTitle>
            {name}
          </CardTitle>
          <CardDescription>
            {startDate && `${getLocaleDate(startDate)}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardFooter>
          <>
            <Button onClick={() => {
              const r = finish()
            }}>
              Bitir
            </Button>
          </>
        </CardFooter>
      </Card>
    </div>
  )
}