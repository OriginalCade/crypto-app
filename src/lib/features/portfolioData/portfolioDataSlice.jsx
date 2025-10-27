import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPortfolioData = createAsyncThunk(
  "portfolioData/fetchPortfolioData",
  async (coin, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.coinName}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const portfolioDataSlice = createSlice({
  name: "portfolioData",
  initialState: {
    data: {
      coins: {},
    },
    status: "idle",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.coins[action.meta.arg.coinNum] = { ...action.payload[0] };
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default portfolioDataSlice.reducer;
