"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";

import CoinLink from "@/components/CoinPage/CoinLink";

import { Progress } from "@/components/ui/progress";

const CoinPage = ({ params }) => {
  const coinId = use(params).coinId;

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [coinData, setCoinData] = useState({});

  const fetchCoinData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
      );
      setCoinData(data);
      setIsLoading(false);
    } catch {
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  return (
    <div>
      {Object.keys(coinData).length ? (
        <div className="flex flex-col p-[30px] justify-center gap-[30px]">
          <div className="flex p-[30px] justify-center gap-[30px]">
            <h1 className={isLoading ? "" : "hidden"}>Fetching data...</h1>
            <h1 className={hasError ? "" : "hidden"}>Error fetching data</h1>
            <div className="flex flex-col w-[30%]">
              <div className="flex flex-col gap-5">
                <div className="bg-[#1E1932] p-[80px] rounded-sm w-full flex flex-col justify-center items-center">
                  <div className="p-[10px] rounded-sm bg-[#2C2C4A] w-[64px]">
                    <img src={coinData.image.small} />
                  </div>
                  <h1 className="text-[30px]">{`${coinData.id}[${coinData.symbol}]`}</h1>
                </div>
                <CoinLink link={coinData.links.homepage[0]} />
              </div>
            </div>
            <div className="w-[30%] h-[350px] flex flex-col gap-5 bg-[#1E1932] p-[40px] rounded-sm justify-center items-center">
              <div className="flex">
                <div>
                  <h1 className="text-[15px]">{`All time high: $${coinData.market_data.ath.usd}`}</h1>
                  <p className="text-[12px]">
                    {coinData.market_data.ath_date.usd}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div>
                  <h1 className="text-[15px]">{`All time low: $${coinData.market_data.atl.usd}`}</h1>
                  <p className="text-[12px]">
                    {coinData.market_data.atl_date.usd}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[40%] bg-[#1E1932] p-[40px] rounded-sm justify-center items-center flex flex-col">
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Market cap:</h2>
                <h1>${coinData.market_data.market_cap.usd}</h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">FDV:</h2>
                <h1>${coinData.market_data.fully_diluted_valuation.usd}</h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Volume/Market:</h2>
                <h1>
                  {coinData.market_data.market_cap.usd /
                    coinData.market_data.total_volume.usd}
                </h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Total Volume:</h2>
                <h1>{coinData.market_data.total_volume.usd}</h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Circulating supply</h2>
                <h1>{coinData.market_data.circulating_supply}</h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Max supply</h2>
                <h1>{coinData.market_data.max_supply}</h1>
              </div>
              <Progress
                value={
                  coinData.market_data.circulating_supply /
                  coinData.market_data.total_supply
                }
                className="w-[100px] h-[6px] mt-[30px]"
              />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-[20px] w-[50%]">
              <h1>Description</h1>
              <p>{coinData.description.en}</p>
            </div>
            <div className="flex flex-col gap-[30px] w-[40%]">
              <CoinLink link={coinData.links.blockchain_site[3]} />
              <CoinLink link={coinData.links.blockchain_site[4]} />
              <CoinLink link={coinData.links.blockchain_site[5]} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CoinPage;
