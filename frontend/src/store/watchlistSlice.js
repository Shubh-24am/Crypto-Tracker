import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: [],
  reducers: {
    handleAddcoin(state, action) {
      const coin = action.payload;
      const exists = state.some((item) => item.id === coin.id);
      if (!exists) {
        state.push(coin);
      }
    },
    handleremovecoin(state, action) {
      const coin = action.payload;
      return state.filter((item) => item.id !== coin.id);
    },
    clearWatchlist() {
      return [];
    },
  },
});

export const { handleAddcoin, handleremovecoin, clearWatchlist } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;