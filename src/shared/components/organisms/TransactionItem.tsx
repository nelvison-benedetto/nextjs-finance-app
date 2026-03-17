import { formatCurrency } from "@/lib/formatCurrency";
import { HandCoins, Wallet, Landmark, PiggyBank } from "lucide-react";
import type { ElementType } from "react";

type TransactionType = "Income" | "Expenses" | "Saving" | "Investment";

type TransactionProps = {
    type: TransactionType;
    category?: string;
    description: string;
    amount: number;
}

const typesMap: Record<
  TransactionType,
  { icon: ElementType; colors: string }
> = {
  Income: {
    icon: HandCoins,
    colors: "text-green-500 dark:text-green-400",
  },
  Expenses: {
    icon: Wallet,
    colors: "text-red-500 dark:text-red-400",
  },
  Saving: {
    icon: Landmark,
    colors: "text-indigo-500 dark:text-indigo-400",
  },
  Investment: {
    icon: PiggyBank,
    colors: "text-yellow-500 dark:text-yellow-400",
  },
}

export default function TransactionItem({type, category, description, amount}: TransactionProps) {

    const IconComponent = typesMap[type].icon
    const colors = typesMap[type].colors

    const formattedAmount = formatCurrency(amount)

    return(
        <>
            <div className="w-full flex items-center">

                <div className="flex items-center mr-4 grow">
                    <IconComponent size={20} className={`${colors} mr-2 w-4 h-4 hidden sm:block`} />
                    <span>{description}</span>
                </div>

                <div className="min-w-[150px] items-center hidden md:flex">
                    {category && <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">{category}</div>}
                </div>

                <div className="min-w-[70px] text-right">{formattedAmount}</div>

                <div className="min-w-[100px] flex justify-end">
                  <Link href={`/dashboard/transaction/${id}/edit`} className={`${variants['ghost']} ${sizes['xs']}`}>
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <TransactionItemRemoveButton id={id} onRemoved={onRemoved} />
                </div>

            </div>
        </>
    );
}