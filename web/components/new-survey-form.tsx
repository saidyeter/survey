"use client";

import { TNewSurveyValidationSchema, newSurveyValidationSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter, redirect  } from "next/navigation";
import { createNewSurvey } from "@/lib/source-api";
import { create } from "@/actions/new-survey";

export default function NewSurveyForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState(searchParams.get('error'))
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TNewSurveyValidationSchema>({
        resolver: zodResolver(newSurveyValidationSchema),
    });

    // const onSubmit = async (data: TNewSurveyValidationSchema) => {
    //     const result = await createNewSurvey(data)


    //     console.log('NewSurveyForm', result);

    //     if (result) {
    //         router.push('/admin/new-survey/' + result.id)
    //     }
    //     else {
    //         setError('Anlık bir hata olustu!')
    //     }

    // };


    return (
        <div className="pt-4 w-full">

            <form action={create} className="flex flex-col gap-y-2">
                <input
                    {...register("name")}
                    placeholder="Anket Ismi"
                    className="px-4 py-2 rounded"
                />
                {errors.name && (
                    <p className="text-red-500">{`${errors.name.message}`}</p>
                )}

                <input
                    {...register("desc")}
                    placeholder="Aciklama"
                    className="px-4 py-2 rounded"
                />

                {errors.desc && (
                    <p className="text-red-500">{`${errors.desc.message}`}</p>
                )}

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
                >
                    Oluştur
                </button>
                {error && (
                    <p className="text-red-500 text-center">{`${error}`}</p>
                )}
            </form>
        </div>
    );
}
