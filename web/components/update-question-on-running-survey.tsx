'use client'

import { raiseUp, lowerDown, updateRunning } from "@/actions/question"
import { TNewSurveyValidationSchema, TQnASchema, TUpdateOnRunningQuestionRequestSchema, newSurveyValidationSchema, updateOnRunningQuestionRequestSchema } from "@/lib/types"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "./ui/card"
import Link from "next/link"
import { Separator } from "@radix-ui/react-separator"
import AnswerContent from "./answer-content"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input"

interface UpdateQuestionOnRunningSurveyProps {
  qna: TQnASchema
}
export default function UpdateQuestionOnRunningSurvey(params: UpdateQuestionOnRunningSurveyProps) {
  const { question, answers } = params.qna
  const form = useForm<TUpdateOnRunningQuestionRequestSchema>({
    resolver: zodResolver(updateOnRunningQuestionRequestSchema),
    defaultValues: {
      text: question.text,
      answers: answers.map(a => {
        return {
          id: a.id,
          text: a.text,
          label: a.label
        }
      })
    }
  });
  const { fields, append, remove } = useFieldArray({
    name: 'answers',
    control: form.control
  })
  async function onSubmit(data: TUpdateOnRunningQuestionRequestSchema) {
    //
    // console.log(form.getValues())
    // console.log(data);

    updateRunning(question.id, data)

  }

  return (
    <div className="p-4 w-full border-2" >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soru metni</FormLabel>
                <FormControl>
                  <Input placeholder="Soru metni" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((a, i) => (
            <FormField
              key={a.id}
              control={form.control}
              name={`answers.${i}.text`}
              render={({ field }) => {

                return (
                  <FormItem>
                    <FormLabel> {a.label} şıkkı </FormLabel>
                    <FormControl>
                      <Input placeholder="Soru metni" {...field} />
                    </FormControl>
                    {field.value.includes('[') &&
                      <div >
                        Bu sekilde gozukecek:
                        <div className="p-2 border-2">
                          <AnswerContent content={field.value} />
                        </div>
                      </div>
                    }

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

          ))}
          <Button>yo</Button>
        </form>
      </Form>
    </div>

  )
}


/*

  <Card className="p-4 w-full">
      <CardHeader>
        <CardTitle>
          {question.id} Id'li soruyu duzenle
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div >
            <span className="text-sm text-muted-foreground">
              Soru Metni
            </span>
            <span className="ml-4 font-medium leading-none">
              {question.text}
            </span>
          </div>
          {answers.map((a) => (
            <div key={a.id}>
              <Separator className="my-2" />
              <span className="text-sm text-muted-foreground">
                {a.label} şıkkı :{` `}
              </span>
              <span className="ml-4 font-medium leading-none">
                {a.text}
              </span>
              {a.text.includes('[') &&
                <>
                  <br />
                  Bu sekilde gozukecek:
                  <br />
                  <div className="p-2 border-2">
                    <AnswerContent content={a.text} />
                  </div>
                </>
              }
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Link href='/admin/survey/running' className={buttonVariants({ variant: 'outline' })}>Vazgec</Link>

          <Button type="button" onClick={() => { }}>
            Kaydet
          </Button>
        </div>
      </CardFooter>
    </Card>
*/