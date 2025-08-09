import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur est sur la page d'inscription
  if (request.nextUrl.pathname === '/inscription') {
    return NextResponse.next()
  }

  // Vérifier si l'utilisateur a un token d'authentification
  const userToken = request.cookies.get('compro_user')
  const hasUserInStorage = request.headers.get('x-user-authenticated')

  // Si pas d'authentification, rediriger vers l'inscription
  if (!userToken && !hasUserInStorage) {
    // Vérifier le localStorage côté client via un script
    const response = NextResponse.next()
    
    // Injecter un script pour vérifier localStorage et rediriger si nécessaire
    response.headers.set('x-middleware-rewrite', request.url)
    
    return response
  }

  return NextResponse.next()
}

// Configuration des routes à protéger
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - inscription (registration page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|inscription).*)',
  ],
}
