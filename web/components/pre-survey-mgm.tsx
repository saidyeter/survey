"use client"

import { TSurveySchema } from "@/lib/types";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { start } from "@/actions/survey";
import { Label } from "@radix-ui/react-label";
import GoBack from "./go-back";


interface PreSurveyShowcaseProps {
  survey?: TSurveySchema,
  showStart: boolean
}

export default function PreSurveyManagement(params: PreSurveyShowcaseProps) {
  const { survey, showStart } = params

  if (!survey || survey.status != 'pre') {
    return <GoBack
      title="Aktif anket yok"
      desc=""
      link="/admin"
    />
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
          <div className="flex flex-col space-y-4 w-full">

            <div >
              {showStart ?

                <Button onClick={async () => {
                  const r = await start()
                  console.log('r', r);
                }}
                  size={'lg'}
                  className="text-lg"
                >
                  Baslat
                </Button>
                :
                <Label>
                  Baslatmak icin Soru eklemeniz gereklidir
                </Label>
              }
            </div>
            <div className="flex justify-between">
              <Button variant={'outline'}>
                Isim/Aciklama Duzenle
              </Button>
              <Button variant={'destructive'}>
                Sil
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

    </div>

  )
}