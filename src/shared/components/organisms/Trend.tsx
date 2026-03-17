'use client'
import { formatCurrency } from '@/lib/formatCurrency'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'

type TrendType = 'Income' | 'Expense' | 'Investment' | 'Saving'
type TrendProps = {
  type: TrendType
  amount: number
  prevAmount?: number
}

export default function Trend({ type, amount, prevAmount }: TrendProps) {

  const colorClasses: Record<TrendType, string> = {
    'Income': 'text-green-700 dark:text-green-300',
    'Expense': 'text-red-500 dark:text-red-400',
    'Investment': 'text-indigo-700 dark:text-indigo-300',
    'Saving': 'text-yellow-700 dark:text-yellow-300',
  }

  const calcPercentageChange = (amount: number, prevAmount: number) => {
    if (!prevAmount || !amount) return 0
    return ((amount - prevAmount) / prevAmount) * 100
  }  //calcolo variazione %. ((attuale - precedente) / precedente) * 100

  const formattedCurrency = formatCurrency(amount)

  const percentageChange = useMemo(
    () => calcPercentageChange(amount, prevAmount ?? 0).toFixed(0),  //toFixed(0) arrotonda a 0 decimali
    [amount, prevAmount]  //ricalcola solo se cambiano amount o prevAmount
  )

  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>  {/*cambia coloe DINAMICAMENTE!!*/}
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">{formattedCurrency}</div>
      <div className="flex space-x-1 items-center text-sm">
        <div>
          {Number(percentageChange) <= 0 && <ArrowDownLeft className="text-red-700 dark:text-red-300" />}
          {Number(percentageChange) > 0 && <ArrowUpRight className="text-green-700 dark:text-green-300" />}
            {/*renderizza freccia o su o giù, a seconda del valore di percentageChange ( <=0 oppure >0 )  */}
          {percentageChange}% vs last period
        </div>
      </div>
    </div>
  )
}
