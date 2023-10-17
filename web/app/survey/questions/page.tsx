"use client";

import { Button } from "@/components/ui/button";
import { TQuestionsResponseSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function SurveyQuestions() {
    const [data, setData] = useState({} as TQuestionsResponseSchema)
    const r = useRouter();

    useEffect(() => {
        fetch('/api/get-questions')
            .then(d => {
                if (d.status == 401) {
                    r.push('/survey')
                    return []
                }
                return d.json()
            })
            .then(d => {
                setData(d)
            })
    }, [])

    if (!data?.survey) {
        return <>loading</>
    }

    const labelclassname = ''
    const inputclassname = ''
    return (
        <div className="pt-4 w-full">
            <form action='/api/submit-answers' method="POST" >
                {data.survey.map(d =>
                    <div key={d.question.id} className="p-2" >
                        <p className="text-xl leading-tight tracking-tighter md:text-lg">
                            {d.question.text}
                            </p>
                        {d.answers.map(ans=>{
                            return(
                                <div>
                                     <label>
                                        <input type="radio" name={`${d.question.id}`} value={ans.id} />
                                        {ans.label} : {ans.text}
                                        </label>
                                </div>
                            )
                        })}
                      
                    </div>
                )}
                <Button>Bitir</Button>
            </form>
        </div>
    );
}