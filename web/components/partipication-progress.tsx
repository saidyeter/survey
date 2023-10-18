//

"use client"

import { Progress } from "./ui/progress"



interface PartipicationProgressProps {
    current: number,
    currentText?: string,
    total: number,
    totalText?: string

}

export function PartipicationProgress({ current, currentText, total, totalText }: PartipicationProgressProps) {
    return (
        <div className="w-full pt-2 pb-2">

            <Progress value={current * 100 / total} className="w-full" />
            <div className="flex justify-between">
                <div>
                    {currentText &&
                        <span className="hidden sm:inline-block">{currentText}&nbsp;:&nbsp;</span>
                    }
                    <span>{current}</span>
                </div>
                <div>
                    {totalText &&
                        <span className="hidden sm:inline-block">{totalText}&nbsp;:&nbsp;</span>
                    }
                    <span>{total}</span>
                </div>
            </div>
        </div>
    )
}
