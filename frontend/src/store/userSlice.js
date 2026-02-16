import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    setuser(state, action) {
      return action.payload; // e.g. username or token
    },
    removeuser() {
      return "";
    },
  },
});

export const { setuser, removeuser } = userSlice.actions;
export default userSlice.reducer;