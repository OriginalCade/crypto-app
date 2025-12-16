import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNavbarData = createAsyncThunk(
  "navbarData/fetchNavbarData",
  async (_, thunkAPI) => {
    try {
      /* eslint-disable quotes */
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/global`
      );
      /* eslint-enable quotes */
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const navbarDataSlice = createSlice({
  name: "navbarData",
  initialState: {
    data: {},
    currency: "usd",
    fetchNavbarDataStatus: "idle",
    error: false,
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Navbar Data
      .addCase(fetchNavbarData.pending, (state) => {
        state.fetchNavbarDataStatus = "loading";
      })
      .addCase(fetchNavbarData.fulfilled, (state, action) => {
        state.fetchNavbarDataStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchNavbarData.rejected, (state, action) => {
        state.fetchNavbarDataStatus = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setCurrency } = navbarDataSlice.actions;
export default navbarDataSlice.reducer;
