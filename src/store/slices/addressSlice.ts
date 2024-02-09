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

export const updateAddress = createAsyncThunk(
  "put/address",
  async (payload: any): AxiosPromise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.put(
      "/user/address",
      payload
    );
    console.log("put request result:  ", response?.data);

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
    updateLocalAddress: (
      state: UserData,
      action: PayloadAction<Address>
    ): UserData => {
      const update = state.address.map((address) =>
        address.id === action.payload.id ? action.payload : address
      );
      return { ...state, address: update };
    },
  },

  extraReducers(builder) {
    builder.addCase(saveAddress.fulfilled, (state: UserData, action: any) => {
      return { ...state, address: [...state.address, action.payload[0]] };
    });

    builder.addCase(updateAddress.fulfilled, (state: UserData, action: any) => {
      return {
        ...state,
        address: state.address.map((adrs) =>
          adrs.id === action.payload[0].id ? action.payload[0] : adrs
        ),
      };
    });

    builder.addCase(fetchAddress.fulfilled, (state: UserData, action: any) => {
      return { ...state, address: [...action.payload] };
    });
  },
});

export default addressSlice.reducer;
export const { resetAddress, setUserAddresses, updateLocalAddress } =
  addressSlice.actions;
