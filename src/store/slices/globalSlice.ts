import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../api/axiosInstance";
import { AxiosResponse } from "axios";

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
export const fetchGlobalData = createAsyncThunk("fetch/data", async () => {
  const response: AxiosResponse | undefined = await AxiosInstance.get("roles");
  console.log("naber", response?.data);
  return response?.data;
});

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

  extraReducers(builder) {
    builder.addCase(fetchGlobalData.fulfilled, (state, action: any) => {
      const roles = action.payload?.map((role: any) => [role.name, role.code]);
      state.roles = roles;
    });
  },
});

export default globalSlice.reducer;
export const { setGlobalData, updateLanguage } = globalSlice.actions;
