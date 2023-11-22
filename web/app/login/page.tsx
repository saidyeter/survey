"use client";

import { TSignInSchema, signInSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react'
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'
  const error = searchParams.get('error') ? 'Kullanıcı adı veya parola hatalı!' : ''
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    await signIn('credentials', {
      username: data.email,
      password: data.password,
      callbackUrl
    })
  };


  return (
    <div className="w-1/2 m-auto pt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <Input
          {...register("email")}
          type="email"
          placeholder="E-Posta"
          className="px-4 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}

        <Input
          {...register("password")}
          type="password"
          placeholder="Parola"
          className="px-4 py-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <Button
          disabled={isSubmitting}
          type="submit"
        >
          Giriş Yap
        </Button>
        {error && (
          <p className="text-red-500 text-center">{`${error}`}</p>
        )}
      </form>
    </div>
  );
}