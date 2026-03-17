type Transaction = {
  id: number
  type: 'Income' | 'Expense' | 'Saving' | 'Investment'
  category?: string
  description: string
  amount: number
  created_at: string
} //rappresenta una singola transazione finanziaria

type GroupedTransactions = Record<string, { transactions: Transaction[]; amount: number }>
//rappresenta un gruppo di transazioni raggruppate per data
/*
{
  "2024-01-01": {
    transactions: [...],
    amount: 100
  },
  "2024-01-02": {
    transactions: [...],
    amount: 50
  }
} la key èla date, trasactions lista di transazioni di quel giorno, amount somma totale del giorno
*/

export const groupAndSumTransactionsByDate = (transactions: Transaction[]): GroupedTransactions => {
  //prende una lista di transazioni di type Transaction[] e return type GroupedTransactions

  const grouped: GroupedTransactions = {}; // new obj vuoto
  for (const transaction of transactions) {
    const date = transaction.created_at.split('T')[0]  //se hai "2024-01-01T10:30:00" diventa "2024-01-01"
    if (!grouped[date]) {  //se la date non esiste...
      grouped[date] = { transactions: [], amount: 0 }  //inizializza
    }
    grouped[date].transactions.push(transaction)  //metti la transazione nella lista per quel giorno
    const amount = transaction.type === 'Expense' ? -transaction.amount : transaction.amount
    grouped[date].amount += amount  //aggiorni il totale della giornata
  }
  return grouped
}
