import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CardData {
  product: PayloadData;
  numberOfItem: number;
  shipping: number;
}
interface UserData {
  card: CardData[];
  payment: number;
  address: string;
}
interface Images {
  url: string;
}
interface PayloadData {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  store_id: number;
  category_id: number;
  rating: number;
  sell_count: number;
  images: Images[];
}

const initialState: UserData = {
  card: [],
  payment: 0,
  address: "",
};

export const shoppingCardSlice = createSlice({
  name: "shoppingCard",
  initialState,
  reducers: {
    addProduct: (
      state: UserData,
      action: PayloadAction<PayloadData>
    ): UserData => {
      const existingProduct = state.card.find(
        (item) => item.product.id === action.payload.id
      );
      toast.success("Product successfully added to cart.");
      if (existingProduct) {
        return {
          ...state,
          card: state.card.map((item) =>
            item.product.id === action.payload.id
              ? {
                  ...item,
                  numberOfItem: item.numberOfItem + 1,
                  shipping:
                    item.numberOfItem + 1 > 3
                      ? 0
                      : (item.numberOfItem + 1) * 15,
                }
              : item
          ),
        };
      } else {
        return {
          ...state,
          card: [
            ...state.card,
            { product: action.payload, numberOfItem: 1, shipping: 15 },
          ],
        };
      }
    },

    deleteProduct: (
      state: UserData,
      action: PayloadAction<CardData>
    ): UserData => {
      toast.warn("Product successfully removed.");
      return {
        ...state,
        card: state.card.filter(
          (item) => item.product.id !== action.payload.product.id
        ),
      };
    },

    decreaseNumberOfItems: (
      state: UserData,
      action: PayloadAction<CardData>
    ): UserData => {
      toast.warn("Product successfully deleted.");
      if (action.payload.numberOfItem > 1) {
        return {
          ...state,
          card: state.card.map((item) =>
            item.product.id === action.payload.product.id
              ? {
                  ...item,
                  numberOfItem: item.numberOfItem - 1,
                  shipping:
                    item.numberOfItem - 1 < 4
                      ? (item.numberOfItem - 1) * 15
                      : 0,
                }
              : item
          ),
        };
      } else {
        return {
          ...state,
          card: state.card.filter(
            (item) => item.product.id !== action.payload.product.id
          ),
        };
      }
    },
  },
});

export default shoppingCardSlice.reducer;
export const { addProduct, deleteProduct, decreaseNumberOfItems } =
  shoppingCardSlice.actions;
