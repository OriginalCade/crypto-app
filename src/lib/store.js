import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo";
import selectedChartsReducer from "./features/selectedCharts";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
      selectedCharts: selectedChartsReducer,
    },
  });
};
