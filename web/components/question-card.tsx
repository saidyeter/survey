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

import { Button } from "./ui/button";
import { raiseUp } from "@/actions/raise-up-question";
import { lowerDown } from "@/actions/lower-down-question";
import { remove } from "@/actions/remove-question";

export default function QuestionCard(params: TQnASchema) {
  const { question, answers } = params
  return (

    <Card className="mt-4">
      <CardHeader>
        <CardDescription>Soru {question.orderNumber}{question.required && ` (Cevap verilmesi zorunlu)`}</CardDescription>
        <CardTitle>{question.text}</CardTitle>

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
      <CardFooter>
        <div className="flex space-x-3 text-sm">
          <Button type="button" size={'icon'} onClick={() => { }}>
            <Pencil />
          </Button>
          <Button type="button" variant={'outline'} size={'icon'} onClick={() => { raiseUp(question.surveyId, question.id) }}>
            <ChevronUp />
          </Button>
          <Button type="button" variant={'outline'} size={'icon'} onClick={() => { lowerDown(question.surveyId, question.id) }}>
            <ChevronDown />
          </Button>
          <Button type="button" variant={'destructive'}
            size={'icon'} onClick={() => { remove(question.surveyId, question.id) }}>
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>

  )
}