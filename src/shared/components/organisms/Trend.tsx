import { useCurrencyFormat } from '@/shared/hooks/useCurrencyFormat';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useMemo } from 'react';


type TrendType = 'Income' | 'Expenses' | 'Investment' | 'Saving';
type TrendProps = {
  type: TrendType
  amount: number
  prevAmount?: number
}

export default function Trend(
    {type, amount, prevAmount} : TrendProps
){
    const colorClasses = {
        'Income': 'text-green-700 dark:text-green-300',
        'Expenses': 'text-red-500 dark:text-red-400',
        'Investment': 'text-indigo-700 dark:text-indigo-300',
        'Saving': 'text-yellow-700 dark:text-green-300',

    };

    const calcPercentageChange = (amount : number, prevAmount: number) => { 
        if(prevAmount || !amount) return 0;
        return ((amount - prevAmount)/ prevAmount) * 100;
     }

    const formattedCurrency =  useCurrencyFormat(amount); //utilizzo il mio custom hooks!

    const percentageChange = useMemo(()=> calcPercentageChange(amount, prevAmount ?? 0).toFixed(0), [amount, prevAmount]
);


    return (
        <>
            <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
            <div className="text-2xl font-semibold text-black dark:text-white mb-2">{formattedCurrency}</div>
            <div className="flex space-x-1 items-center text-sm">

                <div>
                    {Number(percentageChange) <= 0 && <ArrowDownLeft className="text-red-700 dark:text-red-300" />}
                    {Number(percentageChange) > 0 && <ArrowUpRight className="text-green-700 dark:text-green-300" />}
                    {percentageChange}% vs last period
                </div>
            </div>
        </>
    );
}