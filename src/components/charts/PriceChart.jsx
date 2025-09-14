"use client";

import { Area, AreaChart, XAxis } from "recharts";

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

export const description = "A simple area chart";

const PriceChart = ({ data }) => {
  const chartData = data;

  const chartConfig = {
    price: {
      label: "Price",
      color: "#7878FA",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
        <CardDescription>
          {chartData[chartData.length - 1].date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(8, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient id="fillPrices" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7878FA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7878FA" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="price"
              type="natural"
              fill="url(#fillPrices)"
              fillOpacity={0.4}
              stroke="#7878FA"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
