"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading, checkFirstVisit } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Ne pas protéger la page d'inscription
      if (pathname === '/login') {
        setIsChecking(false)
        return
      }

      try {
        // Attendre que le hook useAuth termine son initialisation
        if (isLoading) {
          return
        }

        // Vérifier s'il s'agit de la première visite
        const { firstVisit } = await checkFirstVisit()
        
        // Si première visite ou utilisateur non authentifié, marquer pour redirection
        if (firstVisit || !isAuthenticated) {
          setShouldRedirect(true)
          setIsChecking(false)
          return
        }

        setIsChecking(false)
      } catch (error) {
        console.error('Erreur lors de la vérification d\'authentification:', error)
        // En cas d'erreur, marquer pour redirection par sécurité
        setShouldRedirect(true)
        setIsChecking(false)
      }
    }

    checkAuthStatus()
  }, [isAuthenticated, isLoading, pathname, checkFirstVisit])

  // Effectuer la redirection dans un useEffect séparé
  useEffect(() => {
    if (shouldRedirect && pathname !== '/inscription') {
      router.push('/inscription')
    }
  }, [shouldRedirect, pathname, router])

  // Afficher un écran de chargement pendant la vérification
  if (isChecking || isLoading) {
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

  // Si authentifié, afficher le contenu
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Par défaut, ne rien afficher (redirection en cours)
  return null
}
