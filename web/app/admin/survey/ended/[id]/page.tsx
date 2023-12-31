import { finish } from "@/actions/survey"
import GoBack from "@/components/go-back"
import { PartipicationProgress } from "@/components/partipication-progress"
import QuestionDetailCard from "@/components/question-detail-card"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { checkPreSurveyExists, getSurveyDetails } from "@/lib/source-api"
import { getLocaleDate } from "@/lib/utils"
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
export default async function SurveyDetails({ params }: { params: { id: string } }) {


  const surveyId = parseInt(params.id)

  if (surveyId.toString() != params.id) {
    return <GoBack
      title="Yanlis Anket"
      desc=""
      link="/admin"
    />
  }
  const delayTask = delay(2000);
  const fetchTask = getSurveyDetails(surveyId)
  const [_, b] = await Promise.allSettled([delayTask, fetchTask])

  if (b.status == 'rejected') {
    return <GoBack
      title="Anket raporu hazir degil"
      desc=""
      link="/admin"
    />
  }

  const details = b.value

  if (!details) {
    return <GoBack
      title="Anket raporu hazir degil"
      desc=""
      link="/admin"
    />
  }
  const { questionDetails, survey } = details

  const preSurvey = await checkPreSurveyExists()

  return (
    <div className="w-full">

      <Card className="flex mb-8">
        <div className="w-1/2">
          <CardHeader>
            <CardTitle>
              {survey.name}
            </CardTitle>
            <CardDescription>
              {`${getLocaleDate(survey.startDate!)} - ${getLocaleDate(survey.endDate!)}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {survey.description &&
              <p>{survey.description}</p>
            }
          </CardContent>
          <CardFooter>
          </CardFooter>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <PartipicationProgress
            current={details.participationCount}
            total={details.allParticipantCount}
          />
        </div>
      </Card>



      {questionDetails.map(qd => {
        return (
          <QuestionDetailCard
            showCopy={preSurvey?.exists}
            key={qd.question.id}
            questionDetail={qd}
          />
        )
      })}
    </div>
  )
}