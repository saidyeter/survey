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
          <Button type="button" variant={'outline'} size={'icon'} onClick={() => { }}>
            <ChevronUp />
          </Button>
          <Button type="button" variant={'outline'} size={'icon'} onClick={() => { }}>
            <ChevronDown />
          </Button>
          <Button type="button" variant={'destructive'}
            size={'icon'} onClick={() => { }}>
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>

  )
}