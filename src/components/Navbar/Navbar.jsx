"use client";

import Logo from "@/assets/Logo.svg";
import HomeIcon from "@/assets/Home.svg";
import PortfolioIcon from "@/assets/Portfolio.svg";
import SearchIcon from "@/assets/SearchIcon.svg";
import SunIcon from "@/assets/SunIcon.svg";
import CoinIcon from "@/assets/CoinIcon.svg";
import ExchangeIcon from "@/assets/ExchangeIcon.svg";
import BitcoinIcon from "@/assets/BitcoinIcon.svg";
import EthereumIcon from "@/assets/EthereumIcon.svg";
import UpIcon from "@/assets/UpIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchNavbarData,
  setCurrency,
} from "@/lib/features/navbarData/navbarDataSlice";
import { resetCoinList } from "@/lib/features/homeData/homeDataSlice";

import { Toaster } from "@/components/ui/sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search } from "./Search";

import { useTheme } from "next-themes";
import Link from "next/link";

import { Progress } from "@/components/ui/progress";

const Navbar = () => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();

  const {
    data: navbarData,
    fetchNavbarDataStatus,
    currency,
  } = useSelector((state) => state.navbarData);

  const { data: homeData } = useSelector((state) => state.homeData);

  const coinNames = homeData.coinList.map((item) => {
    return item.id;
  });

  const handleCurrencyChange = (value) => {
    dispatch(resetCoinList());
    dispatch(setCurrency(value));
    localStorage.setItem("currency", value);
  };

  useEffect(() => {
    if (fetchNavbarDataStatus === "idle") dispatch(fetchNavbarData());
  }, [fetchNavbarDataStatus]);

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency");
    if (storedCurrency) {
      dispatch(setCurrency(storedCurrency));
    }
  }, []);

  const global = navbarData?.data || {};
  const btcDominance = global.market_cap_percentage?.btc || 0;
  const ethDominance = global.market_cap_percentage?.eth || 0;

  return (
    <div className="mb-[20px] w-full">
      {/* Upper navabr */}
      <div className="w-full bg-[#353570] dark:bg-[#1E1932] text-white px-[5vw] py-[10px] flex items-center justify-center gap-[25px] overflow-x-auto">
        <div className="flex items-center gap-[8px] whitespace-nowrap">
          <CoinIcon />
          <span className="opacity-70">Coins</span>
          <span className="font-semibold">
            {global.active_cryptocurrencies}
          </span>
        </div>

        <div className="flex items-center gap-[8px] whitespace-nowrap">
          <ExchangeIcon />
          <span className="opacity-70">Exchange</span>
          <span className="font-semibold">{global.markets}</span>
        </div>

        <div className="flex items-center gap-[8px] whitespace-nowrap">
          <UpIcon />
          <span className="font-semibold">
            {(global.total_market_cap?.usd / 1e12).toFixed(2)} T
          </span>
        </div>

        <div className="flex items-center gap-[8px] whitespace-nowrap">
          <span className="font-semibold">
            ${(global.total_volume?.usd / 1e9).toFixed(2)}B
          </span>
          <Progress value={100} className="w-[80px] h-[6px] bg-gray-500/40" />
        </div>

        <div className="flex items-center gap-[8px] whitespace-nowrap">
          <BitcoinIcon />
          <span className="font-semibold">{btcDominance.toFixed(0)}%</span>
          <Progress value={btcDominance} className="w-[80px] h-[6px]" />
        </div>

        <div className="flex items-center gap-[8px] whitespace-nowrap">
          <EthereumIcon />
          <span className="font-semibold">{ethDominance.toFixed(0)}%</span>
          <Progress value={ethDominance} className="w-[80px] h-[6px]" />
        </div>
      </div>
      {/* Lower navabr */}
      <div className="gap-[20px] flex items-center justify-between bg-white dark:bg-background pb-[20px] pt-[20px] pr-[5vw] pl-[5vw] w-[100vw] text-[#353570] dark:text-white overflow-x-auto">
        <div className="flex gap-[10px]">
          <Logo />
          <h2>Coinipsum</h2>
        </div>

        <div className="flex gap-[20px]">
          <div className="flex gap-[10px]">
            <HomeIcon />
            <Link href="/">Home</Link>
          </div>
          <div className="flex gap-[10px]">
            <PortfolioIcon />
            <Link href="/portfolio">Portfolio</Link>
          </div>
        </div>

        <div className="flex gap-[20px]">
          <div className="flex gap-[10px] relative">
            <SearchIcon className="absolute top-[10px] left-[10px]" />
            <Search placeholder="Search" data={coinNames} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="uppercase dark:bg-[#191932] bg-[#CCCCFA66]"
              >{`$ ${currency}`}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Currency</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={currency}
                onValueChange={(value) => handleCurrencyChange(value)}
              >
                <DropdownMenuRadioItem value="USD">USD</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="GBP">GBP</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="EUR">EUR</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="BTC">BTC</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ETH">ETH</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            className="bg-[#CCCCFA] dark:bg-[#191925] p-[10px] rounded-md"
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            <SunIcon />
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
