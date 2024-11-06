import { db } from "~/server/db/index";
import { procurement, procurementStrategy, vendor } from "~/server/db/schema";
import { count, sum, eq, sql, ne } from "drizzle-orm";
import { DonutPieChart } from "./pie-chart";
import { StackedBarChart } from "./stacked-bar-chart";
import { HorizontalBarChart } from "./horizontal-bar-chart";
import { type ChartConfig } from "~/components/ui/chart";
import { CircleAlert } from "lucide-react";

export type PieChartData = {
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

const chartData1: PieChartData[] = [];
strategySummary.map((item: PieChartData) => {
  const newItem: PieChartData = {...item,
    category: item.category?.split(" ").join("-"),
    pct: parseFloat(
      ((item.count / totalCount) * 100).toFixed(1),
    ),
  };
  newItem.fill = "var(--color-" + newItem.category + ")";
  chartData1.push(newItem);
});

const chartData2: PieChartData[] = [];
strategySummary.map((item: PieChartData) => {
  const newItem: PieChartData = {...item,
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

const chartData3: PieChartData[] = [];
ownerSummary.map((item: PieChartData) => {
  const newItem: PieChartData = {...item,
    pct: parseFloat(
      ((item.count / totalCountPSIB) * 100).toFixed(1),
    ),
    fill: "var(--color-" + item.category + ")",
  };
  chartData3.push(newItem);
});

const chartData4: PieChartData[] = [];
ownerSummary.map((item: PieChartData) => {
  const newItem: PieChartData = {...item,
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

const chartData5: PieChartData[] = [];
industrySummary.map((item: PieChartData) => {
  const newItem: PieChartData = {...item,
    pct: parseFloat(
      ((item.count / totalCount) * 100).toFixed(1),
    ),
    fill: "var(--color-" + item.category + ")",
  };
  chartData5.push(newItem);
});

const chartData6: PieChartData[] = [];
industrySummary.map((item: PieChartData) => {
  const newItem: PieChartData = {...item,
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

// stacked bar chart showing pecentage of tech contracts by strategy
const strategyIndustrySummary = await db
  .select({
    category: sql<string>`CASE WHEN ${procurementStrategy.strategy} = 'None' THEN 'None' ELSE 'PSIB/PSAB' END`,
    "Tech_count": count(sql`CASE WHEN ${procurement.is_Tech} THEN 1 END`),
    "non-Tech_count": count(sql`CASE WHEN NOT ${procurement.is_Tech} THEN 1 END`),
    "Tech_sum": sum(sql`CASE WHEN ${procurement.is_Tech} THEN ${procurement.contract_value} END`).mapWith(procurement.contract_value),
    "non-Tech_sum": sum(sql`CASE WHEN NOT ${procurement.is_Tech} THEN ${procurement.contract_value} END`).mapWith(procurement.contract_value),
  })
  .from(procurement)
  .innerJoin(
    procurementStrategy,
    eq(procurement.procurement_strategy_id, procurementStrategy.id),
  )
  .groupBy(sql<string>`CASE WHEN ${procurementStrategy.strategy} = 'None' THEN 'None' ELSE 'PSIB/PSAB' END`);

const chartData7: object[] = []
strategyIndustrySummary.map((item) => {
  const newItem: object = {...item,
    "Tech": parseFloat(((item.Tech_count / (item.Tech_count + item["non-Tech_count"])) * 100).toFixed(1)),
    "non-Tech": parseFloat(((item["non-Tech_count"] / (item.Tech_count + item["non-Tech_count"])) * 100).toFixed(1))
  };
  chartData7.push(newItem);
});

const chartData8: object[] = []
strategyIndustrySummary.map((item) => {
  const newItem: object = {...item,
    "Tech": parseFloat(((item.Tech_sum / (item.Tech_sum + item["non-Tech_sum"])) * 100).toFixed(1)),
    "non-Tech": parseFloat(((item["non-Tech_sum"] / (item.Tech_sum + item["non-Tech_sum"])) * 100).toFixed(1))
  };
  chartData8.push(newItem);
});

// stacked bar chart showing pecentage of tech contracts under PSIB/PSAB by ownership
const ownerIndustrySummary = await db
  .select({
    category: sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`,
    "Tech_count": count(sql`CASE WHEN ${procurement.is_Tech} THEN 1 END`),
    "non-Tech_count": count(sql`CASE WHEN NOT ${procurement.is_Tech} THEN 1 END`),
    "Tech_sum": sum(sql`CASE WHEN ${procurement.is_Tech} THEN ${procurement.contract_value} END`).mapWith(procurement.contract_value),
    "non-Tech_sum": sum(sql`CASE WHEN NOT ${procurement.is_Tech} THEN ${procurement.contract_value} END`).mapWith(procurement.contract_value),
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
  .groupBy(sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`);

const chartData9: object[] = []
ownerIndustrySummary.map((item) => {
  const newItem: object = {...item,
    "Tech": parseFloat(((item.Tech_count / (item.Tech_count + item["non-Tech_count"])) * 100).toFixed(1)),
    "non-Tech": parseFloat(((item["non-Tech_count"] / (item.Tech_count + item["non-Tech_count"])) * 100).toFixed(1))
  };
  chartData9.push(newItem);
});

const chartData10: object[] = []
ownerIndustrySummary.map((item) => {
  const newItem: object = {...item,
    "Tech": parseFloat(((item.Tech_sum / (item.Tech_sum + item["non-Tech_sum"])) * 100).toFixed(1)),
    "non-Tech": parseFloat(((item["non-Tech_sum"] / (item.Tech_sum + item["non-Tech_sum"])) * 100).toFixed(1))
  };
  chartData10.push(newItem);
});

// multiple bar chart showing number/value of contracts under PSIB/PSAB by ownership

// top 20 non-IB vendors under PSIB/PSAB

export default function InsightPage() {
  console.log(strategyIndustrySummary);
  console.log(ownerIndustrySummary);
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
        <StackedBarChart 
          chartConfig={chartConfig3}
          chartData={chartData7}
          chartTitle="Contracts by Sector x Strategy"
          chartDescription="Year 2023"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              PSIB/PSAB is more tech-focused
            </div>
          }
          y1="Tech"
          y2="non-Tech"
        />
        <StackedBarChart 
          chartConfig={chartConfig3}
          chartData={chartData8}
          chartTitle="Contract Value by Sector x Strategy"
          chartDescription="Year 2023"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              Value under PSIB/PSAB exceeding 50%
            </div>
          }
          y1="Tech"
          y2="non-Tech"
        />
        <StackedBarChart 
          chartConfig={chartConfig3}
          chartData={chartData9}
          chartTitle="Contracts by Sector x Ownership"
          chartDescription="Year 2023 Under PSIB/PSAB"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              Half of IB contracts are in Tech
            </div>
          }
          y1="Tech"
          y2="non-Tech"
        />
        <StackedBarChart 
          chartConfig={chartConfig3}
          chartData={chartData10}
          chartTitle="Contract Value by Sector x Ownership"
          chartDescription="Year 2023 Under PSIB/PSAB"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              Value of IB contracts in Tech almost 70%
            </div>
          }
          y1="Tech"
          y2="non-Tech"
        />
        {/* <HorizontalBarChart/> */}
      </div>
    </div>
  );
}
