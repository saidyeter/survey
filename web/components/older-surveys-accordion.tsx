"use client"

import { TGetSurveysResponseSchema } from "@/lib/types"
import OlderSurveyCard from "./older-survey-card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function OlderSurveysAccordion(params: TGetSurveysResponseSchema) {
  const { surveys } = params
  if (surveys.length == 0) {
    return <span>Eski anket bulunamadi</span>
  }

  return (
    <div className="rounded-md border p-2">
      <Accordion type="single" collapsible>
        {surveys.map(s => {
          return (
            <AccordionItem value={`${s.id}`} key={`${s.id}`}>
              <AccordionTrigger>{s.name}</AccordionTrigger>
              <AccordionContent>
                <OlderSurveyCard key={s.id} {...s} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}