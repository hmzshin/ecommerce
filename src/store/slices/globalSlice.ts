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
export const fetchGlobalData = createAsyncThunk("fetch/data", async () => {
  const response: AxiosResponse | undefined = await axiosInstance.get("roles");
  console.log("global slice global data:", response?.data);
  return response?.data;
});

export const fetchCategories = createAsyncThunk(
  "fetch/categories",
  async () => {
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "categories"
    );
    console.log("global slice categories:", response?.data);
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
    builder.addCase(fetchGlobalData.fulfilled, (state, action: any) => {
      const roles = action.payload?.map((role: any) => [role.name, role.code]);
      return { ...state, roles: roles };
    });

    builder.addCase(fetchCategories.fulfilled, (state, action: any) => {
      return { ...state, categories: action.payload };
    });
  },
});

export default globalSlice.reducer;
export const { setGlobalData, updateLanguage } = globalSlice.actions;
