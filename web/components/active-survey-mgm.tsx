"use client"

import { TSurveySchema } from "@/lib/types";
import { Button, buttonVariants } from "./ui/button";
import { getLocaleDate } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { finish } from "@/actions/survey";
import GoBack from "./go-back";
import UpdateSurveyInfo from "./update-survey-info";
import { Label } from "./ui/label";
import Link from "next/link";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogHeader, DialogFooter } from "./ui/dialog";


interface RunningSurveyShowcaseProps {
  survey?: TSurveySchema
  startedCount?: number,
  finishedCount?: number,
  totalParticipants?: number,
}

export default function RunningSurveyManagement(params: RunningSurveyShowcaseProps) {
  const { survey, startedCount, totalParticipants, finishedCount } = params
  console.log(startedCount, totalParticipants, finishedCount);

  const [open, setOpen] = useState(false);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Emin misiniz?</DialogTitle>
            <DialogDescription>Bu anket sonlandırılacaktır.Bu işlem geri alınamaz.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-between items-center flex-1">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Vazgeç
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" onClick={() => { finish() }} variant="destructive">
                  Sonlandir
                </Button>
              </DialogClose>

            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
          {((startedCount || startedCount == 0) && totalParticipants && (finishedCount || finishedCount == 0)) ?
            <>
              <p>Toplam {totalParticipants} içinden {startedCount} kişi oylamaya başlamış, {finishedCount==startedCount ? 'hepsi':finishedCount+' kişi'} oylamayı tamamlamıştır</p>
              <p>
                <Link
                  className='underline underline-offset-2'
                  href={`/admin/report/survey?id=${id}`}>
                  Buraya
                </Link>
                &nbsp;tıklayarak detaylara bakabilirsiniz.
              </p>
            </> :
            <></>
          }
        </CardContent>
        <CardFooter>
          <>
            <UpdateSurveyInfo
              id={id}
              name={name}
              description={description}
            />
            <Button onClick={() => { setOpen(true) }}>
              Bitir
            </Button>
          </>
        </CardFooter>
      </Card>
    </div>
  )
}