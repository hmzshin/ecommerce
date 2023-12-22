import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AxiosInstance } from "../../api/axiosInstance";

interface UserData {
  name: string;
  email: string;
  role_id: string;
}

const initialState: UserData = {
  name: "",
  email: "",
  role_id: "",
};

export const sendLoginInfo = createAsyncThunk(
  "post/user",
  async (payload: any): Promise<void> => {
    const response: AxiosResponse | undefined = await AxiosInstance.post(
      "login",
      payload
    );
    console.log("user slice response data", response?.data);
    localStorage.setItem("token", response?.data?.token);
    return response?.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserData, action: PayloadAction<UserData>): UserData => {
      console.log("action.payload:", action.payload);
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        role_id: action.payload.role_id,
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(sendLoginInfo.fulfilled, (state, action: any) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role_id = action.payload.role_id;
    });
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
