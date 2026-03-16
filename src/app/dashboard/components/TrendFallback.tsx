import Skeleton from "@/shared/components/atoms/Skeleton";

export default function TrendFallback() {
    return (
        <div className="space-y-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-40 h-4" />
        </div>
    );
}
