import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function DataTableSkeleton() {
  return (
    <div className="container mx-auto py-10">
      {/* Table header */}
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-8 w-64" /> {/* Search bar skeleton */}
        <Skeleton className="h-8 w-32" /> {/* Filter button skeleton */}
      </div>

      {/* Table header row */}
      <div className="mb-4 flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-8 flex-1" />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="mb-4 flex gap-3">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              className="h-12 flex-1"
            />
          ))}
        </div>
      ))}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-8 w-32" /> {/* Page size selector */}
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={`page-${i}`} className="h-8 w-8" />
          ))}
        </div>
      </div>
    </div>
  );
}
