import { getSurveyQuestions } from "@/actions/survey";
import GoBack from "@/components/go-back";
import QuestionAnswerForm from "@/components/question-answer-form";
import { redirect } from "next/navigation";

export default async function SurveyQuestions() {
  const response = await getSurveyQuestions()

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