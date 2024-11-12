"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"
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
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"

type HorizontalBarChartProps = {
  chartData: object[];
  chartConfig: ChartConfig;
  chartTitle: string;
  chartDescription: string;
  footerContent?: React.ReactNode;
};

export function HorizontalBarChart({ chartData, chartConfig, chartTitle, chartDescription, footerContent }: HorizontalBarChartProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
        <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            width={350}
            height={250}
            margin={{ left: 15 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="sum" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="sum"
              layout="vertical"
              fill="var(--color-sum)"
              radius={4}
            >
              <LabelList
                dataKey="alt"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="sum"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {footerContent}
      </CardFooter>
    </Card>
  )
}