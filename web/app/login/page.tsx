"use client";

import { TSignInSchema, signInSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/admin'
    const [error, setError] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: TSignInSchema) => {


        const response = await signIn('credentials', {

            redirect: false,
            username: data.email,
            password: data.password
        })

        if (response?.error) {
            console.log(response.error);
            setError("Kullanıcı adı veya parola hatalı!")
            reset();
        }
        else {
            router.push(callbackUrl)
        }

    };

    return (
        <div className="w-1/2 m-auto pt-4">

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">


                <input
                    {...register("email")}
                    type="email"
                    placeholder="E-Posta"
                    className="px-4 py-2 rounded"
                />
                {errors.email && (
                    <p className="text-red-500">{`${errors.email.message}`}</p>
                )}

                <input
                    {...register("password")}
                    type="password"
                    placeholder="Parola"
                    className="px-4 py-2 rounded"
                />

                {errors.password && (
                    <p className="text-red-500">{`${errors.password.message}`}</p>
                )}
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
                >
                    Giriş Yap
                </button>
                {error && (
                    <p className="text-red-500 text-center">{`${error}`}</p>
                )}
            </form>
        </div>
    );
}