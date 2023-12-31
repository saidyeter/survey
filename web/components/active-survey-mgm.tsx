"use client"

import { TSurveySchema } from "@/lib/types";
import { Button } from "./ui/button";
import { getLocaleDate } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { finish } from "@/actions/survey";
import GoBack from "./go-back";


interface RunningSurveyShowcaseProps {
  survey?: TSurveySchema
}

export default function RunningSurveyManagement(params: RunningSurveyShowcaseProps) {
  const { survey } = params

  if (!survey || survey.status != 'running') {
    return <GoBack
      title="Aktif anket yok"
      desc=""
      link="/admin"
    />
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