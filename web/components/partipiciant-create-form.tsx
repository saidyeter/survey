"use client"

import { create } from "@/actions/partipiciant";
import { TNewParticipantSchema, newParticipantSchema, participantSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";


export default function CreateForm() {
  const form = useForm<TNewParticipantSchema>({
    resolver: zodResolver(newParticipantSchema),
    defaultValues: {
      city: '',
      code: '',
      email: '',
      pType: 'Eczane',
      status: 'Aktif',
      subcity: '',
      title: '',
    },
  });

  async function formSubmit(data: TNewParticipantSchema) {
    const result = await create(data)
    if (result && !result.success) {
      //poroblem
    }

  };

  console.log(form.formState.errors)
  return (
    <div className="pt-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unvan</FormLabel>
                <FormControl>
                  <Input placeholder="Unvan" {...field} />
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
                <FormLabel>Eczane Kodu</FormLabel>
                <FormControl>
                  <Input placeholder="Eczane Kodu" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E Mail</FormLabel>
                <FormControl>
                  <Input placeholder="E Mail" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sehir</FormLabel>
                <FormControl>
                  <Input placeholder="Sehir" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subcity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İlçe</FormLabel>
                <FormControl>
                  <Input placeholder="İlçe" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Yeni ekle</Button>
        </form>
      </Form>
    </div>
  )
}