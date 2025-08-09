"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface SimpleAuthCheckProps {
  children: React.ReactNode
}

export function SimpleAuthCheck({ children }: SimpleAuthCheckProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      // Ne pas protéger la page d'inscription
      if (pathname === '/inscription') {
        setIsChecking(false)
        return
      }

      try {
        // Vérifier d'abord le localStorage
        const savedUser = localStorage.getItem('compro_user')
        
        if (savedUser) {
          // Utilisateur trouvé dans localStorage
          setIsAuthenticated(true)
          setIsChecking(false)
          return
        }

        // Vérifier s'il y a des utilisateurs dans la base
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth.php`
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const result = await response.json()
          
          // S'il n'y a pas d'utilisateurs ou si l'utilisateur n'est pas authentifié
          if (result.first_visit || !savedUser) {
            router.push('/login')
            return
          }
        } else {
          // En cas d'erreur API, rediriger vers inscription
          router.push('/inscription')
          return
        }

      } catch (error) {
        console.error('Erreur lors de la vérification d\'authentification:', error)
        // En cas d'erreur, rediriger vers inscription
        router.push('/inscription')
        return
      }

      setIsChecking(false)
    }

    checkAuth()
  }, [pathname, router])

  // Écran de chargement
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">Com'Pro Guinée</h2>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // Si sur la page d'inscription, afficher directement
  if (pathname === '/inscription') {
    return <>{children}</>
  }

  // Si authentifié ou pas de vérification nécessaire, afficher le contenu
  return <>{children}</>
}
