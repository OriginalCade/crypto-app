"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCoinNames,
  fetchNewCoin,
  fetchCurrentCoin,
  setSelectedAmount,
  setData,
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

import { Combobox } from "@/components/portfolioPage/ComboBox";
import { DatePicker } from "@/components/portfolioPage/DatePicker";
import UserCoinList from "@/components/portfolioPage/UserCoinList";

const PortfolioPage = () => {
  const dispatch = useDispatch();

  const {
    data,
    fetchNewCoinStatus,
    fetchCoinNamesStatus,
    fetchCurrentCoinStatus,
    options,
  } = useSelector((state) => state.portfolioData);

  const totalCoins = Object.keys(data.userCoins).length;
  const allDataLoaded =
    Object.keys(data.userCoins).length > 0 &&
    Object.keys(data.currentCoins).length > 0;
  const loading =
    fetchCoinNamesStatus === "loading" &&
    fetchCurrentCoinStatus === "loading" &&
    fetchNewCoinStatus === "loading";

  const currentCoinNames = useSelector(
    (state) => state.portfolioData.data.currentCoinNames
  );

  const handleCurrentCoinFetch = async (dispatch) => {
    for (let i = 0; i < data.currentCoinNames.length; i++) {
      await dispatch(fetchCurrentCoin(data.currentCoinNames[i]));
    }
  };

  const handleAddCoin = () => {
    if (options.coin !== "" && options.date !== "" && options.amount !== 0) {
      dispatch(
        fetchNewCoin({
          coinNum: `coin${totalCoins + 1}`,
          coinName: options.coin,
          coinAmount: options.amount,
          coinDate: options.date,
        })
      );
    }
  };

  useEffect(() => {
    if (fetchCoinNamesStatus === "idle") {
      dispatch(fetchCoinNames());
    }
  }, []);

  useEffect(() => {
    if (fetchCurrentCoinStatus === "idle") {
      handleCurrentCoinFetch(dispatch);
    }
  }, [currentCoinNames]);

  useEffect(() => {
    const localData = localStorage.getItem("portfolioData");
    if (localData) {
      dispatch(setData(JSON.parse(localData)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolioData", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          className={"bg-[#7878FA] rounded-sm p-[10px] m-[10px]"}
        >
          Add Coin
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add your coin</AlertDialogTitle>
            <AlertDialogDescription>
              Please select all three options
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Combobox data={data.coinNames} />
          <DatePicker />
          <input
            type={"number"}
            onChange={(e) => dispatch(setSelectedAmount(e.target.value))}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAddCoin()}>
              Add coin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div>
        {allDataLoaded && loading === false ? (
          <UserCoinList data={data} coinNames={data.coinNames} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
