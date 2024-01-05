import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";
import { AxiosResponse } from "axios";

interface Category {
  id: number;
  code: string;
  gender: string;
  title: string;
  rating: number;
  img: string;
}
interface Role {
  id: number;
  name: string;
  code: string;
}

interface GlobalData {
  roles: Role[];
  categories: Category[];
  language: string;
  theme: string;
}

const initialState: GlobalData = {
  roles: [],
  categories: [],
  language: "tr",
  theme: "light",
};
export const fetchRoles = createAsyncThunk("fetch/data", async () => {
  const response: AxiosResponse | undefined = await axiosInstance.get("roles");
  return response?.data;
});

export const fetchCategories = createAsyncThunk(
  "fetch/categories",
  async () => {
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "categories"
    );
    return response?.data;
  }
);

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalData: (
      state: GlobalData,
      action: PayloadAction<GlobalData>
    ): GlobalData => {
      return { ...state, ...action.payload };
    },
    updateLanguage: (
      state: GlobalData,
      action: PayloadAction<string>
    ): GlobalData => {
      return { ...state, language: action.payload };
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchRoles.fulfilled, (state, action: any) => {
      return { ...state, roles: action.payload };
    });

    builder.addCase(fetchCategories.fulfilled, (state, action: any) => {
      return { ...state, categories: action.payload };
    });
  },
});

export default globalSlice.reducer;
export const { setGlobalData, updateLanguage } = globalSlice.actions;
