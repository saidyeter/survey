"use client";

import { TPartipiciantValidationSchema, partipiciantValidationSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

export default function ParticipantValidation() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState(searchParams.get('error') ? 'Kullanıcı adı veya parola hatalı!' : '')
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TPartipiciantValidationSchema>({
        resolver: zodResolver(partipiciantValidationSchema),
    });

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
        else {
            setError('Hatalı bilgi!')
        }

    };


    return (
        <div className="pt-4 w-full">

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
                <input
                    {...register("email")}
                    placeholder="E-Posta"
                    className="px-4 py-2 rounded"
                />
                {errors.email && (
                    <p className="text-red-500">{`${errors.email.message}`}</p>
                )}

                <input
                    {...register("code")}
                    placeholder="Eczane kodunun 1. ve 3. hanesi"
                    className="px-4 py-2 rounded"
                />

                {errors.code && (
                    <p className="text-red-500">{`${errors.code.message}`}</p>
                )}

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
                >
                    Doğrula ve Başla
                </button>
                {error && (
                    <p className="text-red-500 text-center">{`${error}`}</p>
                )}
            </form>
        </div>
    );
}