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


interface ActiveSurveyShowcaseProps {
  survey?: TSurveySchema
}

export default function ActiveSurveyShowcase(params: ActiveSurveyShowcaseProps) {
  const { survey } = params

  if (!survey) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Aktif anket yok!</AlertTitle>
        <AlertDescription>
          <Link
            href={`/admin/survey/new`}
            className="underline"
          >
            Buraya
          </Link>
          &nbsp;tıklayarak yeni anket oluşturabilirsiniz
        </AlertDescription>
      </Alert>

    )
  }
  const { id, startDate, status, description, endDate, name } = survey
  const statusDesc = status == "pre" ? "Henüz yayınlanmadı" : "Aktif"
  return (
    <div className="w-full pt-4 border-t-foreground border-b-2">
      <Link
        href={`/admin/survey/${status}`}
        className="flex flex-col space-y-1"
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {name}
            </CardTitle>
            {status == 'running' &&
              <CardDescription>
                {startDate && `${getLocaleDate(startDate)}`}
              </CardDescription>
            }
          </CardHeader>
          <CardContent>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span
                      // style={{ backgroundColor: statusColor }}
                      className={`flex h-3 w-3 rounded-full  ${status == "running" ? "animate-pulse bg-primary" : "bg-secondary"}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{statusDesc}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              &nbsp;{description}
            </div>
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