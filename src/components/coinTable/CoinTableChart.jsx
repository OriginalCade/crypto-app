"use client";

import { Area, AreaChart } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const CoinTableChart = ({ data }) => {
  const chartData = Array.isArray(data)
    ? data.map((price, index) => ({
        price,
        index,
      }))
    : [];

  // determine trend
  const first = chartData[0]?.price;
  const last = chartData[chartData.length - 1]?.price;

  const isUp = last >= first;

  const strokeColor = isUp ? "#22c55e" : "#ef4444"; // green / red
  const gradientId = isUp ? "fillUp" : "fillDown";

  const chartConfig = {
    mini: {
      label: "MiniPrice",
      color: strokeColor,
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[50px]">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity={0.8} />
            <stop offset="75%" stopColor={strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        <Area
          dataKey="price"
          type="monotone"
          stroke={strokeColor}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default CoinTableChart;
