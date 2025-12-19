"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedAmount,
  fetchNewCoin,
} from "@/lib/features/portfolioData/portfolioDataSlice";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Combobox } from "./ComboBox";
import { DatePicker } from "./DatePicker";

import CoinPercentage from "../coinTable/CoinPercentage";
import Stat from "./Stat";

const UserCoinList = ({ data }) => {
  const dispatch = useDispatch();
  const { options } = useSelector((state) => state.portfolioData);

  const handleEditCoin = (coinId) => {
    if (options.coin !== "" && options.date !== "" && options.amount !== 0) {
      dispatch(
        fetchNewCoin({
          coinNum: `${coinId}`,
          coinName: options.coin,
          coinAmount: options.amount,
          coinDate: options.date,
        })
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {Object.keys(data.userCoins).map((coinId) => {
        const coin = data.userCoins[coinId].data;
        const coinAmount = data.userCoins[coinId].amount;
        const coinDate = data.userCoins[coinId].date;
        const currentCoin = data.currentCoins[coin.id];

        if (!coin || !currentCoin) return null;

        const profit =
          (currentCoin.current_price - coin.market_data.current_price.usd) *
          coinAmount;

        const isProfitPositive = profit >= 0;

        return (
          <div
            key={coinId}
            className="grid grid-cols-1 md:grid-cols-[240px_1fr] rounded-2xl dark:bg-gradient-to-br bg-white from-[#0F1023] via-[#16173A] to-[#0B0C1D] p-6 dark:text-white shadow-xl text-black"
          >
            {/* LEFT — COIN INFO */}
            <div className="flex flex-col items-center justify-center gap-4 border-b md:border-b-0 md:border-r dark:border-white/10 border-[#6161D680] pb-6 md:pb-0 md:pr-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl dark:bg-white/10 bg-[#CCCCFA66]">
                <img
                  src={coin.image.small}
                  alt={coin.name}
                  className="h-8 w-8"
                />
              </div>

              <h2 className="text-xl font-semibold text-center">
                {coin.name}{" "}
                <span className="dark:text-white/60 text-black">
                  ({coin.symbol.toUpperCase()})
                </span>
              </h2>
            </div>

            {/* RIGHT — STATS */}
            <div className="flex flex-col gap-6 md:pl-6">
              {/* MARKET PRICE HEADER */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Market price</h3>

                <AlertDialog>
                  <AlertDialogTrigger className="rounded-md bg-indigo-500/20 px-3 py-2 text-sm hover:bg-indigo-500/30">
                    Edit
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Save your edits</AlertDialogTitle>
                      <AlertDialogDescription>
                        Please select all three options
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <Combobox data={data.coinNames} />
                    <DatePicker />
                    <input
                      type="number"
                      className="rounded-md border p-2"
                      onChange={(e) =>
                        dispatch(setSelectedAmount(e.target.value))
                      }
                      placeholder="Amount of coins"
                    />

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleEditCoin(coinId)}>
                        Save
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* MARKET PRICE STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <Stat
                  label="Current price"
                  value={`$${currentCoin.current_price.toLocaleString()}`}
                />

                <Stat
                  label="Price change 24h"
                  custom={
                    <CoinPercentage
                      price_percentage={
                        currentCoin.price_change_percentage_24h_in_currency
                      }
                    />
                  }
                />

                <Stat
                  label="Market cap vs volume"
                  progress={
                    (currentCoin.total_volume / currentCoin.market_cap) * 100
                  }
                />

                <Stat
                  label="Circ supply vs max supply"
                  progress={
                    (currentCoin.circulating_supply /
                      currentCoin.total_supply) *
                    100
                  }
                />
              </div>

              <div className="h-px w-full dark:bg-white/10 bg-[#6161D680]" />

              {/* YOUR COIN */}
              <h3 className="text-lg font-semibold">Your coin</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <Stat
                  label="Coin price"
                  value={`$${coin.market_data.current_price.usd.toFixed(0)}`}
                />

                <Stat
                  label="Total value"
                  value={`$${(
                    coin.market_data.current_price.usd * coinAmount
                  ).toFixed(0)}`}
                />

                <Stat
                  label="Profit"
                  value={`$${(
                    (currentCoin.current_price -
                      coin.market_data.current_price.usd) *
                    coinAmount
                  ).toFixed(0)}`}
                  positive={isProfitPositive}
                />

                <Stat label="Purchase date" value={coinDate} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCoinList;
