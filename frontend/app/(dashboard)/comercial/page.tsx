import dynamic from 'next/dynamic'

const Comercial = dynamic(() => import('@/pages/Comercial'), {
  ssr: false,
  loading: () => <div>Carregando dashboard comercial...</div>
})

export default function ComercialPage() {
  return <Comercial />
}
