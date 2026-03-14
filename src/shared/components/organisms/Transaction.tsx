type TransactionProps = {
    type: string;
    category?: string;
    description: string;
    amount: number;
}

export default function Transaction({type, category, description, amount}: TransactionProps) {
    return(
        <>
            <div className="w-full flex items-center">
                <div className="flex items-center mr-4 grow">{description}</div>
                <div>{amount}</div>
                <div>...</div>
            </div>
        </>
    );
}