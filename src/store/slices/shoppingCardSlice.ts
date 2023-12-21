import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserData {
  card: object[];
  payment: any;
  address: string;
}

const initialState: UserData = {
  card: [],
  payment: "",
  address: "",
};

export const shoppingCardSlice = createSlice({
  name: "shoppingCard",
  initialState,
  reducers: {
    setshoppingCardData: (
      state: UserData,
      action: PayloadAction<UserData>
    ): UserData => {
      return { ...state, ...action.payload };
    },
  },
});

export default shoppingCardSlice.reducer;
export const { setshoppingCardData } = shoppingCardSlice.actions;
