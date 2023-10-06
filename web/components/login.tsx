"use client"

import * as React from "react"
import { LogIn } from 'lucide-react';
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button"

export function LogInButton() {
  const session = useSession()
  if (session.status != "unauthenticated") {
    return <></>
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => signIn()}
    >
      <LogIn />
      <span className="sr-only">Login</span>
    </Button>
  )
}
