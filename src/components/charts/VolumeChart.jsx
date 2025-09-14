"use client";

import { Bar, BarChart, XAxis } from "recharts";

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
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              tickFormatter={(value) => value.slice(8, 10)}
              interval={2}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <defs>
              <linearGradient id="fillVolumes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#9D62D9" stopOpacity={1} />
                <stop offset="90%" stopColor="#9D62D9" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <Bar dataKey="volume" fill="url(#fillVolumes)" radius={3} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VolumeChart;
