import BaseTrend from '@/shared/components/organisms/Trend'
import { createClient } from '@/lib/supabase/server'

export default async function Trend({ type, range }: { type: string; range: string }) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .rpc('calculate_total', {
      range_arg: range,
      type_arg: type
    })
  if (error) throw new Error('Could not fetch the trend data')

  const amounts = data[0]

  return <BaseTrend type={type as 'Income' | 'Expense' | 'Saving' | 'Investment'} amount={amounts.current_amount} prevAmount={amounts.previous_amount} />
}
