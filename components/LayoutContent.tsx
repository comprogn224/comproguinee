"use client"

import { usePathname } from "next/navigation"
/*import { Navbar } from "@/components/navbar"*/
import { Footer } from "@/components/footer"
import { SimpleAuthCheck } from "@/components/SimpleAuthCheck"

interface LayoutContentProps {
  children: React.ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/inscription' || pathname === '/login'

  return (
    <SimpleAuthCheck>
      {!isAuthPage && <Navbar />}
      <main>{children}</main>
      {!isAuthPage && <Footer />}
    </SimpleAuthCheck>
  )
}
