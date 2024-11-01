import { db } from "~/server/db/index";
import { DonutPieChart } from "./pie-chart";
import { ChartConfig } from "~/components/ui/chart";

const chartData = [
  { category: "chrome", count: 275, pct: 20, fill: "var(--color-chrome)" },
  { category: "safari", count: 200, pct: 20, fill: "var(--color-safari)" },
  { category: "firefox", count: 287, pct: 20, fill: "var(--color-firefox)" },
  { category: "edge", count: 173, pct: 20, fill: "var(--color-edge)" },
  { category: "other", count: 190, pct: 20, fill: "var(--color-other)" },
];

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function InsightPage() {
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Insight Page</p>
      <div className="container mx-auto py-10">
        <DonutPieChart
          chartConfig={chartConfig}
          chartData={chartData}
          chartTitle="Pie Chart"
          chartDescription="January - June 2024"
          numericLabel="Visitors"
        />
      </div>
    </div>
  );
}
