import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../../api/axiosInstance";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  store_id: number;
  category_id: number;
  rating: number;
  sell_count: number;
  images: string;
}
interface UserData {
  products: Product[];
  total: number;
  pageCount: number;
  activePage: number;
}

const initialState: UserData = {
  products: [],
  total: 0,
  pageCount: 0,
  activePage: 1,
};

export const fetchProducts = createAsyncThunk(
  "fetch/products",
  async (param: any): Promise<void> => {
    console.log("param", param);
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "products",
      param
    );
    console.log("product response data", response?.data);
    return response?.data;
  }
);

export const fetchMoreProducts = createAsyncThunk(
  "more/products",
  async (param: any): Promise<void> => {
    console.log("param", param);
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "products",
      param
    );
    console.log("product fetch more data response data", response?.data);
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
        products: [...action.payload.products],
        total: action.payload.total,
        activePage: 1,
      };
    });
    builder.addCase(
      fetchMoreProducts.fulfilled,
      (state: UserData, action: any) => {
        return {
          ...state,
          products: [...state.products, ...action.payload.products],
          activePage: state.activePage + 1,
        };
      }
    );
  },
});

export default productSlice.reducer;
export const { setProductData } = productSlice.actions;
