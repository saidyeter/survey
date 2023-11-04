import { NavItem } from "@/types/nav"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Anket",
  description:
    "Anket uygulamasi",
  mainNav: [
    {
      title: "Admin",
      href: "/admin",
    },
    {
      title: "Tamamlanmis Anketler",
      href: "/admin/survey/ended",
    }
  ] as NavItem[],
  links: {
    mail: "mailto:said@yeter.com",
    phone:"tel:905551112233"
  },
}
