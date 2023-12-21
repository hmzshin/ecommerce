import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserData {
  product_list: string[];
  total_product_count: number;
  page_count: number;
  active_page: number;
  fetch_state: string;
}

const initialState: UserData = {
  product_list: [],
  total_product_count: 0,
  page_count: 0,
  active_page: 0,
  fetch_state: "",
};

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
});

export default productSlice.reducer;
export const { setProductData } = productSlice.actions;
