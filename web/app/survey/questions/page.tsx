import { getSurveyQuestions } from "@/actions/survey";
import GoBack from "@/components/go-back";
import QuestionAnswerForm from "@/components/question-answer-form";

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

  return (
    <QuestionAnswerForm survey={response.data.survey} />
  );
}