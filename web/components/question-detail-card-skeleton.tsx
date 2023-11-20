import { Skeleton } from "./ui/skeleton"

export default function QuestionDetailCardSkeleton() {


    return (
        <div className="w-full rounded border p-2">
            <div className="text-lg font-semibold w-full flex justify-between pb-2">
                <div className="w-full" >
                    <Skeleton className="w-full h-8 rounded-full mb-4" />
                    <Skeleton className="w-2/3 h-8 rounded-full" />
                </div>
            </div>
            <div className="w-full flex flex-row">
                <div className="w-2/5 flex items-center justify-center">
                    <Skeleton className="w-48 h-48 rounded-full" />
                </div>
                <div className="w-3/5 p-2 border-t-muted-foreground space-y-2 m-auto">

                    <Skeleton className="w-2/5 h-4 mb-4 rounded-full" />
                    <Skeleton className="w-2/5 h-4 mb-4 rounded-full" />
                    <Skeleton className="w-2/5 h-4 mb-4 rounded-full" />
                    <Skeleton className="w-2/5 h-4 mb-4 rounded-full" />
                    <Skeleton className="w-2/5 h-4 mb-4 rounded-full" />
                </div>
            </div>
        </div>
    )
}
