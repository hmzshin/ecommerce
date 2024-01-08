import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../../api/axiosInstance";
import { RootState } from "../store";

interface Payload {
  email: string;
  password: string;
}

interface UserData {
  name: string;
  email: string;
  role_id: string;
  token: string;
}

const initialState: UserData = {
  name: "",
  email: "",
  role_id: "",
  token: "",
};

export const sendLoginInfo = createAsyncThunk(
  "post/user",
  async (payload: Payload): Promise<any> => {
    const response: AxiosResponse | undefined = await axiosInstance.post(
      "login",
      payload
    );
    localStorage.setItem("token", response?.data?.token);
    return response?.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserData, action: PayloadAction<UserData>): UserData => {
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        role_id: action.payload.role_id,
        token: action.payload.token,
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(sendLoginInfo.fulfilled, (state, action: any) => {
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        role_id: action.payload.role_id,
        token: action.payload.token,
      };
    });
  },
});

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
