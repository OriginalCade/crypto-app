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
      label: "Desktop",
      color: "var(--chart-1)",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[40px]">
      <AreaChart accessibilityLayer data={chartData}>
        <Area
          dataKey="price"
          type="linear"
          fill="none"
          fillOpacity={0.4}
          stroke="red"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default CoinTableChart;
