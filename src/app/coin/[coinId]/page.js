"use client";

import { useEffect, use } from "react";
import { fetchCoinData } from "@/lib/features/coinPageData/coinPageDataSlice";
import { useSelector, useDispatch } from "react-redux";

import CoinLink from "@/components/coinPage/CoinLink";

import { Progress } from "@/components/ui/progress";

const CoinPage = ({ params }) => {
  const dispatch = useDispatch();

  const { coinId } = use(params);

  const { data, fetchCoinDataStatus, error } = useSelector(
    (state) => state.coinPageData
  );

  useEffect(() => {
    if (fetchCoinDataStatus === "idle") {
      dispatch(fetchCoinData(coinId));
    }
  }, [fetchCoinDataStatus]);

  useEffect(() => {
    if (fetchCoinDataStatus === "success") {
      dispatch(fetchCoinData(coinId));
    }
  }, []);

  return (
    <div>
      {Object.keys(data.coin).length ? (
        <div className="flex flex-col p-[30px] justify-center gap-[30px] text-black dark:text-white">
          <div className="flex p-[30px] justify-center gap-[30px]">
            <h1 className={fetchCoinDataStatus === "loading" ? "" : "hidden"}>
              Fetching data...
            </h1>
            <h1 className={error ? "" : "hidden"}>Error fetching data</h1>
            <div className="flex flex-col w-[30%]">
              <div className="flex flex-col gap-5">
                <div className="bg-white dark:bg-[#1E1932] p-[80px] rounded-sm w-full flex flex-col justify-center items-center">
                  <div className="p-[10px] rounded-sm bg-[#efebe9] dark:bg-[#2C2C4A] w-[64px]">
                    <img src={data.coin.image.small} />
                  </div>
                  <h1 className="text-[30px]">{`${data.coin.id}[${data.coin.symbol}]`}</h1>
                </div>
                <CoinLink link={data.coin.links.homepage[0]} />
              </div>
            </div>
            <div className="w-[30%] h-[350px] flex flex-col gap-5 bg-white dark:bg-[#1E1932] p-[40px] rounded-sm justify-center items-center">
              <div className="flex">
                <div>
                  <h1 className="text-[15px]">{`All time high: $${data.coin.market_data.ath.usd}`}</h1>
                  <p className="text-[12px]">
                    {data.coin.market_data.ath_date.usd}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div>
                  <h1 className="text-[15px]">{`All time low: $${data.coin.market_data.atl.usd}`}</h1>
                  <p className="text-[12px]">
                    {data.coin.market_data.atl_date.usd}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[40%] bg-white dark:bg-[#1E1932] p-[40px] rounded-sm justify-center items-center flex flex-col">
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Market cap:</h2>
                <h1>${data.coin.market_data.market_cap.usd}</h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">FDV:</h2>
                <h1>${data.coin.market_data.fully_diluted_valuation.usd}</h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Volume/Market:</h2>
                <h1>
                  {data.coin.market_data.market_cap.usd /
                    data.coin.market_data.total_volume.usd}
                </h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Total Volume:</h2>
                <h1>{data.coin.market_data.total_volume.usd}</h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Circulating supply</h2>
                <h1>{data.coin.market_data.circulating_supply}</h1>
              </div>
              <div className="flex gap-[10px]">
                <h2 className="text-[15px]">Max supply</h2>
                <h1>{data.coin.market_data.max_supply}</h1>
              </div>
              <Progress
                value={
                  data.coin.market_data.circulating_supply /
                  data.coin.market_data.total_supply
                }
                className="w-[100px] h-[6px] mt-[30px]"
              />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-[20px] w-[50%]">
              <h1>Description</h1>
              <p>{data.coin.description.en}</p>
            </div>
            <div className="flex flex-col gap-[30px] w-[40%]">
              <CoinLink link={data.coin.links.blockchain_site[3]} />
              <CoinLink link={data.coin.links.blockchain_site[4]} />
              <CoinLink link={data.coin.links.blockchain_site[5]} />
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
