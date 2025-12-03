"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useSelector, useDispatch } from "react-redux";
import { addSelected } from "@/lib/features/selectedCharts";
import {
  fetchCoinListData,
  fetchChartData,
} from "@/lib/features/homeData/homeDataSlice";
import { useEffect } from "react";

import PriceChart from "@/components/charts/PriceChart";
import VolumeChart from "@/components/charts/VolumeChart";
import CoinTable from "@/components/coinTable/CoinTable";
import CoinPercentage from "@/components/coinTable/CoinPercentage";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
  const selectedCharts = useAppSelector((state) => state.selectedCharts);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const { data, fetchCoinListDataStatus, error } = useSelector(
    (state) => state.homeData
  );

  const handleSelect = (coin) => {
    appDispatch(addSelected(coin));
  };

  const fetchChartDataFunction = async (coin) => {
    const chartKeys = Object.keys(data.chartData);
    if (chartKeys) {
      if (chartKeys.includes(coin)) return;
    }
    dispatch(fetchChartData(coin));
  };

  const handleChartFetch = () => {
    selectedCharts.forEach((item) => {
      fetchChartDataFunction(item);
    });
  };

  useEffect(() => {
    if (fetchCoinListDataStatus === "idle") {
      dispatch(fetchCoinListData());
    }
  }, [fetchCoinListDataStatus]);

  useEffect(() => {
    handleChartFetch();
  }, [selectedCharts]);

  return (
    <div className="flex-col flex justify-center items-center bg-background">
      <ScrollArea className="flex whitespace-nowrap w-[90%] rounded-sm">
        <div className="flex gap-2 w-max">
          {data.coinList.map((item) => {
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
        <p>{fetchCoinListDataStatus === "success" ? "Fetching data..." : ""}</p>
        <div className="w-[100%] flex  justify-center gap-[20px] mb-[40px]">
          <div className="w-[45%]">
            {Object.keys(data.chartData).length ? (
              <PriceChart data={data.chartData} />
            ) : (
              "fetching chart data..."
            )}
          </div>
          <div className="w-[45%]">
            {Object.keys(data.chartData).length ? (
              <VolumeChart data={data.chartData} />
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
          <CoinTable coinList={data.coinList} />
        </div>
        <p>{error ? "ERROR" : ""}</p>
      </main>
    </div>
  );
}
