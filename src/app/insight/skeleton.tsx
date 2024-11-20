import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function InsightSkeleton() {
  const ChartSkeleton = () => (
    <div className="flex flex-col space-y-4 rounded-xl border p-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" /> {/* Chart title */}
        <Skeleton className="h-4 w-1/2" /> {/* Chart description */}
      </div>
      <Skeleton className="h-[300px] w-full rounded-lg" /> {/* Chart area */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-3/4" /> {/* Footer content */}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {/* Generate 12 chart skeletons */}
      {Array.from({ length: 12 }).map((_, index) => (
        <ChartSkeleton key={`chart-${index}`} />
      ))}
    </div>
  );
}
