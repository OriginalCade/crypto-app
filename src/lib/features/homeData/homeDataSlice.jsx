import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoinListData = createAsyncThunk(
  "homeData/fetchCoinListData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchChartData = createAsyncThunk(
  "homeData/fetchChartData",
  async (coin, thunkAPI) => {
    try {
      /* eslint-disable quotes */
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`
      );
      /* eslint-enable quotes */
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const homeDataSlice = createSlice({
  name: "homeData",
  initialState: {
    data: {
      coinList: [],
      chartData: {},
    },
    fetchCoinListDataStatus: "idle",
    fetchChartDataStatus: "idle",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch Coin List Data
      .addCase(fetchCoinListData.pending, (state) => {
        state.fetchCoinListDataStatus = "loading";
      })
      .addCase(fetchCoinListData.fulfilled, (state, action) => {
        state.fetchCoinListDataStatus = "succeeded";
        state.data.coinList = [...state.data.coinList, ...action.payload];
      })
      .addCase(fetchCoinListData.rejected, (state, action) => {
        state.fetchCoinListDataStatus = "failed";
        state.error = action.payload || "Something went wrong";
      })
      //Fetch Chart data
      .addCase(fetchChartData.pending, (state) => {
        state.fetchChartDataStatus = "loading";
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.fetchChartDataStatus = "succeeded";
        const priceChartData = action.payload.prices.map((item) => {
          const itemDate = new Date(item[0]).toDateString();
          return { date: itemDate, price: item[1] };
        });
        const volumeChartData = action.payload.total_volumes.map((item) => {
          const itemDate = new Date(item[0]).toDateString();
          return { date: itemDate, volume: item[1] };
        });
        const newChartData = {
          ...state.data.chartData,
          [action.meta.arg]: {
            prices: priceChartData,
            volumes: volumeChartData,
          },
        };
        state.data.chartData = newChartData;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.fetchChartDataStatus = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default homeDataSlice.reducer;
