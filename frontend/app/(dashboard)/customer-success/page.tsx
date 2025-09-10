import dynamic from 'next/dynamic'

const CustomerSuccess = dynamic(() => import('@/pages/CustomerSuccess'), {
  ssr: false,
  loading: () => <div>Carregando customer success...</div>
})

export default function CustomerSuccessPage() {
  return <CustomerSuccess />
}
