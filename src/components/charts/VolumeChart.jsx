"use client";

import { Bar, BarChart, XAxis } from "recharts";
import { useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";

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
    desktop: {
      label: "Volume",
      color: "#9D62D9",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voume Chart</CardTitle>
        <CardDescription></CardDescription>
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
            <Bar dataKey={`${chart1}`} fill="url(#fillVolumes)" radius={3} />
            <Bar dataKey={`${chart2}`} fill="red" radius={3} />
            <Bar dataKey={`${chart3}`} fill="yellow" radius={3} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VolumeChart;
