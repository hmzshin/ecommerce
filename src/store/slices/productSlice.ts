import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../../api/axiosInstance";

interface UserData {
  products: string[];
  total_product_count: number;
  page_count: number;
  active_page: number;
  fetch_state: string;
}

const initialState: UserData = {
  products: [],
  total_product_count: 0,
  page_count: 0,
  active_page: 0,
  fetch_state: "",
};

export const fetchProducts = createAsyncThunk(
  "fetch/products",
  async (param: any): Promise<void> => {
    console.log("parameters", param);
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "products",
      param
    );
    console.log("product response data", response?.data);
    return response?.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (
      state: UserData,
      action: PayloadAction<UserData>
    ): UserData => {
      return { ...state, ...action.payload };
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state: UserData, action: any) => {
      return {
        ...state,
        products: action.payload.products,
        total_product_count: action.payload.total,
      };
    });
  },
});

export default productSlice.reducer;
export const { setProductData } = productSlice.actions;
