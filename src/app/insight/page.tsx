import { DonutPieChart } from "./pie-chart";
import { StackedBarChart } from "./stacked-bar-chart";
import { HorizontalBarChart } from "./horizontal-bar-chart";
import { type ChartConfig } from "~/components/ui/chart";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import {
  getStrategySummary,
  getOwnerSummary,
  getIndustrySummary,
  getStrategyIndustrySummary,
  getOwnerIndustrySummary,
  getTopIBVendorSummary,
  getTopNonIBVendorSummary,
} from "~/server/db/queries";

export type PieChartData = {
  category: string | undefined | null;
  count: number;
  sum: number;
  pct?: number;
  fill?: string;
};

// pie charts
const strategySummary = await getStrategySummary();
const totalCount = strategySummary.reduce((sum, obj) => sum + obj.count, 0);
const totalSum = strategySummary.reduce((sum, obj) => sum + obj.sum, 0);

const chartData1: PieChartData[] = [];
strategySummary.map((item: PieChartData) => {
  const newItem: PieChartData = {
    ...item,
    category: item.category?.split(" ").join("-"),
    pct: parseFloat(((item.count / totalCount) * 100).toFixed(1)),
  };
  newItem.fill = "var(--color-" + newItem.category + ")";
  chartData1.push(newItem);
});

const chartData2: PieChartData[] = [];
strategySummary.map((item: PieChartData) => {
  const newItem: PieChartData = {
    ...item,
    category: item.category?.split(" ").join("-"),
    pct: parseFloat(((item.sum / totalSum) * 100).toFixed(1)),
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

const ownerSummary = await getOwnerSummary();
const totalCountPSIB = ownerSummary.reduce((sum, obj) => sum + obj.count, 0);
const totalSumPSIB = ownerSummary.reduce((sum, obj) => sum + obj.sum, 0);

const chartData3: PieChartData[] = [];
ownerSummary.map((item: PieChartData) => {
  const newItem: PieChartData = {
    ...item,
    pct: parseFloat(((item.count / totalCountPSIB) * 100).toFixed(1)),
    fill: "var(--color-" + item.category + ")",
  };
  chartData3.push(newItem);
});

const chartData4: PieChartData[] = [];
ownerSummary.map((item: PieChartData) => {
  const newItem: PieChartData = {
    ...item,
    pct: parseFloat(((item.sum / totalSumPSIB) * 100).toFixed(1)),
    fill: "var(--color-" + item.category + ")",
  };
  chartData4.push(newItem);
});

const chartConfig2 = {
  "non-IB": {
    label: "non-Indigenous Business",
    color: "hsl(var(--chart-5))",
  },
  IB: {
    label: "Indigenous Business",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const industrySummary = await getIndustrySummary();

const chartData5: PieChartData[] = [];
industrySummary.map((item: PieChartData) => {
  const newItem: PieChartData = {
    ...item,
    pct: parseFloat(((item.count / totalCount) * 100).toFixed(1)),
    fill: "var(--color-" + item.category + ")",
  };
  chartData5.push(newItem);
});

const chartData6: PieChartData[] = [];
industrySummary.map((item: PieChartData) => {
  const newItem: PieChartData = {
    ...item,
    pct: parseFloat(((item.sum / totalSum) * 100).toFixed(1)),
    fill: "var(--color-" + item.category + ")",
  };
  chartData6.push(newItem);
});

const chartConfig3 = {
  "non-Tech": {
    label: "non-Tech",
    color: "hsl(var(--chart-1))",
  },
  Tech: {
    label: "Tech",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// stacked bar chart showing pecentage of tech contracts by strategy
const strategyIndustrySummary = await getStrategyIndustrySummary();

const chartData7: object[] = [];
strategyIndustrySummary.map((item) => {
  const newItem: object = {
    ...item,
    Tech: parseFloat(
      (
        (item.Tech_count / (item.Tech_count + item["non-Tech_count"])) *
        100
      ).toFixed(1),
    ),
    "non-Tech": parseFloat(
      (
        (item["non-Tech_count"] / (item.Tech_count + item["non-Tech_count"])) *
        100
      ).toFixed(1),
    ),
  };
  chartData7.push(newItem);
});

const chartData8: object[] = [];
strategyIndustrySummary.map((item) => {
  const newItem: object = {
    ...item,
    Tech: parseFloat(
      ((item.Tech_sum / (item.Tech_sum + item["non-Tech_sum"])) * 100).toFixed(
        1,
      ),
    ),
    "non-Tech": parseFloat(
      (
        (item["non-Tech_sum"] / (item.Tech_sum + item["non-Tech_sum"])) *
        100
      ).toFixed(1),
    ),
  };
  chartData8.push(newItem);
});

// stacked bar chart showing pecentage of tech contracts under PSIB/PSAB by ownership
const ownerIndustrySummary = await getOwnerIndustrySummary();

const chartData9: object[] = [];
ownerIndustrySummary.map((item) => {
  const newItem: object = {
    ...item,
    Tech: parseFloat(
      (
        (item.Tech_count / (item.Tech_count + item["non-Tech_count"])) *
        100
      ).toFixed(1),
    ),
    "non-Tech": parseFloat(
      (
        (item["non-Tech_count"] / (item.Tech_count + item["non-Tech_count"])) *
        100
      ).toFixed(1),
    ),
  };
  chartData9.push(newItem);
});

const chartData10: object[] = [];
ownerIndustrySummary.map((item) => {
  const newItem: object = {
    ...item,
    Tech: parseFloat(
      ((item.Tech_sum / (item.Tech_sum + item["non-Tech_sum"])) * 100).toFixed(
        1,
      ),
    ),
    "non-Tech": parseFloat(
      (
        (item["non-Tech_sum"] / (item.Tech_sum + item["non-Tech_sum"])) *
        100
      ).toFixed(1),
    ),
  };
  chartData10.push(newItem);
});

// horizontal bar chart showing top 10 IB and non-IB vendors in contract valueunder PSIB/PSAB
const topIBVendorSummary = await getTopIBVendorSummary();

const chartData11: object[] = [];
topIBVendorSummary.map((item) => {
  const newItem: object = {
    ...item,
    sum: parseFloat((item.sum / 1_000_000).toFixed(2)),
    alt:
      item.category.length - 5 > item.sum / 1_000_000
        ? `${item.category.substring(0, 1 + item.sum / 1_000_000)}...`
        : item.category, // truncate the label manually
  };
  chartData11.push(newItem);
});

const chartConfig4 = {
  sum: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const topNonIBVendorSummary = await getTopNonIBVendorSummary();

const chartData12: object[] = [];
topNonIBVendorSummary.map((item) => {
  const newItem: object = {
    ...item,
    sum: parseFloat((item.sum / 1_000_000).toFixed(2)),
    alt:
      item.category.length - 5 > item.sum / 3_000_000
        ? `${item.category.substring(0, 1 + item.sum / 3_000_000)}...`
        : item.category, // truncate the label manually
  };
  chartData12.push(newItem);
});

export default function InsightPage() {
  console.log(topNonIBVendorSummary);
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Insight Page</p>
      <div className="container mx-auto grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
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
          totalCount={parseFloat((totalSum / 1_000_000).toFixed(0))}
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
          totalCount={parseFloat((totalSumPSIB / 1_000_000).toFixed(0))}
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
          totalCount={parseFloat((totalSum / 1_000_000).toFixed(0))}
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
        <HorizontalBarChart
          chartConfig={chartConfig4}
          chartData={chartData11}
          chartTitle="Top 10 Indigenous Businesses in Tech"
          chartDescription="Year 2023 Under PSIB/PSAB in M CAD"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              IPSS, DONNA CONA, and VERSATIL BPI are leading in tech
            </div>
          }
        />
        <HorizontalBarChart
          chartConfig={chartConfig4}
          chartData={chartData12}
          chartTitle="Top 10 Non-IB in Tech"
          chartDescription="Year 2023 Under PSIB/PSAB in M CAD"
          footerContent={
            <div className="flex items-center gap-2 font-medium leading-none">
              ADIRONDACK, CHANTIER, and ADRM are leading in tech
            </div>
          }
        />
      </div>
      <footer className="mt-10 space-y-4 text-sm text-gray-600">
        <p>
          Note: The data for these visualizations is sourced from the{" "}
          <Link
            href={"https://search.open.canada.ca/contracts/"}
            target="_blank"
            className="underline"
          >
            federal government contract open dataset
          </Link>
          . Analysis is based on historical records in 2023.
        </p>
        <p>
          IB: To identify Indigenous businesses, we used both the{" "}
          <Link
            href={"https://www.sac-isc.gc.ca/rea-ibd"}
            target="_blank"
            className="underline"
          >
            federal Indigenous Business Directory
          </Link>{" "}
          and{" "}
          <Link
            href={"https://www.ccab.com/main/ccab_member/"}
            target="_blank"
            className="underline"
          >
            member list from CCIB
          </Link>{" "}
          to match the names of vendors in contract records.
        </p>
        <p>
          PSIB/PSAB: The Procurement Strategy for Aboriginal Business (PSAB) was
          created in 1996 and aimed to “increase the number of Aboriginal
          suppliers bidding for, and winning, federal contracts.” In August
          2021, the program underwent a series of comprehensive changes and was
          renamed the Procurement Strategy for Indigenous Business (PSIB). Among
          those changes, it was announced that the Government of Canada is
          implementing a mandatory requirement for federal departments and
          agencies to ensure a minimum of 5% of the total value of contracts are
          held by qualified Indigenous businesses. For more information, please
          visit{" "}
          <Link
            href={"https://opo-boa.gc.ca/pmr-psp-eng.html"}
            target="_blank"
            className="underline"
          >
            https://opo-boa.gc.ca/pmr-psp-eng.html
          </Link>
        </p>
      </footer>
    </div>
  );
}
