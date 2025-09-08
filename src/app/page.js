"use client";

import StoreProvider from "./StoreProvider";
import { useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import axios from "axios";
import { Progress } from "@/components/ui/progress";

import UpIcon from "../assets/UpIcon.svg";
import DownIcon from "../assets/DownIcon.svg";

const List = () => {
  const todos = useAppSelector((state) => state.todos);

  return (
    <div>
      {todos.map((item) => {
        return <p key={item.id}>{item.task}</p>;
      })}
    </div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [coinList, setCoinList] = useState([]);

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

  useEffect(() => {
    fetchCoinListData();
  }, []);

  return (
    <StoreProvider>
      <List />
      <main className="m-[20px]">
        <p>{isLoading ? "Fetching data..." : ""}</p>
        <div className="flex gap-[60px] pl-[50px]">
          <p>#</p>
          <h1>Name</h1>
          <h1>Price</h1>
          <p>1h%</p>
          <p>24h%</p>
          <p>7d%</p>
        </div>
        <div className="flex flex-col gap-[8px]">
          {coinList.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-[20px] bg-[#191925] p-[20px] rounded-md items-center"
            >
              <p>{index + 1}</p>
              <div className="flex items-center gap-[16px] w-[208px] flex-wrap">
                <img src={item.image} className="w-[32px]"></img>
                <h1 className="align-baseline">{`${
                  item.name
                }[${item.symbol.toUpperCase()}]`}</h1>
              </div>
              <p>{`$${item.current_price.toFixed(2)}`}</p>
              <div className="flex items-center gap-[4px]">
                {item.price_change_percentage_1h_in_currency >= 0 ? (
                  <UpIcon />
                ) : (
                  <DownIcon />
                )}
                <p
                  className={
                    item.price_change_percentage_1h_in_currency >= 0
                      ? "text-[#01F1E3]"
                      : "text-[#FE2264]"
                  }
                >
                  {item.price_change_percentage_1h_in_currency
                    ? `${item.price_change_percentage_1h_in_currency.toFixed(
                        2
                      )}%`
                    : "null"}
                </p>
              </div>
              <div className="flex items-center gap-[4px]">
                {item.price_change_percentage_24h_in_currency >= 0 ? (
                  <UpIcon />
                ) : (
                  <DownIcon />
                )}
                <p
                  className={
                    item.price_change_percentage_24h_in_currency >= 0
                      ? "text-[#01F1E3]"
                      : "text-[#FE2264]"
                  }
                >
                  {item.price_change_percentage_24h_in_currency
                    ? `${item.price_change_percentage_24h_in_currency.toFixed(
                        2
                      )}%`
                    : "null"}
                </p>
              </div>
              <div className="flex items-center gap-[4px]">
                {item.price_change_percentage_7d_in_currency >= 0 ? (
                  <UpIcon />
                ) : (
                  <DownIcon />
                )}
                <p
                  className={
                    item.price_change_percentage_7d_in_currency >= 0
                      ? "text-[#01F1E3]"
                      : "text-[#FE2264]"
                  }
                >
                  {item.price_change_percentage_7d_in_currency
                    ? `${item.price_change_percentage_7d_in_currency.toFixed(
                        2
                      )}%`
                    : "null"}
                </p>
              </div>
              <Progress
                value={(item.total_volume / item.market_cap) * 100}
                className="w-[228px] h-[6px]"
              />
              <Progress
                value={(item.circulating_supply / item.total_supply) * 100}
                className="w-[228px] h-[6px]"
              />
            </div>
          ))}
        </div>
        <p>{hasError ? "ERROR" : ""}</p>
      </main>
    </StoreProvider>
  );
}
