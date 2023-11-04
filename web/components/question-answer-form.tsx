"use client"

import { TQuestionAnswersResponseSchema, TQuestionsResponseSchema, questionAnswersResponseSchema } from "@/lib/types"
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


export default function QuestionAnswerForm({ survey }: TQuestionsResponseSchema) {
  const form = useForm<TQuestionAnswersResponseSchema>({
    resolver: zodResolver(questionAnswersResponseSchema),
    defaultValues: {
      answers: survey.map(q => {
        return {
          questionId: q.question.id,
          answerId: q.question.required ? q.answers[0].id : undefined,
          answerDesc: undefined,
        }
      })
    }
  })

  async function formSubmit(params: TQuestionAnswersResponseSchema) {
    await submitAttendeeAnswers(params)
  }

  return (
    <div className="pt-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} >

          {survey.map(({ question, answers }, i) => {
            return (
              <div key={question.id}>
                <input
                  type="hidden"
                  value={question.id}
                  {...form.register(`answers.${i}.questionId`)}
                />
                <FormField
                  control={form.control}
                  name={`answers.${i}.answerId`}
                  render={({ field }) => (
                    <FormItem className="rounded-lg border p-4 mb-2">
                      <FormLabel>{question.text}</FormLabel>
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
                                <FormLabel className="font-normal">
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
          <Button>Bitir</Button>
        </form>
      </Form>
    </div>
  )
}
