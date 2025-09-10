import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/components/Login'), {
  ssr: false,
  loading: () => <div>Carregando login...</div>
})

export default function LoginPage() {
  return <Login />
}
