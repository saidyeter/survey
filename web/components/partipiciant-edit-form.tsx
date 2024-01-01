"use client"

import { edit } from "@/actions/participant";
import { TNewParticipantSchema, participantSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface EditFormProps {
  data: TNewParticipantSchema,
  id: number
}

export default function EditForm(props: EditFormProps) {
  const form = useForm<TNewParticipantSchema>({
    resolver: zodResolver(participantSchema),
    defaultValues: props.data,
  });

  async function formSubmit(data: TNewParticipantSchema) {
    const result = await edit(props.id, data)
    if (result && !result.success) {
      //poroblem
    }

  };


  return (
    <div className="pt-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-8">
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
          <Button type="submit">Kaydet</Button>
        </form>
      </Form>
    </div>
  )
}