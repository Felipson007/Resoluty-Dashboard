import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar se o usuário está autenticado
  const token = request.cookies.get('auth-token')
  
  // Rotas que requerem autenticação
  const protectedRoutes = ['/dashboard', '/comercial', '/financeiro', '/gestao', '/customer-success', '/administrativo']
  
  // Se estiver tentando acessar uma rota protegida sem token
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Se estiver logado e tentando acessar login, redirecionar para dashboard
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
