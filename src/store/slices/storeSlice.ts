import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserData {}

const initialState: UserData = {};

export const storeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStore: (state: UserData, action: PayloadAction<UserData>): UserData => {
      return { ...state, ...action.payload };
    },
  },
});

export default storeSlice.reducer;
export const { setStore } = storeSlice.actions;
