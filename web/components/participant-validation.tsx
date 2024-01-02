"use client";

import { TPartipiciantValidationSchema, partipiciantValidationSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Terminal } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export default function ParticipantValidation() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const form = useForm<TPartipiciantValidationSchema>({
    resolver: zodResolver(partipiciantValidationSchema),
    defaultValues: {
      code: '8680001',
      email: ''
    }
  });

  const onSubmit = async (data: TPartipiciantValidationSchema) => {
    setLoading(true)
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
      setError('Girilen bilgilerde bazısı hatalı!')
      form.reset()
      setLoading(false)
    }
  };

  return (
    <div className="pt-4 w-full">
      {error &&

        <Alert className="mt-4 mb-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Hata oluştu!</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      }
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Posta adresi</FormLabel>
                <FormControl>
                  <Input placeholder="E-Posta adresinizi girin" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GLN Numarası</FormLabel>
                <FormControl>
                  <Input placeholder="GLN Numarası girin" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {loading ?
            <>Bekleyiniz</> :
            <Button type="submit">Doğrula ve Başla</Button>
          }
        </form>
      </Form>
    </div>
  );
}