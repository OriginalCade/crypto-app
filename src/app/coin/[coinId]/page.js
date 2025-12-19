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

  const { coin } = data;

  useEffect(() => {
    if (fetchCoinDataStatus !== "loading") {
      dispatch(fetchCoinData(coinId));
    }
  }, [coinId]);

  return (
    <div className="w-full">
      {Object.keys(coin).length ? (
        <div className="flex flex-col gap-6 p-4 md:p-[30px] text-black dark:text-white">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-[30px]">
            <h1 className={fetchCoinDataStatus === "loading" ? "" : "hidden"}>
              Fetching data...
            </h1>
            <h1 className={error ? "" : "hidden"}>Error fetching data</h1>

            {/* Coin info */}
            <div className="w-full md:w-[30%]">
              <div className="flex flex-col gap-5">
                <div className="bg-white dark:bg-[#1E1932] p-6 md:p-[80px] rounded-sm flex flex-col items-center">
                  <div className="p-2 rounded-sm bg-[#efebe9] dark:bg-[#2C2C4A] w-16 h-16 flex items-center justify-center">
                    <img
                      src={coin.image.small}
                      alt={coin.id}
                      className="max-w-full"
                    />
                  </div>
                  <h1 className="text-xl md:text-[30px] mt-4 text-center">
                    {coin.id} [{coin.symbol}]
                  </h1>
                </div>

                <CoinLink link={coin.links.homepage[0]} />
              </div>
            </div>

            {/* ATH / ATL */}
            <div className="w-full md:w-[30%] bg-white dark:bg-[#1E1932] p-4 md:p-[40px] rounded-sm flex flex-col gap-6 justify-center">
              <div>
                <h1 className="text-sm md:text-[15px]">
                  All time high: ${coin.market_data.ath.usd}
                </h1>
                <p className="text-xs opacity-70">
                  {coin.market_data.ath_date.usd}
                </p>
              </div>

              <div>
                <h1 className="text-sm md:text-[15px]">
                  All time low: ${coin.market_data.atl.usd}
                </h1>
                <p className="text-xs opacity-70">
                  {coin.market_data.atl_date.usd}
                </p>
              </div>
            </div>

            {/* Market data */}
            <div className="w-full md:w-[40%] bg-white dark:bg-[#1E1932] p-4 md:p-[40px] rounded-sm flex flex-col gap-3">
              {[
                ["Market cap", coin.market_data.market_cap.usd],
                ["FDV", coin.market_data.fully_diluted_valuation.usd],
                [
                  "Volume / Market",
                  coin.market_data.market_cap.usd /
                    coin.market_data.total_volume.usd,
                ],
                ["Total Volume", coin.market_data.total_volume.usd],
                ["Circulating supply", coin.market_data.circulating_supply],
                ["Max supply", coin.market_data.max_supply],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 text-sm">
                  <span className="opacity-70">{label}</span>
                  <span className="font-medium truncate">{value}</span>
                </div>
              ))}

              <Progress
                value={
                  (coin.market_data.circulating_supply /
                    coin.market_data.total_supply) *
                  100
                }
                className="w-full h-[6px] mt-4"
              />
            </div>
          </div>

          {/* Description + links */}
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="w-full md:w-[50%] flex flex-col gap-3">
              <h1 className="text-lg font-semibold">Description</h1>
              <p className="text-sm leading-relaxed line-clamp-6 md:line-clamp-none">
                {coin.description.en}
              </p>
            </div>

            <div className="w-full md:w-[40%] flex flex-col gap-4">
              <CoinLink link={coin.links.blockchain_site[3]} />
              <CoinLink link={coin.links.blockchain_site[4]} />
              <CoinLink link={coin.links.blockchain_site[5]} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CoinPage;
