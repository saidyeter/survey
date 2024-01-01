"use client"

import { TSurveySchema } from "@/lib/types";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { removePre, start, update } from "@/actions/survey";
import { Label } from "@radix-ui/react-label";
import GoBack from "./go-back";
import { Play, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { TNewSurveyValidationSchema } from "@/lib/types";
import { useState } from "react";


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
  const statusDesc = status == "pre" ? "Henüz yayınlanmadı" : "Aktif"


  const [editName, setEditName] = useState(name)
  const [editDesc, setEditDesc] = useState(description)

  async function Update() {
    const data: TNewSurveyValidationSchema = {
      name: editName,
      desc: editDesc
    }
    await update(data)
  }

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
            <div className="flex justify-between">
              <div className="flex space-x-2 items-center">

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={'outline'}>
                      İsim/Açıklama Düzenle
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <Card>
                        <CardHeader>
                          <CardTitle>Anket Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Label>Anket ismi</Label>
                          <Input placeholder="Anket ismi" value={editName} onChange={(v) => setEditName(v.target.value)} />

                          <Label>Anket açıklaması</Label>
                          <Input placeholder="Anket açıklaması" value={editDesc} onChange={(v) => setEditDesc(v.target.value)} />
                        </CardContent>
                      </Card>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                      <AlertDialogAction onClick={Update}>
                        Onayla
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>

                </AlertDialog>

                {showStart ?
                  <Button onClick={() => start()}>
                    <Play size='1rem' />
                    Başlat
                  </Button>
                  :
                  <Label>
                    Başlatmak icin soru eklemeniz gereklidir
                  </Label>
                }
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size='icon'>
                    <Trash2 />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Onay Gerekli</AlertDialogTitle>
                    <AlertDialogDescription>
                      Henüz oylamaya sunulmamış bu anketi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => { removePre() }}
                      className={buttonVariants({ variant: 'destructive' })}
                    >
                      Onayla
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardFooter >
      </Card >
    </div >

  )
}