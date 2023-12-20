import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserData {
  roles: string[];
  categories: string[];
  language: string;
  theme: string;
}

const initialState: UserData = {
  roles: [],
  categories: [],
  language: "tr",
  theme: "light",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalData: (
      state: UserData,
      action: PayloadAction<UserData>
    ): UserData => {
      return { ...state, ...action.payload };
    },
    updateLanguage: (
      state: UserData,
      action: PayloadAction<string>
    ): UserData => {
      return { ...state, language: action.payload };
    },
  },
});

export default globalSlice.reducer;
export const { setGlobalData, updateLanguage } = globalSlice.actions;
