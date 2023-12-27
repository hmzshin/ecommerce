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
}

const initialState: UserData = {
  products: [],
};

export const fetchBestseller = createAsyncThunk(
  "fetch/bestsellers",
  async (param: any): Promise<void> => {
    console.log("param", param);
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "products",
      param
    );
    console.log("bestsellers response", response?.data);
    return response?.data;
  }
);

export const bestsellerSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setBestseller: (
      state: UserData,
      action: PayloadAction<Product[]>
    ): UserData => {
      return { ...state, products: [...action.payload] };
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchBestseller.fulfilled, (state, action: any) => {
      return { ...state, products: [...action.payload.products] };
    });
  },
});

export default bestsellerSlice.reducer;
export const { setBestseller } = bestsellerSlice.actions;
