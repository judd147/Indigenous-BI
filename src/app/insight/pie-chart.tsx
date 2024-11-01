"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { type ChartData }  from "~/app/insight/page";
import { ChartLegend, ChartLegendContent } from "~/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

type DonutPieChartProps = {
  chartData: ChartData[];
  chartConfig: ChartConfig;
  chartTitle: string;
  chartDescription: string;
  totalCount?: number;
  numericLabel: string;
  footerContent?: React.ReactNode;
};

export function DonutPieChart({
  chartData,
  chartConfig,
  chartTitle,
  chartDescription,
  totalCount,
  numericLabel,
  footerContent
}: DonutPieChartProps) {

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart width={250} height={250} className="text-foreground">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="percentage" />}
            />
            <Pie
              data={chartData}
              dataKey="pct"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCount?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {numericLabel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent />}/>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {footerContent}
      </CardFooter>
    </Card>
  );
}
