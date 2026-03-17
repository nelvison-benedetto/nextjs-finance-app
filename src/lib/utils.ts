type Transaction = {
  id: number
  type: 'Income' | 'Expense' | 'Saving' | 'Investment'
  category?: string
  description: string
  amount: number
  created_at: string
}

type GroupedTransactions = Record<string, { transactions: Transaction[]; amount: number }>

export const groupAndSumTransactionsByDate = (transactions: Transaction[]): GroupedTransactions => {
  const grouped: GroupedTransactions = {}
  for (const transaction of transactions) {
    const date = transaction.created_at.split('T')[0]
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 }
    }
    grouped[date].transactions.push(transaction)
    const amount = transaction.type === 'Expense' ? -transaction.amount : transaction.amount
    grouped[date].amount += amount
  }
  return grouped
}
