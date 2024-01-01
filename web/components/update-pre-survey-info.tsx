'use client'

import { useState } from "react"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { TNewSurveyValidationSchema } from "@/lib/types"
import { updatePre } from "@/actions/survey"
import { Label } from "./ui/label"

interface UpdatePreSurveyInfoProps {
  name: string,
  description?: string
}
export default function UpdatePreSurveyInfo(params: UpdatePreSurveyInfoProps) {

  const [editName, setEditName] = useState(params.name)
  const [editDesc, setEditDesc] = useState(params.description)

  async function Update() {
    const data: TNewSurveyValidationSchema = {
      name: editName,
      desc: editDesc
    }
    await updatePre(data)
  }

  return (
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
  )
}