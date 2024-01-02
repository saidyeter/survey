"use client"
import { TQuestionDetailSchema } from "@/lib/types"
import { Button, buttonVariants } from "./ui/button"
import { copySingle } from "@/actions/question"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"
import AnswerContent from "./answer-content"
import Link from "next/link"
import { Label } from "./ui/label"
import { useRouter } from "next/navigation"

interface QuestionDetailCardProps {
  questionDetail: TQuestionDetailSchema,
  showCopy?: boolean
}

export default function QuestionDetailCard(params: QuestionDetailCardProps) {
  const { question, answeredCount, answerDetails } = params.questionDetail

  const data = answerDetails.map(a => {
    return {
      id: a.id,
      name: a.label,
      total: a.choosenCount
    }
  })
  const router = useRouter()

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

          <div className="flex flex-col mt-2 space-y-2">

            <Label>
              Cevaplama sayısı : {answeredCount}
            </Label>
            <Label>
              Bu soruya cevap verenleri görmek için&nbsp;<Link href={`/admin/report/question?id=${question.id}`} className='underline'>tıklayınız</Link>
            </Label>
          </div>

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
                data={data.filter(d => d.total > 0)}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`}
                      onClick={() => {
                        router.push(`/admin/report/answer?id=${entry.id}`)
                      }}
                      className="cursor-pointer"
                      fill={`#${colors[index]}`} />
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
              <Link key={i} className="flex items-center hover:bg-muted" href={`/admin/report/answer?id=${ad.id}`}>
                <p className="text-sm text-muted-foreground">{ad.label}:&nbsp;</p>
                <p className="text-sm font-medium leading-none"> <AnswerContent noNewLine content={ad.text} /></p>
              </Link>
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