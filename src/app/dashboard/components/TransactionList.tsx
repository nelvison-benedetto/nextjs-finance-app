import TransactionItem from "@/shared/components/organisms/TransactionItem";
import TransactionSummary from "@/shared/components/organisms/TransactionSummary";

const groupAndSumTransactionsByDate = (transactions: any[]) => {
    const grouped: Record<string, { transactions: any[]; amount: number }> = {};
    for (const transaction of transactions){
        const date = transaction.created_at.split('T')[0];
        if(!grouped[date]){
            grouped[date] = {transactions: [], amount: 0}
        }
        grouped[date].transactions.push(transaction);
        const amount = transaction.type === 'Expenses' ? -transaction.amount : transaction.amount;
        grouped[date].amount += amount;
    }
    return grouped;
};


export default async function TransactionList() {

    const response = await fetch('/api/transactions');
    const transactions = await response.json();
    const grouped = groupAndSumTransactionsByDate(transactions);

    return (
        <>
            {Object.entries(grouped).map(([date, {transactions, amount}]) => (
                <div key={date}>
                    <TransactionSummary date={date} amount={amount}/>
                    <hr className="my-4 border-gray-200 dark:border-gray-800" />
                    <section className="space-y-4">
                        {transactions.map((transaction: any) => (
                            <div key={transaction.id}>
                                <TransactionItem {...transaction} />
                            </div>
                        ))}
                    </section>
                </div>
            ))}
        </>
    );
}
