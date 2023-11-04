import { getSurveyQuestions } from "@/actions/survey";
import QuestionAnswerForm from "@/components/question-answer-form";

export default async function SurveyQuestions() {
    const response = await getSurveyQuestions()

    if (!response.success) {
        return (
            <span>sorun var</span>
        )
    }
    if (!response.data) {
        return (
            <span>sorun var</span>
        )
    }

    return (
        <QuestionAnswerForm survey={response.data.survey} />
    );
}