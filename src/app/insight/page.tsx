import { db } from "~/server/db/index";
import { procurement, procurementStrategy } from "~/server/db/schema";
import { count, sum, eq } from "drizzle-orm";
import { DonutPieChart } from "./pie-chart";
import { type ChartConfig } from "~/components/ui/chart";

import { CircleAlert } from "lucide-react";

export type ChartData = {
  category: string | undefined | null;
  count: number;
  pct?: number;
  fill?: string;
};

const totalSummary = await db
  .select({
    count: count(),
    sum: sum(procurement.contract_value).mapWith(procurement.contract_value),
  })
  .from(procurement);

const strategyCountSummary = await db
  .select({
    category: procurementStrategy.strategy,
    count: count(),
  })
  .from(procurement)
  .innerJoin(
    procurementStrategy,
    eq(procurement.procurement_strategy_id, procurementStrategy.id),
  )
  .groupBy(procurementStrategy.strategy);

const chartData1: ChartData[] = [];
strategyCountSummary.map((item: ChartData) => {
  item.category = item.category?.split(" ").join("-");
  if (totalSummary[0]) {
    item.pct = parseFloat(
      ((item.count / totalSummary[0].count) * 100).toFixed(1),
    );
  }
  item.fill = "var(--color-" + item.category + ")";
  chartData1.push(item);
});

const chartConfig1 = {
  "Mandatory-Set-Aside": {
    label: "Mandatory Set-Aside",
    color: "hsl(var(--chart-1))",
  },
  PSAB: {
    label: "PSAB",
    color: "hsl(var(--chart-2))",
  },
  "Voluntary-Set-Aside": {
    label: "Voluntary Set-Aside",
    color: "hsl(var(--chart-3))",
  },
  None: {
    label: "None",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const strategyValueSummary = await db
  .select({
    category: procurementStrategy.strategy,
    count: sum(procurement.contract_value).mapWith(procurement.contract_value),
  })
  .from(procurement)
  .innerJoin(
    procurementStrategy,
    eq(procurement.procurement_strategy_id, procurementStrategy.id),
  )
  .groupBy(procurementStrategy.strategy);

const chartData2: ChartData[] = [];
strategyValueSummary.map((item: ChartData) => {
  item.category = item.category?.split(" ").join("-");
  if (totalSummary[0]) {
    item.pct = parseFloat(
      ((item.count / totalSummary[0].sum) * 100).toFixed(1),
    );
  }
  item.fill = "var(--color-" + item.category + ")";
  chartData2.push(item);
});

export default function InsightPage() {
  console.log(totalSummary)
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Insight Page</p>
      <div className="container mx-auto py-10 grid grid-cols-2 gap-4">
        <DonutPieChart
          chartConfig={chartConfig1}
          chartData={chartData1}
          chartTitle="Contracts by Strategy"
          chartDescription="Year 2023"
          totalCount={totalSummary[0]?.count}
          numericLabel="Contracts"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              Falling short of the 5% target
              <CircleAlert className="h-4 w-4 text-red-500" />
            </div>
          }
        />
        <DonutPieChart
          chartConfig={chartConfig1}
          chartData={chartData2}
          chartTitle="Contract Value by Strategy"
          chartDescription="Year 2023"
          totalCount={parseFloat(((totalSummary[0]?.sum ?? 0) / 1_000_000).toFixed(0))}
          numericLabel="M CAD"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              Falling short of the 5% target
              <CircleAlert className="h-4 w-4 text-red-500" />
            </div>
          }
        />
      </div>
    </div>
  );
}
