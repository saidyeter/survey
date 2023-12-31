
import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogoutButton } from "./logout"
import Link from "next/link"
import { Users } from "lucide-react"


export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          <Link href="/admin/participant" className="flex items-center space-x-2">
            <Users size='1rem' />
            <span className="inline-block">Katılımcılar</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <LogoutButton />
          </nav>
        </div>
      </div>
    </header>
  )
}
