import Trend from "./components/Trend";
import TransactionList from "./components/TransactionList";
import TransactionListFallback from "./components/TRansactionListFallback";
import { Suspense } from "react";

export default function Page(){
    return (
        <>
            <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
                <Suspense>
                    <Trend type="Income"/>
                </Suspense>
                <Suspense>
                    <Trend type="Expenses"/>
                </Suspense>
                <Suspense>
                    <Trend type="Investment"/>
                </Suspense>
                <Suspense>
                    <Trend type="Saving"/>
                </Suspense>
            </section>
        
            <Suspense fallback={<TransactionListFallback />}>
                <TransactionList/>
            </Suspense>
        </>
    );
}