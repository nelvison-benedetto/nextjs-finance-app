import Skeleton from "@/shared/components/atoms/Skeleton";

function TransactionGroupSkeleton() {
    return (
        <div>
            {/* TransactionSummary: grow (date) + min-w-[70px] (amount) + min-w-[50px] (spacer) */}
            <div className="flex text-gray-500 font-semibold">
                <div className="grow">
                    <Skeleton className="w-24 h-4" />
                </div>
                <div className="min-w-[70px] flex justify-end">
                    <Skeleton className="w-14 h-4" />
                </div>
                <div className="min-w-[50px]" />
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

            {/* TransactionItems: grow (icon+desc) + min-w-[150px] (category) + min-w-[70px] (amount) + min-w-[50px] (spacer) */}
            <section className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="w-full flex items-center">
                        <div className="flex items-center mr-4 grow">
                            <Skeleton className="w-4 h-4 mr-2" />
                            <Skeleton className="w-32 h-4" />
                        </div>
                        <div className="min-w-[150px] hidden md:flex">
                            <Skeleton className="w-16 h-5 rounded-md" />
                        </div>
                        <div className="min-w-[70px] flex justify-end">
                            <Skeleton className="w-14 h-4" />
                        </div>
                        <div className="min-w-[50px]" />
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
