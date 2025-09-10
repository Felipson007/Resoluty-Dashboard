import dynamic from 'next/dynamic'

const Administrativo = dynamic(() => import('@/pages/Administrativo'), {
  ssr: false,
  loading: () => <div>Carregando administrativo...</div>
})

export default function AdministrativoPage() {
  return <Administrativo />
}
