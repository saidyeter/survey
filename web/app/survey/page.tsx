import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { getRunningSurvey } from "@/lib/source-api"
import Constants from "@/lib/constants"

export default async function Survey() {
  const survey = await getRunningSurvey()

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">

        {survey ? (
          <>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              {survey.survey.name}
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              {survey.survey.description}
            </p>
          </>

        ) : (
          <>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Eczacının Sesi Ödül Töreni
            </h1>
          </>
        )}
      </div>
      <div className="flex gap-4">
        {survey ? (
          <div className="flex flex-col space-y-4">
            <Link
              href='/survey/start'
              className={buttonVariants()}
            >
              Oylamaya katılmak için tıklayınız.
            </Link>
            <Link
              href={Constants.SurveyInfoUrl}
              className={buttonVariants({ variant: 'secondary' })}
              target="_blank"
            >
              Başvuruları izlemek için tıklayınız.
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  )
}
