"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ConverterChart = ({ coinA, coinB }) => {
  const chartData = useMemo(() => {
    if (!coinA?.sparkline_in_7d || !coinB?.sparkline_in_7d) return [];

    const aPrices = coinA.sparkline_in_7d.price;
    const bPrices = coinB.sparkline_in_7d.price;

    const length = Math.min(aPrices.length, bPrices.length);

    return Array.from({ length }).map((_, i) => ({
      index: i,
      prices: aPrices[i] / bPrices[i],
    }));
  }, [coinA, coinB]);

  const chartConfig = {
    prices: {
      label: coinA?.id,
      color: "#7878FA",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {coinA?.id} to {coinB?.id}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={"h-[300px] w-[100%]"}>
          <AreaChart data={chartData}>
            <XAxis
              dataKey="index"
              tickLine={false}
              axisLine={false}
              tick={false}
            />

            <YAxis
              domain={["dataMin", "dataMax"]}
              axisLine={false}
              tickLine={false}
              tick={false}
              width={0}
            />

            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />

            <defs>
              <linearGradient id="coinA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7878FA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7878FA" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey={"prices"}
              type="natural"
              stroke="#7878FA"
              fill="url(#coinA)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ConverterChart;
