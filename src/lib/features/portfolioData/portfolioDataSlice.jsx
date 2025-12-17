import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNewCoin = createAsyncThunk(
  "portfolioData/fetchNewCoin",
  async (coin, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.coinName}/history?date=${coin.coinDate}&localization=false`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCoinNames = createAsyncThunk(
  "portfolioData/fetchCoinNames",
  async (thunkAPI) => {
    try {
      /* eslint-disable quotes */
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      /* eslint-enable quotes */
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCurrentCoin = createAsyncThunk(
  "portfolioData/fetchCurrentCoin",
  async (coin, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
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
      userCoins: {},
      currentCoins: {},
      currentCoinNames: [],
      coinNames: [],
    },
    options: {
      coin: "",
      amount: 0,
      date: "",
    },
    fetchNewCoinStatus: "idle",
    fetchCoinNamesStatus: "idle",
    fetchCurrentCoinStatus: "idle",
    error: false,
  },
  reducers: {
    setSelectedCoin(state, action) {
      state.options.coin = action.payload;
    },

    setSelectedDate(state, action) {
      state.options.date = action.payload;
    },

    setSelectedAmount(state, action) {
      state.options.amount = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch New Coin
      .addCase(fetchNewCoin.pending, (state) => {
        state.fetchNewCoinStatus = "loading";
      })
      .addCase(fetchNewCoin.fulfilled, (state, action) => {
        state.fetchNewCoinStatus = "succeeded";
        state.data.userCoins[action.meta.arg.coinNum] = {
          data: action.payload,
          date: action.meta.arg.coinDate,
          amount: action.meta.arg.coinAmount,
        };
        if (!state.data.currentCoinNames.includes(action.meta.arg.coinName)) {
          state.data.currentCoinNames = [
            ...state.data.currentCoinNames,
            action.meta.arg.coinName,
          ];
        }
      })
      .addCase(fetchNewCoin.rejected, (state, action) => {
        state.fetchNewCoinStatus = "failed";
        state.error = action.payload || "Something went wrong";
      })
      //Fetch Coin Names
      .addCase(fetchCoinNames.pending, (state) => {
        state.fetchCoinNamesStatus = "loading";
      })
      .addCase(fetchCoinNames.fulfilled, (state, action) => {
        state.fetchCoinNamesStatus = "succeeded";
        state.data.coinNames = action.payload.map((item) => {
          return item.id;
        });
      })
      .addCase(fetchCoinNames.rejected, (state, action) => {
        state.fetchCoinNamesStatus = "failed";
        state.error = action.payload || "Something went wrong";
      })
      //Fetch Current Coin
      .addCase(fetchCurrentCoin.pending, (state) => {
        state.fetchCurrentCoinStatus = "loading";
      })
      .addCase(fetchCurrentCoin.fulfilled, (state, action) => {
        state.fetchCurrentCoinStatus = "succeeded";
        state.data.currentCoins = {
          ...state.data.currentCoins,
          [action.payload[0].id]: action.payload[0],
        };
        state.fetchCurrentCoinStatus = "idle";
      })
      .addCase(fetchCurrentCoin.rejected, (state, action) => {
        state.fetchCurrentCoinStatus = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setSelectedCoin, setSelectedDate, setSelectedAmount, setData } =
  portfolioDataSlice.actions;

export default portfolioDataSlice.reducer;
