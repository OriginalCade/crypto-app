"use client";

import StoreProvider from "./StoreProvider";
import { useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import axios from "axios";

import CoinTable from "@/components/coinTable/CoinTable";

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
        <CoinTable coinList={coinList} />
        <p>{hasError ? "ERROR" : ""}</p>
      </main>
    </StoreProvider>
  );
}
