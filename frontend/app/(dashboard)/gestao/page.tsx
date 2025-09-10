import dynamic from 'next/dynamic'

const Gestao = dynamic(() => import('@/pages/Gestao'), {
  ssr: false,
  loading: () => <div>Carregando dashboard de gestão...</div>
})

export default function GestaoPage() {
  return <Gestao />
}
