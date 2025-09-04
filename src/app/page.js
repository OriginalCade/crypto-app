"use client";

import StoreProvider from "./StoreProvider";
import { useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import axios from "axios";

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
        {coinList.map((item) => (
          <div key={item.id} className="flex gap-[20px]">
            <img src={item.image} className="w-[30px]"></img>
            <h1>{`${item.name}[${item.symbol.toUpperCase()}]`}</h1>
            <p>{item.current_price}</p>
            <p>
              {item.price_change_percentage_1h_in_currency
                ? `${item.price_change_percentage_1h_in_currency.toFixed(2)}%`
                : "null"}
            </p>
            <p>
              {item.price_change_percentage_24h_in_currency
                ? `${item.price_change_percentage_24h_in_currency.toFixed(2)}%`
                : "null"}
            </p>
            <p>
              {item.price_change_percentage_7d_in_currency
                ? `${item.price_change_percentage_7d_in_currency.toFixed(2)}%`
                : "null"}
            </p>
          </div>
        ))}
        <p>{hasError ? "ERROR" : ""}</p>
      </main>
    </StoreProvider>
  );
}
