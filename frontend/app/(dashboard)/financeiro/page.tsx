import dynamic from 'next/dynamic'

const Financeiro = dynamic(() => import('@/pages/Financeiro'), {
  ssr: false,
  loading: () => <div>Carregando dashboard financeiro...</div>
})

export default function FinanceiroPage() {
  return <Financeiro />
}
