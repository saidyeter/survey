import QuestionDetailCardSkeleton from "@/components/question-detail-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="w-full">
            <Skeleton className="w-2/3 h-[20px] rounded-full mb-4" />
            
            <Skeleton className="w-1/2 h-[20px] rounded-full" />

            <br />

            <QuestionDetailCardSkeleton />
            <br />

            <QuestionDetailCardSkeleton />
            <br />
            <QuestionDetailCardSkeleton />
            <br />
            <QuestionDetailCardSkeleton />
            <br />
            <QuestionDetailCardSkeleton />
        </div>
    )
}