import TransactionList from "./components/TransactionList";
import TransactionListFallback from "./components/TRansactionListFallback";
import { Suspense } from "react";

export default function Page(){
    return (
        <>
            <Suspense fallback={<TransactionListFallback />}>
                <TransactionList/>
            </Suspense>
        </>
    );
}