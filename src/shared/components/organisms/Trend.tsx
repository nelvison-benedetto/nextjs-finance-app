type TrendProps = {
  type: string
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
        if(prevAmount === 0) return 0;
        return ((amount - prevAmount)/ prevAmount) * 100;
     }
     const formatCurrency = (amount:number) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'EUR'}).format(amount);
      
    const percentageChange = useMemo(()=> calcPercentageChange(amount, prevAmount), [amount, prevAmount]
);


    return (
        <>
            <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
            <div className="text-2xl font-semibold text-black dark:text-white mb-2">{amount ? formatCurrency(amount) : formatCurrency(0)}</div>
            <div>
                {percentageChange}% vs last period
            </div>
        </>
    );
}