"use client"

import { TQnASchema } from "@/lib/types"
import QuestionCard from "./question-card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface QuestionsAccordionProps {
    QnAs: TQnASchema[]
}

export default function QuestionsAccordion(params: QuestionsAccordionProps) {
    return (
        <Accordion type="single" collapsible>
            <div>
                {params.QnAs.sort((a,b)=> a.question.orderNumber - b.question.orderNumber).map(q => {
                    return (
                        <AccordionItem key={q.question.id} value={q.question.id.toString()}>
                            <AccordionTrigger>Soru {q.question.orderNumber}: {q.question.text}</AccordionTrigger>
                            <AccordionContent>
                                <QuestionCard {...q} />
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </div>
        </Accordion>
    )
}