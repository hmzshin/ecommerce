import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosPromise, AxiosResponse } from "axios";
import { axiosInstance } from "../../api/axiosInstance";
interface CardInfo {
  card_no: number;
  ccv: number;
  exp_month: string;
  exp_year: string;
  name: string;
}

interface UserData {
  cards: CardInfo[];
}

const initialState: UserData = {
  cards: [],
};

export const fetchCards = createAsyncThunk(
  "get/cards",
  async (): AxiosPromise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.get(
      "/card"
    );
    return response?.data;
  }
);

export const saveCard = createAsyncThunk(
  "post/card",
  async (payload: any): AxiosPromise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.post(
      "card",
      payload
    );
    return response?.data;
  }
);
export const paymentSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addCard: (state: UserData, action: PayloadAction<CardInfo>): UserData => {
      return { cards: [...state.cards, action.payload] };
    },
  },

  extraReducers(builder) {
    builder.addCase(
      fetchCards.fulfilled,
      (state: UserData, action: PayloadAction<any>) => {
        return { ...state, cards: [...action.payload] };
      }
    );

    builder.addCase(
      saveCard.fulfilled,
      (state: UserData, action: PayloadAction<any>): UserData => {
        return { ...state, cards: [...state.cards, action.payload[0]] };
      }
    );
  },
});

export default paymentSlice.reducer;
export const { addCard } = paymentSlice.actions;
