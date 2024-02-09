import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { axiosInstance } from "../../api/axiosInstance";
import { store } from "../store";
interface CardInfo {
  card_no: number;
  ccv: number;
  expire_month: string;
  expire_year: string;
  name_on_card: string;
  id: number;
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
    const userToken = store.getState().user.token;
    const response: AxiosResponse | undefined = await axios.get(
      "https://workintech-fe-ecommerce.onrender.com/user/card",
      { headers: { Authorization: userToken } }
    );
    console.log("card slice response ", response?.data);

    return response?.data;
  }
);

export const updateCard = createAsyncThunk(
  "put/card",
  async (payload: any): AxiosPromise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.put(
      "user/card",
      payload
    );

    console.log("update card", response?.data);

    return response?.data;
  }
);

export const saveCard = createAsyncThunk(
  "post/card",
  async (payload: any): AxiosPromise<void> => {
    const response: AxiosResponse | undefined = await axiosInstance.post(
      "user/card",
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
    updateLocalCard: (
      state: UserData,
      action: PayloadAction<CardInfo>
    ): UserData => {
      return {
        cards: state.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
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
export const { addCard, updateLocalCard } = paymentSlice.actions;
