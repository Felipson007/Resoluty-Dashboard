import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirecionar para dashboard por padrão
  redirect('/dashboard')
}
