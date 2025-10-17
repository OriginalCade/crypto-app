"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPortfolioData } from "@/lib/features/portfolioData/portfolioDataSlice";

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.portfolioData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPortfolioData("bitcoin"));
      dispatch(fetchPortfolioData("ethereum"));
    }
  }, [status, dispatch]);
  return (
    <div>
      <h1>{data.coins[0] ? data.coins[0].name : "loading..."}</h1>
      <h1>{data.coins[1] ? data.coins[1].name : "loading..."}</h1>
    </div>
  );
};

export default PortfolioPage;
