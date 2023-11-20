import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { getRunningSurvey } from "@/lib/source-api"

export default async function Survey() {
  const survey = await getRunningSurvey()

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">

        {survey ? (
          <>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              {survey.name}
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              {survey.description}
            </p>
          </>

        ) : (
          <>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Eczacı anketine hoşgeldiniz.
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Şu an aktif bir anket bulunmamaktadır.<br className="hidden sm:inline" />
              Anket açıldığı zaman size bildirilecektir.
            </p>

          </>

        )}
      </div>
      <div className="flex gap-4">
        {survey ? (
          <Link
            href='/survey/start'
            className={buttonVariants()}
          >
            Ankete Başla
          </Link>
        ) : (
          <>

            <Link
              href={siteConfig.links.mail}
              className={buttonVariants()}
            >
              E-Posta ile Ulaş
            </Link>
            <Link
              href={siteConfig.links.phone}
              className={buttonVariants({ variant: "outline" })}
            >
              Telefon ile Ulaş
            </Link></>

        )}


      </div>
    </section>
  )
}
