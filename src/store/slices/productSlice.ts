import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../../api/axiosInstance";

interface Images {
  url: string;
}
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
  images: Images[];
}
interface UserData {
  products: Product[];
  total: number;
  pageCount: number;
  activePage: number;
  product: Product;
}

const initialState: UserData = {
  products: [],
  total: 0,
  pageCount: 0,
  activePage: 1,
  product: {
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    store_id: 0,
    category_id: 0,
    rating: 0,
    sell_count: 0,
    images: [],
  },
};
export const fetchProduct = createAsyncThunk(
  "fetch/product",
  async (param: any): Promise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.get(
      `products/${param}`
    );
    return response?.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "fetch/products",
  async (param: any): Promise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "products",
      param
    );
    return response?.data;
  }
);

export const fetchMoreProducts = createAsyncThunk(
  "more/products",
  async (param: any): Promise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "products",
      param
    );
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

    resetProduct: (
      state: UserData,
      action: PayloadAction<Product>
    ): UserData => {
      return { ...state, product: action.payload };
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchProduct.fulfilled, (state: UserData, action: any) => {
      return {
        ...state,
        product: action.payload,
      };
    });

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
export const { setProductData, resetProduct } = productSlice.actions;
