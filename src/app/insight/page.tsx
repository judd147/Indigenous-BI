import { Suspense } from "react";
import InsightSkeleton from "./skeleton";
import Charts from "./charts";
import FootNote from "./footnote";

export type PieChartData = {
  category: string;
  count: number;
  sum: number;
  pct?: number;
  fill?: string;
};

export default async function InsightPage() {
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Insight</p>
      <Suspense fallback={<InsightSkeleton />}>
        <Charts />
      </Suspense>
      <FootNote />
    </div>
  );
}
