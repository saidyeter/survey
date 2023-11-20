'use client'
import { useSession } from 'next-auth/react'
import { redirect } from "next/navigation";

export default function IndexPage() {
  const user = useSession()
  if (user.status == 'authenticated') {
    redirect('/admin')
  }
  else {
    redirect('/survey')
  }
}
