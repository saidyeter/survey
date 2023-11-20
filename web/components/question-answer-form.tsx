"use client"

import { TQuestionAnswersFormSchema, TQuestionsResponseSchema, questionAnswersFormSchema } from "@/lib/types"
import { Button } from "./ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useForm } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { submitAttendeeAnswers } from "@/actions/survey";
import { useState } from "react";
import { Separator } from "./ui/separator";


export default function QuestionAnswerForm({ survey }: TQuestionsResponseSchema) {
  const form = useForm<TQuestionAnswersFormSchema>({
    resolver: zodResolver(questionAnswersFormSchema),
    defaultValues: {
      answers: survey.map(q => {
        return {
          questionId: q.question.id,
          answerId: undefined,
          answerDesc: undefined,
        }
      })
    }
  })

  async function formSubmit(params: TQuestionAnswersFormSchema) {
    setError('')
    let overallError = ''
    let succeed = true
    params.answers.forEach((v, i) => {
      const q = survey.find(x => x.question.id == v.questionId)
      if (q?.question.required && !v.answerId) {
        succeed = false
        overallError += `${i + 1},`

      }
    })

    if (succeed) {
      await submitAttendeeAnswers(params)
      // console.log(params);
    }
    else {
      setError(overallError.substring(0, overallError.length - 1) + `. soru` + (overallError.length == 2 ? '' : 'lar') + ` zorunludur. Cevapladiktan sonra bitirebilirsiniz.`)
    }

  }

  function nextQuestion() {
    setError('')
    if (survey[s].question.required && !form.getValues().answers[s].answerId) {
      setError(`${s + 1}. soru zorunludur`)
      return
    }

    setS(p => {
      p++
      return p
    })
  }
  function prevQuestion() {
    setError('')

    setS(p => {
      p--
      return p
    })
  }

  const [s, setS] = useState(0)

  const [error, setError] = useState('')

  return (
    <div className="p-8 w-full q-a-f">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} >

          {survey.map(({ question, answers }, i, arr) => {
            return (
              <div key={question.id}
                className={`transition-opacity duration-150 ${i != s ? 'opacity-0 hidden' : 'opacity-100'}`}>
                <input
                  type="hidden"
                  value={question.id}
                  {...form.register(`answers.${i}.questionId`)}
                />
                <span className="text-muted-foreground text-lg">{i + 1} / {arr.length}</span>
                <FormField
                  control={form.control}
                  name={`answers.${i}.answerId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xl">
                        {question.text}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                        >
                          {answers.map(ans => {
                            return (
                              <FormItem
                                key={ans.id}
                                className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={ans.id.toString()} />
                                </FormControl>
                                <FormLabel className="font-normal text-lg">
                                  {ans.label} : {ans.text}
                                </FormLabel>
                              </FormItem>
                            )
                          })}

                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            )
          })}
          <Separator className="my-4" />
          <div className="flex w-full space-x-3 justify-end">
            <Button
              className={`${s == 0 && 'hidden'}`}
              type="button"
              onClick={prevQuestion}>Onceki</Button>
            <Button
              className={`${s == survey.length - 1 && 'hidden'}`}
              type="button"
              onClick={nextQuestion}>Sonraki</Button>
          </div>
          <br />
          {error && <p className="text-destructive">{error}</p>}
          <Button className={`${s != survey.length - 1 && 'hidden'}`}>Bitir</Button>
        </form>
      </Form>
    </div>
  )
}

const colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'brown',

]