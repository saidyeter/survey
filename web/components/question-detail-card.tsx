"use client"
import { TQuestionDetailSchema } from "@/lib/types"
import { Button } from "./ui/button"
import { copySingle } from "@/actions/question"

interface QuestionDetailCardProps {
    questionDetail: TQuestionDetailSchema,
    showCopy?: boolean
}

export default function QuestionDetailCard(params: QuestionDetailCardProps) {
    const { question, answeredCount, answerDetails } = params.questionDetail
    return (
        <div key={question.id} className="w-full pt-2 pb-2 border-t-muted-foreground border-t-2">
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

            {answerDetails.map((ad, i) => {
                return (
                    <div key={i}>
                        <span className="pr-2">
                            {ad.label} :  {ad.text}
                        </span>
                        <span className="font-bold">
                            {ad.choosenCount}
                        </span>
                    </div>

                )
            })}
        </div>
    )
}