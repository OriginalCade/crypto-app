"use client";

import { Area, AreaChart } from "recharts";

/* eslint-disable no-unused-vars */
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
/* eslint-enable no-unused-vars */

export const description = "A linear area chart";

const CoinTableChart = ({ data }) => {
  const chartData = data
    ? data.map((item, index) => {
        return { price: item, number: index };
      })
    : [];

  const chartConfig = {
    desktop: {
      label: "MiniPrice",
      color: "red",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[50px]">
      <AreaChart accessibilityLayer data={chartData}>
        <defs>
          <linearGradient id="fillMiniPrices" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="green" stopOpacity={0.9} />
            <stop offset="80%" stopColor="green" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          dataKey="price"
          type="linear"
          fill="url(#fillMiniPrices)"
          fillOpacity={0.4}
          stroke="green"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default CoinTableChart;
