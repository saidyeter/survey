export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Anket",
  description:
    "Anket uygulamasi",
  mainNav: [
    {
      title: "Anasayfa",
      href: "/",
    },
    {
      title: "Anket",
      href: "/survey",
    },
    {
      title: "Admin",
      href: "/admin",
    },
    {
      title: "Sorular",
      href: "/admin/questions",
    },
    {
      title: "Yeni Soru",
      href: "/admin/new-question",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
