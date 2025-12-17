import { createSlice } from "@reduxjs/toolkit";

const converterDataSlice = createSlice({
  name: "converterData",
  initialState: {
    data: {
      sellingCoin: "",
      sellingAmount: 0,
      buyingCoin: "",
    },
    enabled: false,
  },
  reducers: {
    toggleConverter(state) {
      if (state.enabled === false) {
        state.enabled = true;
      } else {
        state.enabled = false;
      }
    },
    setSellingCoin(state, action) {
      state.data.sellingCoin = action.payload;
    },
    setSellingAmount(state, action) {
      state.data.sellingAmount = action.payload;
    },
    setBuyingCoin(state, action) {
      state.data.buyingCoin = action.payload;
    },
  },
  extraReducers: () => {},
});

export const {
  toggleConverter,
  setSellingCoin,
  setSellingAmount,
  setBuyingCoin,
} = converterDataSlice.actions;

export default converterDataSlice.reducer;
