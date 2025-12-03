import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoinData = createAsyncThunk(
  "coinPageData/fetchCoinData",
  async (coin, thunkAPI) => {
    try {
      /* eslint-disable quotes */
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
      );
      /* eslint-enable quotes */
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const coinPageDataSlice = createSlice({
  name: "coinPageData",
  initialState: {
    data: {
      coin: {},
    },
    fetchCoinDataStatus: "idle",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch Coin Data
      .addCase(fetchCoinData.pending, (state) => {
        state.fetchCoinDataStatus = "loading";
      })
      .addCase(fetchCoinData.fulfilled, (state, action) => {
        state.fetchCoinDataStatus = "succeeded";
        state.data.coin = action.payload;
      })
      .addCase(fetchCoinData.rejected, (state, action) => {
        state.fetchCoinDataStatus = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default coinPageDataSlice.reducer;
