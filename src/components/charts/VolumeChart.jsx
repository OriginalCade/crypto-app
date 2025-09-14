"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* eslint-disable no-unused-vars */
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
/* eslint-enable no-unused-vars */

export const description = "A bar chart";

const VolumeChart = ({ data }) => {
  const chartData = data;

  const chartConfig = {
    desktop: {
      label: "Volume",
      color: "#9D62D9",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voume Chart</CardTitle>
        <CardDescription>
          {chartData[chartData.length - 1].date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(8, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="volume" fill="#9D62D9" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VolumeChart;
