"use client";

import { TNewSurveyValidationSchema, newSurveyValidationSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { create } from "@/actions/survey";

export default function NewSurveyForm() {
  const form = useForm<TNewSurveyValidationSchema>({
    resolver: zodResolver(newSurveyValidationSchema),
    defaultValues: {
      desc: '',
      name: ''
    }
  });

  async function onSubmit(data: TNewSurveyValidationSchema) {
    await create(data);
  }


  return (
    <div className="pt-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anket Ismi</FormLabel>
                <FormControl>
                  <Input placeholder="Anket Ismi" {...field} />
                </FormControl>
                <FormDescription>
                  Anket ismi olarak goruntulenecektir.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anket açıklaması</FormLabel>
                <FormControl>
                  <Input placeholder="Anket açıklaması" {...field} />
                </FormControl>
                <FormDescription>
                  Anket açıklaması olarak goruntulenecektir.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Oluştur</Button>
        </form>
      </Form>
    </div>
  );
}
