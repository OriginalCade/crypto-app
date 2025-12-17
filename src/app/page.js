"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useSelector, useDispatch } from "react-redux";
import { addSelected } from "@/lib/features/selectedCharts";
import {
  fetchCoinListData,
  fetchChartData,
  increasePage,
} from "@/lib/features/homeData/homeDataSlice";
import {
  setBuyingCoin,
  setSellingCoin,
  toggleConverter,
} from "@/lib/features/converterData/converterDataSlice";
import { setSellingAmount } from "@/lib/features/converterData/converterDataSlice";
import { useEffect } from "react";

import PriceChart from "@/components/charts/PriceChart";
import VolumeChart from "@/components/charts/VolumeChart";
import CoinTable from "@/components/coinTable/CoinTable";
import CoinPercentage from "@/components/coinTable/CoinPercentage";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Combobox } from "@/components/coinConverter/ComboBox";
import ConverterChart from "@/components/charts/ConverterChart";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const selectedCharts = useAppSelector((state) => state.selectedCharts);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const {
    data: homeData,
    fetchCoinListDataStatus,
    error,
  } = useSelector((state) => state.homeData);

  const { data: converterData, enabled } = useSelector(
    (state) => state.converterData
  );

  const { sellingCoin, buyingCoin } = converterData;

  const { coinList, chartData } = homeData;

  const coinNames = coinList.map((item) => {
    return item.id;
  });

  const { currency } = useSelector((state) => state.navbarData);

  const handleSelect = (coin) => {
    appDispatch(addSelected(coin));
  };

  const fetchChartDataFunction = async (coin) => {
    const chartKeys = Object.keys(chartData);
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

  const handleConverterSwap = () => {
    dispatch(setSellingCoin(buyingCoin));
    dispatch(setBuyingCoin(sellingCoin));
  };

  function findCoin(arr, key, value) {
    return arr.find((obj) => obj[key] === value);
  }

  const sellingCoinData = findCoin(coinList, "id", converterData.sellingCoin);
  const buyingCoinData = findCoin(coinList, "id", converterData.buyingCoin);

  useEffect(() => {
    if (fetchCoinListDataStatus === "idle") {
      dispatch(fetchCoinListData());
  const handleCoinListFetch = () => {
    if (fetchCoinListDataStatus !== "loading") {
      dispatch(
        fetchCoinListData({
          currency: currency,
          page: coinListPage,
        })
      );
    }
    dispatch(increasePage());
  };

  useEffect(() => {
    handleCoinListFetch();
  }, [currency]);

  useEffect(() => {
    handleChartFetch();
  }, [selectedCharts]);
  return (
    <div>
      {/* MAIN */}
      <div className={enabled ? "" : "hidden"}>
        <div className="self-start flex justify-center items-center gap-1 ml-18 p-1 rounded-sm dark:bg-[#191925] w-[300px]">
          <button
            onClick={() => dispatch(toggleConverter())}
            className="rounded-sm p-1 w-[150px] dark:bg-[#191925] bg-white text-black dark:text-white"
          >
            Coins
          </button>
          <button className="bg-purple-500 rounded-sm p-1 w-[150px]">
            Convertor
          </button>
        </div>
      </div>
      <div className={enabled ? "hidden" : ""}>
        <div className="self-start flex justify-center items-center gap-1 ml-18 mb-10 p-1 rounded-sm dark:bg-[#191925] w-[300px]">
          <button className="bg-purple-500 rounded-sm p-1 w-[150px]">
            Coins
          </button>
          <button
            onClick={() => dispatch(toggleConverter())}
            className="rounded-sm p-1 w-[150px] dark:bg-[#191925] bg-white text-black dark:text-white"
          >
            Convertor
          </button>
        </div>
      </div>
      <div className={enabled ? "hidden" : ""}>
        <div className="flex-col flex justify-center items-center bg-background">
          <ScrollArea className="flex whitespace-nowrap w-[90%] rounded-sm">
            <div className="flex gap-2 w-max">
              {coinList.map((item) => {
                const priceChange1h =
                  item.price_change_percentage_1h_in_currency;
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
            <p>
              {fetchCoinListDataStatus === "success" ? "Fetching data..." : ""}
            </p>
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
            <div className="w-[100%] flex justify-center items-center">
              <CoinTable coinList={coinList} />
            </div>
            <p>{error ? "ERROR" : ""}</p>
          </main>
        </div>
      </div>
      {/* CONVERTER */}
      <div className={enabled ? "" : "hidden"}>
        <div className="flex flex-col items-center min-h-screen w-full bg-background">
          <h1 className="self-start mt-10 mb-8 text-2xl font-semibold pl-18 text-black dark:text-white">
            Currency Converter
          </h1>

          <div className="relative flex w-full max-w-6xl gap-6 px-6">
            {/* SELL CARD */}
            <div className="flex-1 rounded-2xl border border-border bg-card dark:bg-gradient-to-br dark:from-[#191932] dark:to-[#0f0f1f] p-6 shadow-lg">
              <p className="text-sm text-muted-foreground mb-4">You sell</p>

              <div className="flex items-center justify-between pb-4 border-b border-border">
                <img src={sellingCoinData?.image} className="w-[30px]" />
                <Combobox
                  placeholder="Select coin"
                  data={coinNames}
                  type="selling"
                />

                <input
                  type="number"
                  placeholder="Amount"
                  className="w-28 bg-transparent text-right text-2xl font-semibold text-black dark:text-white outline-none placeholder:text-muted-foreground"
                  onChange={(e) => dispatch(setSellingAmount(e.target.value))}
                />
              </div>

              <p
                className={`mt-3 text-sm text-muted-foreground ${
                  sellingCoin ? "" : "hidden"
                }`}
              >
                {`1 ${sellingCoin} = $${
                  sellingCoinData ? sellingCoinData.current_price : ""
                }`}
              </p>
            </div>

            {/* SWAP BUTTON */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-black shadow-md hover:scale-105 transition"
                onClick={() => handleConverterSwap()}
                key={item.name}
                onClick={() => {
                  handleSelect(item.id);
                }}
                className={
                  selectedCharts.includes(item.id)
                    ? "bg-[#6161D680] rounded-sm p-[10px]"
                    : "bg-white dark:bg-[#191925] text-black dark:text-white rounded-sm p-[10px]"
                }
              >
                ⇅
              </button>
            </div>

            {/* BUY CARD */}
            <div className="flex-1 rounded-2xl border border-border bg-card dark:bg-gradient-to-br dark:from-[#1e1932] dark:to-[#121026] p-6 shadow-lg">
              <p className="text-sm text-muted-foreground mb-4">You buy</p>

              <div className="flex items-center justify-between pb-4 border-b border-border">
                <img src={buyingCoinData?.image} className="w-[30px]" />
                <Combobox
                  placeholder="Select coin"
                  data={coinNames}
                  type="buying"
                />

                <p className="text-2xl font-semibold text-black dark:text-white">
                  {buyingCoinData && sellingCoinData
                    ? (
                        (sellingCoinData.current_price *
                          converterData.sellingAmount) /
                        buyingCoinData.current_price
                      ).toFixed(3)
                    : ""}
                </p>
              </div>

              <p
                className={`mt-3 text-sm text-muted-foreground ${
                  buyingCoin ? "" : "hidden"
                }`}
              >
                {`1 ${buyingCoin} = $${
                  buyingCoinData ? buyingCoinData.current_price : ""
                }`}
              </p>
            </div>
          </div>
          <div
            className={`w-[90%] mt-10 ${
              !sellingCoin || !buyingCoin ? "hidden" : ""
            }`}
          >
            <ConverterChart coinA={sellingCoinData} coinB={buyingCoinData} />
          </div>
          <div className={`${!sellingCoin || !buyingCoin ? "" : "hidden"}`}>
            <h1 className="mt-10 text-xl">
              {"Select some coins to see a chart"}
            </h1>
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
          <InfiniteScroll
            dataLength={coinList.length}
            next={handleCoinListFetch}
            hasMore={true}
            loader={<h1>Loading...</h1>}
          >
            <CoinTable coinList={coinList} />
          </InfiniteScroll>
        </div>
        <p>{error ? "ERROR" : ""}</p>
      </main>
    </div>
  );
}
