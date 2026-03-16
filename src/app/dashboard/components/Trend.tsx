import BaseTrend from "@/shared/components/organisms/Trend";

type TrendType = "Income" | "Expenses" | "Investment" | "Saving";

export default async function Trend({ type }: { type: TrendType }) {
    const response = await fetch(`http://localhost:3100/trends/${type}`);
    const {amount, prevAmount} = await response.json();
    return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />
}