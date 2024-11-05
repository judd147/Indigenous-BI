import { db } from "~/server/db/index";
import { procurement, procurementStrategy, vendor } from "~/server/db/schema";
import { count, sum, eq, sql, ne } from "drizzle-orm";
import { DonutPieChart } from "./pie-chart";
import { HorizontalBarChart } from "./bar-chart";
import { type ChartConfig } from "~/components/ui/chart";
import { CircleAlert } from "lucide-react";

export type ChartData = {
  category: string | undefined | null;
  count: number;
  sum: number;
  pct?: number;
  fill?: string;
};

const strategySummary = await db
  .select({
    category: procurementStrategy.strategy,
    count: count(),
    sum: sum(procurement.contract_value).mapWith(procurement.contract_value),
  })
  .from(procurement)
  .innerJoin(
    procurementStrategy,
    eq(procurement.procurement_strategy_id, procurementStrategy.id),
  )
  .groupBy(procurementStrategy.strategy);

const totalCount = strategySummary.reduce((sum, obj) => sum + obj.count, 0);
const totalSum = strategySummary.reduce((sum, obj) => sum + obj.sum, 0);

const chartData1: ChartData[] = [];
strategySummary.map((item: ChartData) => {
  const newItem: ChartData = {...item,
    category: item.category?.split(" ").join("-"),
    pct: parseFloat(
      ((item.count / totalCount) * 100).toFixed(1),
    ),
  };
  newItem.fill = "var(--color-" + newItem.category + ")";
  chartData1.push(newItem);
});

const chartData2: ChartData[] = [];
strategySummary.map((item: ChartData) => {
  const newItem: ChartData = {...item,
    category: item.category?.split(" ").join("-"),
    pct: parseFloat(
      ((item.sum / totalSum) * 100).toFixed(1),
    ),
  };
  newItem.fill = "var(--color-" + newItem.category + ")";
  chartData2.push(newItem);
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

const ownerSummary = await db
  .select({
    category: sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`,
    count: count(),
    sum: sum(procurement.contract_value).mapWith(procurement.contract_value),
  })
  .from(procurement)
  .innerJoin(
    vendor,
    eq(procurement.vendor_name, vendor.vendor_name),
  )
  .innerJoin(
    procurementStrategy,
    eq(procurement.procurement_strategy_id, procurementStrategy.id),
  )
  .where(ne(procurementStrategy.strategy, "None"))
  .groupBy(vendor.is_IB);

const totalCountPSIB = ownerSummary.reduce((sum, obj) => sum + obj.count, 0);
const totalSumPSIB = ownerSummary.reduce((sum, obj) => sum + obj.sum, 0);

const chartData3: ChartData[] = [];
ownerSummary.map((item: ChartData) => {
  const newItem: ChartData = {...item,
    pct: parseFloat(
      ((item.count / totalCountPSIB) * 100).toFixed(1),
    ),
    fill: "var(--color-" + item.category + ")",
  };
  chartData3.push(newItem);
});

const chartData4: ChartData[] = [];
ownerSummary.map((item: ChartData) => {
  const newItem: ChartData = {...item,
    pct: parseFloat(
      ((item.sum / totalSumPSIB) * 100).toFixed(1),
    ),
    fill: "var(--color-" + item.category + ")",
  };
  chartData4.push(newItem);
});

const chartConfig2 = {
  "non-IB": {
    label: "non-Indigenous Business",
    color: "hsl(var(--chart-5))",
  },
  "IB": {
    label: "Indigenous Business",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const industrySummary = await db
  .select({
    category: sql<string>`CASE WHEN ${procurement.is_Tech} THEN 'Tech' ELSE 'non-Tech' END`,
    count: count(),
    sum: sum(procurement.contract_value).mapWith(procurement.contract_value),
  })
  .from(procurement)
  .groupBy(procurement.is_Tech);

const chartData5: ChartData[] = [];
industrySummary.map((item: ChartData) => {
  const newItem: ChartData = {...item,
    pct: parseFloat(
      ((item.count / totalCount) * 100).toFixed(1),
    ),
    fill: "var(--color-" + item.category + ")",
  };
  chartData5.push(newItem);
});

const chartData6: ChartData[] = [];
industrySummary.map((item: ChartData) => {
  const newItem: ChartData = {...item,
    pct: parseFloat(
      ((item.sum / totalSum) * 100).toFixed(1),
    ),
    fill: "var(--color-" + item.category + ")",
  };
  chartData6.push(newItem);
});

const chartConfig3 = {
  "non-Tech": {
    label: "non-Tech",
    color: "hsl(var(--chart-1))",
  },
  "Tech": {
    label: "Tech",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function InsightPage() {
  //console.log(chartData1);
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Insight Page</p>
      <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DonutPieChart
          chartConfig={chartConfig1}
          chartData={chartData1}
          chartTitle="Contracts by Strategy"
          chartDescription="Year 2023"
          totalCount={totalCount}
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
          totalCount={parseFloat(((totalSum) / 1_000_000).toFixed(0))}
          numericLabel="M CAD"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              Falling short of the 5% target
              <CircleAlert className="h-4 w-4 text-red-500" />
            </div>
          }
        />
        <DonutPieChart
          chartConfig={chartConfig2}
          chartData={chartData3}
          chartTitle="Contracts by Ownership"
          chartDescription="Year 2023 Under PSIB/PSAB"
          totalCount={totalCountPSIB}
          numericLabel="Contracts"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              Not exceeding the 50% benchmark
              <CircleAlert className="h-4 w-4 text-red-500" />
            </div>
          }
        />
        <DonutPieChart
          chartConfig={chartConfig2}
          chartData={chartData4}
          chartTitle="Contract Value by Ownership"
          chartDescription="Year 2023 Under PSIB/PSAB"
          totalCount={parseFloat(((totalSumPSIB) / 1_000_000).toFixed(0))}
          numericLabel="M CAD"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              Not exceeding the 25% benchmark
              <CircleAlert className="h-4 w-4 text-red-500" />
            </div>
          }
        />
        <DonutPieChart
          chartConfig={chartConfig3}
          chartData={chartData5}
          chartTitle="Contracts by Sector"
          chartDescription="Year 2023"
          totalCount={totalCount}
          numericLabel="Contracts"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              20% of total contracts are tech-related
            </div>
          }
        />
        <DonutPieChart
          chartConfig={chartConfig3}
          chartData={chartData6}
          chartTitle="Contract Value by Sector"
          chartDescription="Year 2023"
          totalCount={parseFloat(((totalSum) / 1_000_000).toFixed(0))}
          numericLabel="M CAD"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              17% of total contract value is tech-related
            </div>
          }
        />
      </div>
    </div>
  );
}
