import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoinListData = createAsyncThunk(
  "homeData/fetchCoinListData",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${params.currency}&order=market_cap_desc&per_page=50&page=${params.page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
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
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`
      );
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
    coinListPage: 1,
    fetchCoinListDataStatus: "idle",
    fetchChartDataStatus: "idle",
    error: false,
  },
  reducers: {
    resetCoinList(state) {
      state.coinListPage = 1;
      state.data.coinList = [];
    },
    increasePage(state) {
      state.coinListPage = state.coinListPage + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Coin list data */
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
      /* Chart data */
      .addCase(fetchChartData.pending, (state) => {
        state.fetchChartDataStatus = "loading";
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.fetchChartDataStatus = "succeeded";
        const priceChartData = action.payload.prices.map((item) => ({
          date: new Date(item[0]).toDateString(),
          price: item[1],
        }));
        const volumeChartData = action.payload.total_volumes.map((item) => ({
          date: new Date(item[0]).toDateString(),
          volume: item[1],
        }));
        state.data.chartData[action.meta.arg] = {
          prices: priceChartData,
          volumes: volumeChartData,
        };
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.fetchChartDataStatus = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetCoinList, increasePage } = homeDataSlice.actions;
export default homeDataSlice.reducer;
