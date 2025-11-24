"use client";

import Logo from "../assets/Logo.svg";
import HomeIcon from "../assets/Home.svg";
import PortfolioIcon from "../assets/Portfolio.svg";
import SearchIcon from "../assets/SearchIcon.svg";
import SunIcon from "../assets/SunIcon.svg";

import { Toaster } from "@/components/ui/sonner";

import { useTheme } from "next-themes";

import Link from "next/link";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mb-[20px]">
      <div className="gap-[20px] flex items-center justify-between bg-white dark:bg-background pb-[20px] pt-[20px] pr-[5vw] pl-[5vw] w-[100vw] text-[#353570] dark:text-white">
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
            <SearchIcon className="absolute top-[15px] left-[10px]" />
            <input
              className="bg-[#CCCCFA] dark:bg-[#191925] dark:text-white p-[5px] rounded-sm pl-[40px] pb-[10px] pt-[10px] w-[350px]"
              placeholder="Search"
            ></input>
          </div>
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
