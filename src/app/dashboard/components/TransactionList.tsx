'use client'
import Button1 from '@/shared/components/atoms/Button1'
import Separator1 from '@/shared/components/atoms/Separator1'
import TransactionItem from '@/shared/components/organisms/TransactionItem'
import TransactionSummaryItem from '@/shared/components/organisms/TransactionSummaryItem'
import { fetchTransactions } from '@/lib/actions'
import { groupAndSumTransactionsByDate } from '@/lib/utils'
import { useState } from 'react'
import { Loader } from 'lucide-react'

type Transaction = {
  id: number
  type: 'Income' | 'Expense' | 'Saving' | 'Investment'
  category?: string
  description: string
  amount: number
  created_at: string
}  //definisco la struttura di una transaction

export default function TransactionList({ range, initialTransactions }: { range: string; initialTransactions: Transaction[] }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)  //lista completa nel client
  const [buttonHidden, setButtonHidden] = useState(initialTransactions.length === 0)  //mostra/nasconde button Load More
  const [loading, setLoading] = useState(false)   //loading stato
  const grouped = groupAndSumTransactionsByDate(transactions)   //grouping

  const handleClick = async () => {  //login LOAD MORE, sto facendo paginazione
    setLoading(true)
    try {
      const nextTransactions: Transaction[] = await fetchTransactions(range, transactions.length, 10)  //fetcha i prossimi 10
      setButtonHidden(nextTransactions.length === 0)  //se non arrivano nuovi dati -> nascondi il button
      setTransactions(prevTransactions => [
        ...prevTransactions,
        ...nextTransactions
      ])  //sto facendo append, non replace.
    } finally {
      setLoading(false)
    }
  }

  const handleRemoved = (id: number) => () => {  //return a function. rimuove elemento dalla lista.
    setTransactions(prev => [...prev].filter(t => t.id !== id))
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped)
        .map(([date, { transactions, amount }]) =>   //sto iterando { "2026-03-10": {...}, "2026-03-20": {...}, }
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />  {/*mostra totale gironaliero*/}
            <Separator1 />  {/*space hr*/}
            <section className="space-y-4">
              {transactions.map(transaction => <div key={transaction.id}>
                <TransactionItem {...transaction} onRemoved={handleRemoved(transaction.id)} />
              </div>)}
            </section>
          </div>
        )}
      {transactions.length === 0 && <div className="text-center text-gray-400 dark:text-gray-500">No transactions found</div>}
      {!buttonHidden && <div className="flex justify-center">
        <Button1 variant="ghost" onClick={handleClick} disabled={loading}>
          <div className="flex items-center space-x-1">
            {loading && <Loader className="animate-spin" />}
            <div>Load More</div>
          </div>
        </Button1>
      </div>}
    </div>
  )

}
