"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, User } from 'lucide-react'
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Nos services", href: "/nos-services" },
    { name: "Nos réalisations", href: "/nos-realisations" },
    { name: "Témoignages", href: "/testimonages" },
    { name: "Contact", href: "/contact" },
  ]

  const handleLogout = () => {
    logout()
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    })
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 border-2 border-red-600 bg-white rounded-lg flex items-center justify-center">
              <img src="/comProGuinee.jpeg" alt="Logo Com'Pro Guinée" />
            </div>
            <span className="text-xl font-bold text-gray-900">Com'Pro Guinée</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  `transition-colors ${
                    pathname === item.href
                      ? "text-red-600 font-bold"
                      : "text-gray-700 hover:text-red-600"
                  }`
                }
              >
                {item.name}
              </Link>
            ))}
            
            {/* User info and logout button */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{user.nom}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    `transition-colors ${
                      pathname === item.href
                        ? "text-red-600 font-bold"
                        : "text-gray-700 hover:text-red-600"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile user info and logout */}
              {isAuthenticated && user && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <User className="h-4 w-4" />
                    <span>Connecté en tant que: {user.nom}</span>
                  </div>
                  <Button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-50 w-fit"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
