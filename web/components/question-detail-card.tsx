"use client"
import { TQuestionDetailSchema } from "@/lib/types"
import { Button } from "./ui/button"
import { copySingle } from "@/actions/question"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "./ui/avatar"

interface QuestionDetailCardProps {
    questionDetail: TQuestionDetailSchema,
    showCopy?: boolean
}

export default function QuestionDetailCard(params: QuestionDetailCardProps) {
    const { question, answeredCount, answerDetails } = params.questionDetail

    const data = answerDetails.map(a => {
        return {
            name: a.label,
            total: a.choosenCount
        }
    })

    return (
        <div className="w-full rounded border p-2 mb-4">
            <div className="text-lg font-semibold w-full flex justify-between pb-2">
                <div className="w-full" >
                    <span className="text-sm text-muted-foreground font-normal pr-2">
                        {question.orderNumber} :
                    </span>
                    <span>
                        {question.text}
                    </span>
                    <br />
                    <span className="text-muted-foreground font-normal pr-2">
                        Cevaplama sayisi : {answeredCount}
                    </span>
                </div>
                {params.showCopy &&
                    <Button variant='outline' onClick={() => { copySingle(question.id) }}>Aktif Ankete Kopyala</Button>
                }
            </div>
            <div className="w-full flex flex-row">
                <div className="w-2/5">
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart >
                            <Pie
                                label={(d) => d.name + ': ' + d.value}
                                data={data}
                                dataKey="total"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                onClick={(d) => {
                                    console.log(d);

                                }}
                            >
                                {
                                    data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`#${colors[index]}`} />
                                    ))
                                }
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-3/5 p-2 border-t-muted-foreground space-y-2 m-auto">
                    {answerDetails.map((ad, i) => {
                        return (
                            <div key={i} className="flex items-center">
                                <p className="text-sm text-muted-foreground">{ad.label}:&nbsp;</p>
                                <p className="text-sm font-medium leading-none"> {ad.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const colors = [
    '860A35',
    '7752FE',
    '22092C',
    'F4CE14',
    '001B79',
    'ED7D31',
    '363062',
    '164863',
    '3A4D39',
    '0C356A',
    'CE5A67',
    '26577C',
    'E55604',
    '61A3BA',
    'D2DE32',
    'A2C579',
    'A9A9A9',
    'FECDA6',
    'FF9130',
    'FF5B22',
]