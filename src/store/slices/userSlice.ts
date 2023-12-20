import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserData {
  name: string;
  email: string;
  password: string;
  role_id: string;
}

const initialState: UserData = {
  name: "",
  email: "",
  password: "",
  role_id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserData, action: PayloadAction<UserData>): UserData => {
      return { ...state, ...action.payload };
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
