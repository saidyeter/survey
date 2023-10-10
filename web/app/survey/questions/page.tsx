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

    if (!data?.questions) {
        return <>loading</>
    }
    const labelclassname = ''
    const inputclassname = ''
    return (
        <div className="pt-4 w-full">
            <form action='/api/submit-answers' method="POST" >
                {data.questions.map(d =>
                    <div key={d.id} className="p-2" >
                        <p className="text-xl leading-tight tracking-tighter md:text-l">{d.text}</p>
                        <label>A: {d.a} <input type="radio" name={`${d.id}`} value='A' /></label>
                        <label>B: {d.b} <input type="radio" name={`${d.id}`} value='B' /></label>
                        {d.c && <label>C: {d.c} <input type="radio" name={`${d.id}`} value='C' /></label>}
                        {d.d && <label>d: {d.d} <input type="radio" name={`${d.id}`} value='D' /></label>}
                        {d.e && <label>e: {d.e} <input type="radio" name={`${d.id}`} value='E' /></label>}
                        {d.f && <label>f: {d.f} <input type="radio" name={`${d.id}`} value='F' /></label>}
                        {d.g && <label>g: {d.g} <input type="radio" name={`${d.id}`} value='G' /></label>}
                        {d.h && <label>h: {d.h} <input type="radio" name={`${d.id}`} value='H' /></label>}
                        {d.i && <label>i: {d.i} <input type="radio" name={`${d.id}`} value='I' /></label>}
                        {d.j && <label>j: {d.j} <input type="radio" name={`${d.id}`} value='J' /></label>}
                        {d.k && <label>k: {d.k} <input type="radio" name={`${d.id}`} value='K' /></label>}
                        {d.l && <label>l: {d.l} <input type="radio" name={`${d.id}`} value='L' /></label>}
                        {d.m && <label>m: {d.m} <input type="radio" name={`${d.id}`} value='M' /></label>}
                        {d.n && <label>n: {d.n} <input type="radio" name={`${d.id}`} value='N' /></label>}
                        {d.o && <label>o: {d.o} <input type="radio" name={`${d.id}`} value='O' /></label>}
                        {d.p && <label>p: {d.p} <input type="radio" name={`${d.id}`} value='P' /></label>}
                        {d.q && <label>q: {d.q} <input type="radio" name={`${d.id}`} value='Q' /></label>}
                        {d.r && <label>r: {d.r} <input type="radio" name={`${d.id}`} value='R' /></label>}
                        {d.s && <label>s: {d.s} <input type="radio" name={`${d.id}`} value='S' /></label>}
                        {d.t && <label>t: {d.t} <input type="radio" name={`${d.id}`} value='T' /></label>}
                        {d.u && <label>u: {d.u} <input type="radio" name={`${d.id}`} value='U' /></label>}
                        {d.w && <label>w: {d.w} <input type="radio" name={`${d.id}`} value='W' /></label>}
                        {d.v && <label>v: {d.v} <input type="radio" name={`${d.id}`} value='V' /></label>}
                        {d.x && <label>x: {d.x} <input type="radio" name={`${d.id}`} value='X' /></label>}
                        {d.y && <label>y: {d.y} <input type="radio" name={`${d.id}`} value='Y' /></label>}
                        {d.z && <label>z: {d.z} <input type="radio" name={`${d.id}`} value='Z' /></label>}
                    </div>
                )}
                <Button>Bitir</Button>
            </form>
        </div>
    );
}