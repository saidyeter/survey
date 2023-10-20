import NewQuestionForm from "@/components/new-question-form";

export default function NewQuestion({ params }: { params: { id: number } }) {

    return (
        <div className="w-full">
            <span>New Question for survey id {params.id}</span>
            <NewQuestionForm surveyid={params.id} order={21} />

        </div>
    )
}