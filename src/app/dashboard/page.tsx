import Trend from "./components/Trend";
import TransactionList from "./components/TransactionList";
import TransactionListFallback from "./components/TransactionListFallback";
import TrendFallback from "./components/TrendFallback";
import { Suspense } from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Page(){
    return (
        <>
            <section className="mb-8">
                <h1 className="text-4xl font-semibold">Summary</h1>
            </section>

            <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
                <Suspense fallback={<TrendFallback />}>
                    <Trend type="Income"/>
                </Suspense>
                <Suspense fallback={<TrendFallback />}>
                    <Trend type="Expenses"/>
                </Suspense>
                <Suspense fallback={<TrendFallback />}>
                    <Trend type="Investment"/>
                </Suspense>
                <Suspense fallback={<TrendFallback />}>
                    <Trend type="Saving"/>
                </Suspense>
            </section>
        
            <section className="flex justify-between items-center mb-8">
                <h2 className="text-2xl">Transactions</h2>
                <Link href="/dashboard/transaction/add" className={`flex items-center space-x-1`}>
                    <PlusCircle className="w-4 h-4"/>
                </Link>
            </section>

            <Suspense fallback={<TransactionListFallback />}>
                <TransactionList/>
            </Suspense>
        </>
    );
}