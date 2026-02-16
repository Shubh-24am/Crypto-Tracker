import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./watchlistSlice";
import userReducer from "./userSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cryptoState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cryptoState", serializedState);
  } catch {
    // ignore write errors
  }
};

export const cryptoStore = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    user: userReducer,
  },
  preloadedState: loadState(),
});

cryptoStore.subscribe(() => {
  saveState({
    watchlist: cryptoStore.getState().watchlist,
    user: cryptoStore.getState().user,
  });
});