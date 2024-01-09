import { getSurveyQuestions } from "@/actions/survey";
import GoBack from "@/components/go-back";
import QuestionAnswerForm from "@/components/question-answer-form";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

export default async function SurveyQuestions() {
  const cookieStore = cookies()
  const ticket = cookieStore.get('ticket')
  if (!ticket?.value) {
    return <GoBack
      title="Aktif anket yok"
      desc=""
      link="/"
    />
  }

  const response = await getSurveyQuestions(ticket?.value)

  if (!response.success) {
    return <GoBack
      title="Aktif anket yok"
      desc=""
      link="/"
    />
  }
  if (!response.data) {
    return <GoBack
      title="Aktif anket yok"
      desc=""
      link="/"
    />
  }
  if (response.data.survey.length == response.data.alreadyRespondedAnswers.length) {
    redirect('/survey/completed')
  }

  return (
    <QuestionAnswerForm {...response.data} />
  );
}