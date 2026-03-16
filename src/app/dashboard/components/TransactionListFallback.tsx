import Skeleton from "@/shared/components/atoms/Skeleton";

function TransactionGroupSkeleton() {
    return (
        <div>
            {/* TransactionSummary skeleton */}
            <div className="flex justify-between py-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-4" />
            </div>
            {/* Separator */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
            {/* TransactionItems skeleton */}
            <section className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="w-1/3 h-4" />
                            <Skeleton className="w-1/4 h-3" />
                        </div>
                        <Skeleton className="w-16 h-4" />
                    </div>
                ))}
            </section>
        </div>
    );
}

export default function TransactionListFallback() {
    return (
        <div className="space-y-8">
            {Array.from({ length: 2 }).map((_, i) => (
                <TransactionGroupSkeleton key={i} />
            ))}
        </div>
    );
}
