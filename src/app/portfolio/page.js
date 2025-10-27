"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPortfolioData } from "@/lib/features/portfolioData/portfolioDataSlice";

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.portfolioData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPortfolioData({ coinNum: "coin1", coinName: "bitcoin" }));
      dispatch(fetchPortfolioData({ coinNum: "coin2", coinName: "ethereum" }));
    }
  }, [status]);
  return (
    <div>
      <h1>{status == "succeeded" ? data.coins.coin1?.name : "loading..."}</h1>
      <h1>{status == "succeeded" ? data.coins.coin2?.name : "loading..."}</h1>
    </div>
  );
};

export default PortfolioPage;
