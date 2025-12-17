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

import { Progress } from "../ui/progress";

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
    <div className="flex flex-col gap-5">
      {Object.keys(data.userCoins).map((coinId) => {
        const coin = data.userCoins[coinId].data;
        const coinAmount = data.userCoins[coinId].amount;
        const coinDate = data.userCoins[coinId].date;
        const currentCoin = data.currentCoins[coin.id];

        if (!coin)
          return <div key={coinId}>coin is either loading or not found</div>;
        if (!currentCoin)
          return (
            <div key={coinId}>current coin is either loading or not found</div>
          );

        return (
          <div key={coinId} className="flex items-center h-[300px]">
            <div className="bg-[#1E1932] h-[100%] flex flex-col justify-center items-center p-[20px]">
              <div className="p-[30px] bg-[#2C2C4A] rounded-2xl w-[90px]">
                <img src={coin.image.small} className="w-[30px] h-[30px]" />
              </div>
              <h1 className="text-[30px]">{`${
                coin.name
              }[${coin.symbol.toUpperCase()}]`}</h1>
            </div>
            <div className="bg-[#191932] h-[100%]">
              {/* current coin */}
              <AlertDialog>
                <AlertDialogTrigger
                  className={"bg-[#7878FA] rounded-sm p-[10px] m-[10px] ml-140"}
                >
                  Edit coin
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
                    type={"number"}
                    onChange={(e) =>
                      dispatch(setSelectedAmount(e.target.value))
                    }
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleEditCoin(coinId)}>
                      Add coin
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <div className="p-[20px] h-[45%] flex items-center">
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <h1>Current Price</h1>
                    <div>{`$${currentCoin.current_price}`}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1>Price change 24h</h1>
                    <CoinPercentage
                      price_percentage={
                        currentCoin.price_change_percentage_24h_in_currency
                      }
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <h1>Market cap vs Total volume</h1>
                    <Progress
                      value={
                        (currentCoin.total_volume / currentCoin.market_cap) *
                        100
                      }
                      className="w-[100px] h-[6px]"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <h1>Circ supply vs Max supply</h1>
                    <Progress
                      value={
                        (currentCoin.circulating_supply /
                          currentCoin.total_supply) *
                        100
                      }
                      className="w-[100px] h-[6px]"
                    />
                  </div>
                </div>
              </div>
              {/* user coin */}
              <div className="p-[20px] h-[45%] flex items-center">
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <h1>Coin price</h1>
                    <p>{`$${coin.market_data.current_price.usd.toFixed(0)}`}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1>Coin total</h1>
                    <p>{`${coinAmount} coins: $${(
                      coin.market_data.current_price.usd * coinAmount
                    ).toFixed(0)}`}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1>Profit</h1>
                    <p>{`$${(
                      (currentCoin.current_price -
                        coin.market_data.current_price.usd) *
                      coinAmount
                    ).toFixed(0)}`}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1>Date purchased</h1>
                    <p>{coinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCoinList;
