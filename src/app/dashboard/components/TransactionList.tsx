import TransactionItem from "@/shared/components/organisms/TransactionItem";

export default async function TransactionList() {

    const response = await fetch('/api/transactions');
    const transactions = await response.json();

    return (
        <>
            <section className="space-y-4">
                {transactions.map((transaction: any) => (
                    <div key={transaction.id}>
                        <TransactionItem type={transaction.type} category={transaction.category} description={transaction.description} amount={transaction.amount} />
                    </div>
                ))}
            </section>
        </>
    );
}