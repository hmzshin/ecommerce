import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { axiosInstance } from "../../api/axiosInstance";
import { store } from "../store";
interface Address {
  address: string;
  city: string;
  district: string;
  id: number;
  name: string;
  neighborhood: string;
  phone: string;
  surname: string;
  title: string;
  user_id: number;
}

interface UserData {
  address: Address[];
}

const initialState: UserData = {
  address: [],
};
export const fetchAddress = createAsyncThunk(
  "get/address",
  async (): AxiosPromise<void> => {
    const userToken = store.getState().user.token;
    const response: AxiosResponse | undefined = await axios.get(
      "https://workintech-fe-ecommerce.onrender.com/user/address",
      { headers: { Authorization: userToken } }
    );
    console.log("address slice response data", response?.data);
    return response?.data;
  }
);

export const saveAddress = createAsyncThunk(
  "post/address",
  async (payload: any): AxiosPromise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.post(
      "/user/address",
      payload
    );
    return response?.data;
  }
);
export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetAddress: (state: UserData, action: PayloadAction<[]>): UserData => {
      return { ...state, address: action.payload };
    },
    setUserAddresses: (
      state: UserData,
      action: PayloadAction<[]>
    ): UserData => {
      return { ...state, address: [...action.payload] };
    },
  },

  extraReducers(builder) {
    builder.addCase(saveAddress.fulfilled, (state: UserData, action: any) => {
      return { ...state, address: [...state.address, action.payload[0]] };
    });

    builder.addCase(fetchAddress.fulfilled, (state: UserData, action: any) => {
      return { ...state, address: [...action.payload] };
    });
  },
});

export default addressSlice.reducer;
export const { resetAddress, setUserAddresses } = addressSlice.actions;
