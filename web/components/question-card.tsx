"use client";

import { Trash2, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import { TQnASchema } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button, buttonVariants } from "./ui/button";
import { raiseUp, lowerDown, remove } from "@/actions/question";

import Link from "next/link";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";


interface QuestionCardProps {
  qna: TQnASchema,
  showButtons?: boolean,
  editable?: boolean
}

export default function QuestionCard(params: QuestionCardProps) {
  const { question, answers } = params.qna
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardDescription>Soru {question.orderNumber}{question.required && ` (Cevap verilmesi zorunlu)`}</CardDescription>
        <div className="flex justify-between">
          <CardTitle>{question.text}</CardTitle>
          {params.editable &&
            <Link
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              href={`/admin/survey/running/${question.id}`}
            >
              <Pencil />
            </Link>
          }
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {answers.map((a) => (
            <div key={a.id}>
              <span className="text-sm text-muted-foreground">
                {a.label} şıkkı :{` `}
              </span>
              <span className="text-sm font-medium leading-none">
                {a.text}
              </span>
              {
                question.descriptiveAnswer === a.label &&
                <>
                  <br />
                  <span className="text-sm text-muted-foreground">
                    {a.label} şıkkı isaretlendiginde aciklama yapilmasi beklenir
                  </span>
                </>
              }

            </div>
          ))}
        </div>
      </CardContent>
      {params.showButtons &&
        <CardFooter>
          <div className="flex space-x-3 text-sm">
            <Link
              href={`/admin/survey/pre/${question.id}`}
              className={buttonVariants({ variant: 'default', size: 'icon' })}
            >
              <Pencil />
            </Link>
            <Button type="button" variant={'outline'} size={'icon'} onClick={() => { raiseUp(question.id) }}>
              <ChevronUp />
            </Button>
            <Button type="button" variant={'outline'} size={'icon'} onClick={() => { lowerDown(question.id) }}>
              <ChevronDown />
            </Button>

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
                    Bu soruyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => { remove(question.id) }}
                    className={buttonVariants({ variant: 'destructive' })}
                  >
                    Onayla
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      }
    </Card>
  )
}