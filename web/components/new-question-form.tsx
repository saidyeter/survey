"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "./ui/switch";
import { create } from "@/actions/question";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { Label } from "@radix-ui/react-label";


interface NewQuestionFormProps {
  surveyid: number,
  order: number
}

export default function NewQuestionForm(props: NewQuestionFormProps) {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const form = useForm<TNewQuestionSchema>({
    resolver: zodResolver(newQuestionSchema),
    defaultValues: {
      text: '',
      isrequired: true,
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
    }

  };

  // temporary log to test on browser
  // console.log('errors', errors);

  const labels = 'ABCDEFGHJKLMNOPRSTUVYZ'
  return (
    <div className="pt-8 w-full">
      <Accordion type="single" collapsible>
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
                      <FormLabel>Soru icerigi</FormLabel>
                      <FormControl>
                        <Input placeholder="Soru icerigi" {...field} />
                      </FormControl>
                      <FormDescription>
                        Soru icerigini giriniz
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answerType"
                  render={({ field }) => (
                    <FormItem className="space-y-3 rounded-lg border p-4 mt-4">
                      <FormLabel>Cevap Tipi</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="single" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Tek secim
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="multiple" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Coklu secim
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Cevaplardan sadece bir şıkkı mı seçebilsin yoksa birden fazla işaretleyebilsin mi?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isDescriptiveAnswerWanted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Aciklamali cevap
                        </FormLabel>
                        <FormDescription>
                          Katilimci, bir cevabi sectiginde aciklama yazmasi isteniyorsa bu isaretlenmelidir.
                          Aciklama yapmasini istediginiz cevabi asagidan secebilirsiniz.
                        </FormDescription>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>

                    </FormItem>
                  )}
                />
                {form.getValues().isDescriptiveAnswerWanted &&


                  <FormField
                    control={form.control}
                    name="descriptiveAnswer"
                    render={({ field }) => (
                      <FormItem className="space-y-3 rounded-lg border p-4 mt-4">
                        <FormLabel>Aciklama istenen cevap</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex space-x-1"
                          >
                            {fields.map((val, i) => {
                              return (
                                <FormItem key={i} className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={labels[i]} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {labels[i]}
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
                }

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
