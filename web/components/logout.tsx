"use client"

import * as React from "react"
import { LogOut } from 'lucide-react';
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const session = useSession()
  if (session.status == "unauthenticated") {
    return <></>
  }
  return (
    <Button
      variant="ghost"
      // size="icon"
      onClick={() => signOut()}
    >
      <span>{session.data?.user?.name}</span>
      &nbsp;
      <LogOut />
      <span className="sr-only">Log out</span>
    </Button>
  )
}
