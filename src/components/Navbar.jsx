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
    <div className="gap-[20px] flex content-center justify-between bg-white dark:bg-background p-[20px] w-[100vw] text-[#353570] dark:text-white">
      <div className="flex gap-[10px]">
        <Logo />
        <h2>Logoipsm</h2>
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
          <SearchIcon className="absolute top-[10px] left-[5px]" />
          <input
            className="bg-[#CCCCFA] dark:bg-[#191925] dark:text-white p-[5px] rounded-sm pl-[30px]"
            placeholder="Search"
          ></input>
        </div>
        <button
          className="bg-[#CCCCFA] dark:bg-[#191925] p-[5px] rounded-md"
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <SunIcon />
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
