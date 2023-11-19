interface RootLayoutProps {
  children: React.ReactNode
}

import { SiteHeader } from "@/components/site-header"
import { BreadCrumb } from "@/components/breadcrumb"

export default function RootLayout({ children }: RootLayoutProps) {
  return (

    <div className="container flex min-h-screen flex-col">
      <SiteHeader />
      <BreadCrumb />
      <section className="flex-1 container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex flex-col items-start gap-2">
          {children}
        </div>
      </section>
    </div>
  )
}
