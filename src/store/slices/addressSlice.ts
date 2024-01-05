import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosPromise, AxiosResponse } from "axios";
import { axiosInstance } from "../../api/axiosInstance";
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
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "user/address"
    );
    console.log("user slice address response data", response?.data);
    return response?.data;
  }
);

export const saveAddress = createAsyncThunk(
  "post/address",
  async (payload: any): AxiosPromise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.post(
      "user/address",
      payload
    );
    console.log("user slice address response data", response?.data);
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
  },

  extraReducers(builder) {
    builder.addCase(fetchAddress.fulfilled, (state: UserData, action: any) => {
      return { ...state, address: [...action.payload] };
    });

    builder.addCase(saveAddress.fulfilled, (state: UserData, action: any) => {
      return { ...state, address: [...state.address, action.payload[0]] };
    });
  },
});

export default addressSlice.reducer;
export const { resetAddress } = addressSlice.actions;
