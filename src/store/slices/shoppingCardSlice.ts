import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CardData {
  product: PayloadData;
  numberOfItem: number;
  shipping: number;
}

interface Payment {
  subtotal: number;
  shipping: number;
  total: number;
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
interface AddressData {
  shipping: Address | null;
  billing: Address | null;
}
interface UserData {
  card: CardData[];
  payment: Payment;
  address: AddressData;
}
const initialState: UserData = {
  card: [],
  payment: { subtotal: 0, shipping: 0, total: 0 },
  address: {
    shipping: {
      address: "",
      city: "",
      district: "",
      id: 0,
      name: "",
      neighborhood: "",
      phone: "",
      surname: "",
      title: "",
      user_id: 0,
    },
    billing: {
      address: "",
      city: "",
      district: "",
      id: 0,
      name: "",
      neighborhood: "",
      phone: "",
      surname: "",
      title: "",
      user_id: 0,
    },
  },
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

    setPriceInfo: (
      state: UserData,
      action: PayloadAction<Payment>
    ): UserData => {
      return {
        ...state,
        payment: action.payload,
      };
    },

    setAddressInfo: (
      state: UserData,
      action: PayloadAction<AddressData>
    ): UserData => {
      return {
        ...state,
        address: action.payload,
      };
    },
    resetShoppingCart: (
      state: UserData,
      action: PayloadAction<UserData>
    ): UserData => {
      return {
        ...state,
        address: action.payload.address,
        card: action.payload.card,
        payment: action.payload.payment,
      };
    },
  },
});

export default shoppingCardSlice.reducer;
export const {
  addProduct,
  deleteProduct,
  decreaseNumberOfItems,
  setPriceInfo,
  setAddressInfo,
  resetShoppingCart,
} = shoppingCardSlice.actions;
