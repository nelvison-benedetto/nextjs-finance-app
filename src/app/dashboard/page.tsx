import { Suspense } from 'react'
import TransactionListFallback from './components/TransactionListFallback'
import Trend from './components/Trend'
import TrendFallback from './components/TrendFallback'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { sizes, variants } from '@/lib/variants'
import { ErrorBoundary } from 'react-error-boundary'
import { types } from '@/lib/consts'
import Range from './components/Range'
import TransactionListWrapper from './components/TransactionListWrapper'
import { createClient } from '@/lib/supabase/server'

export default async function Page({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const settings = user?.user_metadata ?? {}
  const params = await searchParams
  const range = params?.range ?? settings?.defaultView ?? 'last30days'

  return (<div className="space-y-8">
    <section className="flex justify-between items-center">
      <h1 className="text-4xl font-semibold">Summary</h1>
      <aside>
        <Range defaultView={settings?.defaultView} />
      </aside>
    </section>

    <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {types.map(type => <ErrorBoundary key={type} fallback={<div className="text-red-500">Cannot fetch {type} trend data</div>}>
        <Suspense fallback={<TrendFallback />}>
          <Trend type={type} range={range} />
        </Suspense>
      </ErrorBoundary>)}
    </section>

    <section className="flex justify-between items-center">
      <h2 className="text-2xl">Transactions</h2>
      <Link href="/dashboard/transaction/add" className={`flex items-center space-x-1 ${variants['outline']} ${sizes['sm']}`}>
        <PlusCircle className="w-4 h-4" />
        <div>Add</div>
      </Link>
    </section>

    <Suspense fallback={<TransactionListFallback />}>
      <TransactionListWrapper range={range} />
    </Suspense>
  </div>)
}
