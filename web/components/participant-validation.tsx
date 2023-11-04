"use client";

import { TPartipiciantValidationSchema, partipiciantValidationSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";



export default function ParticipantValidation() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState(searchParams.get('error') ? 'Kullanıcı adı veya parola hatalı!' : '')
    const form = useForm<TPartipiciantValidationSchema>({
        resolver: zodResolver(partipiciantValidationSchema),
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = form

    const onSubmit = async (data: TPartipiciantValidationSchema) => {
        const result = await fetch('/api/partipiciant', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (result.status == 200) {
            router.push('/survey/questions')
        }
        else if (result.status == 208) {
            router.push('/survey/completed')
        }
        else {
            setError('Hatalı bilgi!')
        }

    };


    return (
        <div className="pt-4 w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-Posta</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-Posta" {...field} />
                                </FormControl>
                                <FormDescription>
                                    E-Posta adresinizi girin.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Eczane kodunun 1. ve 3. hanesi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Eczane kodunun 1. ve 3. hanesi" {...field} />
                                </FormControl>
                                <FormDescription>
                                Eczane kodunun 1. ve 3. hanesini girin
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Doğrula ve Başla</Button>
                </form>
            </Form>


         
        </div>
    );
}