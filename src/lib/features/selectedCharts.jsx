import { createAction, createReducer } from "@reduxjs/toolkit";

const ADD_SELECTED = "ADD_SELECTED";

const selectedChartsReducer = createReducer([], (builder) => {
  builder.addCase("ADD_SELECTED", (state, action) => {
    if (!state.includes(action.payload)) {
      if (state.length < 3) {
        state.push(action.payload);
      }
    } else {
      if (state.length > 0) {
        return state.filter((item) => item !== action.payload);
      }
    }
  });
});

export const addSelected = createAction(ADD_SELECTED);

export default selectedChartsReducer;
