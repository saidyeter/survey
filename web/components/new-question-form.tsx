"use client";

import { TNewQuestionSchema, newQuestionSchema, } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { create } from "@/actions/new-survey";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Separator } from "./ui/separator";

interface NewQuestionFormProps {
    surveyid: number,
    order: number
}

export default function NewQuestionForm(props: NewQuestionFormProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState(searchParams.get('error'))
    const form = useForm<TNewQuestionSchema>({
        resolver: zodResolver(newQuestionSchema),
        defaultValues: {
            required: true,
            orderNumber: props.order
        }
    });
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form

    const { fields, append, remove } = useFieldArray({
        name: 'answers',
        control
    })
    const formSubmit = async (data: TNewQuestionSchema) => {
        console.log(data);

    };
    console.log('errors', errors);

    const labels = 'ABCDEFGHJKLMNOPRSTUVYZ'
    return (
        <div className="pt-4 w-full">
            <Form {...form}>
                <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-y-2">

                    <input
                        {...register(`surveyId`)}
                        type="hidden"
                        value={props.surveyid}
                    />
                    <input
                        {...register(`answerType`)}
                        type="hidden"
                        value={'single'}
                    />
                    <input
                        {...register(`descriptiveAnswer`)}
                        type="text"
                        value={1}
                    />

                    <Separator />
                    <FormField
                        control={form.control}
                        name="orderNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Soru sirasi : {field.value}</FormLabel>
                                <FormControl>
                                    <Input type="hidden" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Bu sirayi anket sayfasindan degistirebilirsiniz
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator />


                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
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
                    <Separator />


                    <FormField
                        control={form.control}
                        name="required"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
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
                    <Separator />

                    <div className="pt-8">
                        {fields.map((f, i) => {
                            return (
                                <div key={i}>
                                    <input
                                        {...register(`answers.${i}.label`)}
                                        type="hidden"
                                        value={labels[i]}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`answers.${i}.text`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cevap {labels[i]}</FormLabel>
                                                <FormControl className="o-8">
                                                    <>

                                                        <div className="flex">
                                                            <Input placeholder={`Cevap ${labels[i]} icin icerik giriniz`} {...field} />
                                                            <Button type="button" size={'lg'} onClick={() => remove(i)}>Sil</Button>
                                                        </div>
                                                        <Separator />
                                                        <br />
                                                    </>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )
                        })}
                        <Separator />

                        <Button type="button" variant={'secondary'} size={'lg'} className="w-full" onClick={() => append({ text: '', label: '' })}>Yeni Cevap Ekle</Button>

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
        </div>
    );
}
