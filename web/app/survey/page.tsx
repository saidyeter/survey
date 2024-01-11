import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { getRunningSurvey } from "@/lib/source-api"
import Constants from "@/lib/constants"
import { Label } from "recharts"

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
              Değerli Eczacımız; Eczacının Sesi Ödülleri için oylama sistemine hoş geldiniz.
              Oylamaya başlamadan önce verilen kategoriler ile ilgili başvuru yapan firma/ürün ile ilgili başvuru video/belgesini izleyebilirsiniz. Kategori oylamanızı tamamladıktan sonra bir sonraki kategoriye geçebilirsiniz. Oylamayı yarıda kesme ve sistemden çıkış yapmanız durumunda, tekrar sisteme girerek kaldığınız yerden devam edebilirsiniz.&nbsp;
              <strong>Başvuru tanıtımlarını izlemek için lütfen oylama ekranına giriniz.</strong>
              &nbsp;Katkılarınızdan dolayı teşekkür ederiz...
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
              className={`${buttonVariants({ size: 'lg' })} text-[1.5rem] `}
            >
              Oylamaya katılmak için tıklayınız
            </Link>
            <label> Sorularınız için <a href="mailto:ceren.erol@serenas.com.tr">ceren.erol@serenas.com.tr</a> </label>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  )
}
