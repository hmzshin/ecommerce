import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosPromise, AxiosResponse } from "axios";
import { axiosInstance } from "../../api/axiosInstance";

interface Order {
  address_id: number;
  card_expire_month: number;
  card_expire_year: number;
  card_name: string;
  card_no: number;
  id: number;
  order_date: string;
  price: number;
  user_id: number;
}

interface UserData {
  orders: Order[];
}

const initialState: UserData = {
  orders: [],
};

export const fetchOrders = createAsyncThunk(
  "get/orders",
  async (): AxiosPromise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "/order"
    );
    console.log("orders response:", response?.data);
    return response?.data;
  }
);
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state: UserData, action: PayloadAction<[]>): UserData => {
      return { orders: action.payload };
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state: UserData, action: any) => {
      return { orders: action.payload };
    });
  },
});

export default ordersSlice.reducer;
export const { setOrders } = ordersSlice.actions;
