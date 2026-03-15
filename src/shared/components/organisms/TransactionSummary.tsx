
import { useCurrencyFormat } from "@/shared/hooks/useCurrencyFormat";

type TransactionSummaryProps = Readonly<{
    date: string,
    amount: number
}>

export default function TransactionSummary({date, amount} : TransactionSummaryProps){

    const formattedAmount = useCurrencyFormat(amount);

    return (
        <>
            <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
                <div className="grow">
                    {date}
                </div>
                <div className="min-w-[70px] text-right font-semibold">
                    {formattedAmount}
                </div>
                <div className="min-w-[50px]">

                </div>

            </div>
        </>
    );
}