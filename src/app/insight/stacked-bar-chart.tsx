"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"

type StackedBarChartProps = {
  chartData: object[];
  chartConfig: ChartConfig;
  chartTitle: string;
  chartDescription: string;
  footerContent?: React.ReactNode;
  y1: string;
  y2: string;
};

export function StackedBarChart({ chartData, chartConfig, chartTitle, chartDescription, footerContent, y1, y2 }: StackedBarChartProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <BarChart accessibilityLayer data={chartData} width={250} height={250}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel className="percentage"/>} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey={y1}
              stackId="a"
              fill={`var(--color-${y1})`}
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey={y2}
              stackId="a"
              fill={`var(--color-${y2})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {footerContent}
      </CardFooter>
    </Card>
  )
}