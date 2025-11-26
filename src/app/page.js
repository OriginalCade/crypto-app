"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addSelected } from "@/lib/features/selectedCharts";
import { useState, useEffect } from "react";
import axios from "axios";

import PriceChart from "@/components/charts/PriceChart";
import VolumeChart from "@/components/charts/VolumeChart";
import CoinTable from "@/components/coinTable/CoinTable";
import CoinPercentage from "@/components/coinTable/CoinPercentage";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const [chartData, setChartData] = useState({});

  const selectedCharts = useAppSelector((state) => state.selectedCharts);
  const dispatch = useAppDispatch();

  const handleSelect = (item) => {
    dispatch(addSelected(item));
  };

  const fetchCoinListData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
      );
      setCoinList(data);
      setIsLoading(false);
    } catch {
      setHasError(true);
    }
  };

  const fetchChartData = async (coin) => {
    const chartKeys = Object.keys(chartData);
    if (chartKeys) {
      if (chartKeys.includes(coin)) return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`
      );
      const priceChartData = data.prices.map((item) => {
        const itemDate = new Date(item[0]).toDateString();
        return { date: itemDate, price: item[1] };
      });
      const volumeChartData = data.total_volumes.map((item) => {
        const itemDate = new Date(item[0]).toDateString();
        return { date: itemDate, volume: item[1] };
      });
      const newChartData = {
        ...chartData,
        [coin]: { prices: priceChartData, volumes: volumeChartData },
      };
      setChartData(newChartData);
      setIsLoading(false);
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleChartFetch = () => {
    selectedCharts.forEach((item) => {
      fetchChartData(item);
    });
  };

  useEffect(() => {
    fetchCoinListData();
    handleChartFetch();
  }, [selectedCharts]);
  return (
    <div className="flex-col flex justify-center items-center bg-background">
      <ScrollArea className="flex whitespace-nowrap w-[90%] rounded-sm">
        <div className="flex gap-2 w-max">
          {coinList.map((item) => {
            const priceChange1h = item.price_change_percentage_1h_in_currency;
            return (
              <button
                key={item.id}
                onClick={() => {
                  handleSelect(item.id);
                }}
                className={
                  selectedCharts.includes(item.id)
                    ? "bg-[#6161D680] rounded-sm p-[10px]"
                    : "bg-white dark:bg-[#191925] text-black dark:text-white rounded-sm p-[10px]"
                }
              >
                <div className="flex gap-2 items-center">
                  <img src={item.image} className="w-[32px] h-[32px]" />
                  <div>
                    <h2 className="text-[15px]">{`${
                      item.name
                    } (${item.symbol.toUpperCase()})`}</h2>
                    <p className="text-[#D1D1D1] text-[13px]">{`${item.current_price} USD`}</p>
                  </div>
                  <CoinPercentage price_percentage={priceChange1h} />
                </div>
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <main className="m-[20px] w-[100vw] bg-background">
        <p>{isLoading ? "Fetching data..." : ""}</p>
        <div className="w-[100%] flex  justify-center gap-[20px] mb-[40px]">
          <div className="w-[45%]">
            {Object.keys(chartData).length ? (
              <PriceChart data={chartData} />
            ) : (
              "fetching chart data..."
            )}
          </div>
          <div className="w-[45%]">
            {Object.keys(chartData).length ? (
              <VolumeChart data={chartData} />
            ) : (
              "fetching chart data..."
            )}
          </div>
        </div>
        <div className="flex justify-center gap-[60px] pl-[50px] text-black dark:text-white">
          <p>#</p>
          <h1>Name</h1>
          <h1>Price</h1>
          <p>1h%</p>
          <p>24h%</p>
          <p>7d%</p>
          <p>24h volume / Market cap</p>
          <p>Circulating / Total supply</p>
          <p>Last 7d</p>
        </div>
        <div className="w-[100%] flex justify-center">
          <CoinTable coinList={coinList} />
        </div>
        <p>{hasError ? "ERROR" : ""}</p>
      </main>
    </div>
  );
}
