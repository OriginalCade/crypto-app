"use client";

import CoinPercentage from "../coinTable/CoinPercentage";

import { Progress } from "../ui/progress";

const UserCoinList = ({ data }) => {
  function generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  return (
    <div className="flex flex-col gap-5">
      {Object.keys(data.userCoins).map((coinId) => {
        const coin = data.userCoins[coinId].data;
        const coinAmount = data.userCoins[coinId].amount;
        const coinDate = data.userCoins[coinId].date;
        const currentCoin = data.currentCoins[coin.id];

        if (!coin)
          return (
            <div key={generateId()}>coin is either loading or not found</div>
          );
        if (!currentCoin)
          return (
            <div key={generateId()}>
              current coin is either loading or not found
            </div>
          );

        return (
          <div key={generateId()} className="flex items-center h-[300px]">
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
