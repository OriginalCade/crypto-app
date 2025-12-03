import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo";
import selectedChartsReducer from "./features/selectedCharts";
import portfolioDataReducer from "./features/portfolioData/portfolioDataSlice";
import homeDataReducer from "./features/homeData/homeDataSlice";
import coinPageDataReducer from "./features/coinPageData/coinPageDataSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
      selectedCharts: selectedChartsReducer,
      portfolioData: portfolioDataReducer,
      homeData: homeDataReducer,
      coinPageData: coinPageDataReducer,
    },
  });
};
