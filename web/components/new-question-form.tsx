"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { TNewQuestionSchema, newQuestionSchema, } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { create } from "@/actions/question";

import { toast } from "sonner"
import { Toaster, } from "@/components/ui/sonner"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { Label } from "@radix-ui/react-label";
import AnswerContent from "./answer-content";


interface NewQuestionFormProps {
  surveyid: number,
  order: number
}

export default function NewQuestionForm(props: NewQuestionFormProps) {
  const [o, setO] = useState('')
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const form = useForm<TNewQuestionSchema>({
    resolver: zodResolver(newQuestionSchema),
    defaultValues: {
      text: '',
      isrequired: false,
      answers: [{
        label: 'A',
        text: "Evet"
      }, {
        label: 'B',
        text: "Hayir"
      }],
      answerType: 'single',
      descriptiveAnswer: null,
      isDescriptiveAnswerWanted: false
    }
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, },
  } = form

  const { fields, append, remove } = useFieldArray({
    name: 'answers',
    control
  })

  async function formSubmit(data: TNewQuestionSchema) {
    const result = await create(data)
    if (result.success) {
      reset()
      window.scrollTo(0, 0);
      setO('')
      toast("Yeni soru olusturuldu", {
        // description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Tamam",
          onClick: () => { },
        },

      })
    }

  };
  const labels = 'ABCDEFGHJKLMNOPRSTUVYZ'
  return (
    <div className="pt-8 w-full">
      <Toaster />
      <Accordion
        type="single"
        collapsible
        value={o}
        onValueChange={setO}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Label className="text-2xl">
              Yeni soru ekle
            </Label>
          </AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <form
                onSubmit={handleSubmit(formSubmit)} /*action={create}*/ /*onSubmit={handleSubmit(formSubmit)}*/
                className="flex flex-col gap-y-2 " >

                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="rounded-lg border p-4">
                      <FormLabel>Soru Metni</FormLabel>
                      <FormControl>
                        <Input placeholder="Soru Metni" {...field} />
                      </FormControl>
                      <FormDescription>
                        Soru Metnini giriniz
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <input type="hidden" id="answerType" name="answerType" value='single' />
                <input type="hidden" id="isDescriptiveAnswerWanted" name="isDescriptiveAnswerWanted" value='false' />
                <input type="hidden" id="descriptiveAnswer" name="descriptiveAnswer" />

                <FormField
                  control={form.control}
                  name="isrequired"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
                      <FormControl>
                        <Checkbox
                          id={field.name}
                          name="isrequired"
                          checked={field.value ?? true}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Zorunlu mu?
                        </FormLabel>
                        <FormDescription>
                          Bu kutucuk isaretlenirse soruyu cevaplamadan gecilmesine izin verilmeyecektir.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <div className="pt-4">
                  <h2 className="text-xl">Cevaplar</h2>
                  {fields.map((f, i) => {
                    return (
                      <div key={f.id}>
                        <FormField
                          control={form.control}
                          name={`answers.${i}.text`}
                          render={({ field }) => (
                            <FormItem className="rounded-lg border p-4 mb-2">
                              <FormLabel>Cevap {labels[i]}</FormLabel>
                              <FormControl>
                                <div className="">
                                  <div className="flex space-x-3">
                                    <Input placeholder={`Cevap ${labels[i]} icin icerik giriniz`} {...field} />
                                    {fields?.length > 2 &&
                                      <Button type="button" variant={'destructive'} size={'icon'} onClick={() => remove(i)}>
                                        <Trash2 />
                                      </Button>
                                    }
                                  </div>
                                  {field.value.includes('[') &&
                                    <div >
                                      Bu sekilde gozukecek:
                                      <div className="p-2 border-2">
                                        <AnswerContent content={field.value} />
                                      </div>
                                    </div>
                                  }

                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )
                  })}
                  <Separator />
                  {labels.length > fields.length &&
                    <Button type="button" variant={'secondary'} size={'lg'} className="w-full" onClick={() => append({ text: '', label: labels[fields.length] })}>Yeni Cevap Ekle</Button>
                  }
                </div>
                {errors.answers?.message && (
                  <p className="text-red-500 text-center">{errors.answers.message}</p>
                )}
                {errors.answers?.root?.message && (
                  <p className="text-red-500 text-center">{errors.answers.root.message}</p>
                )}

                <Button disabled={isSubmitting} className="w-full" >Oluştur</Button>

                {error && (
                  <p className="text-red-500 text-center">{`${error}`}</p>
                )}
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
