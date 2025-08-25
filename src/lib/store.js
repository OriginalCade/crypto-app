import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
    },
  });
};
