"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAppSelector } from "@/lib/hooks";

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
  const selectedCharts = useAppSelector((state) => state.selectedCharts);

  const chart1 = selectedCharts[0];
  const chart2 = selectedCharts[1];
  const chart3 = selectedCharts[2];

  const chartData1 = data[chart1].prices.map((item) => {
    const price = item.price ? item.price : "";
    const date = item.date ? item.date : "";
    return { [chart1]: price, date: date };
  });

  const [chartData, setChartData] = useState([...chartData1]);

  const handleChart = () => {
    if (Object.keys(data).length == 2) {
      const chartData2 = data[chart2].prices.map((item, index) => {
        const price = item.price ? item.price : "";
        return { ...chartData[index], [chart2]: price };
      });
      setChartData(chartData2);
    }
    if (Object.keys(data).length == 3) {
      const chartData3 = data[chart3].prices.map((item, index) => {
        const price = item.price ? item.price : "";
        return { ...chartData[index], [chart3]: price };
      });
      setChartData(chartData3);
    }
  };

  useEffect(() => {
    handleChart();
  }, [data]);

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
        <CardDescription></CardDescription>
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
              interval={2}
            />
            <YAxis
              domain={["dataMin - 10", "dataMax + 10"]}
              axisLine={false}
              tickLine={false}
              tick={false}
              width={0}
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
              dataKey={`${chart1}`}
              type="natural"
              fill="url(#fillPrices)"
              fillOpacity={0.4}
              stroke="#7878FA"
            />
            <Area
              dataKey={`${chart2}`}
              type="natural"
              fill="red"
              fillOpacity={0.4}
              stroke="red"
            />
            <Area
              dataKey={`${chart3}`}
              type="natural"
              fill="yellow"
              fillOpacity={0.4}
              stroke="yellow"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
