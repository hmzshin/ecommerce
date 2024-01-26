import { configureStore } from "@reduxjs/toolkit";

import { globalSlice } from "./slices/globalSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userSlice } from "./slices/userSlice";
import { productSlice } from "./slices/productSlice";
import { shoppingCardSlice } from "./slices/shoppingCardSlice";
import { storeSlice } from "./slices/storeSlice";
import { bestsellerSlice } from "./slices/bestsellerSlice";
import { addressSlice } from "./slices/addressSlice";
import { paymentSlice } from "./slices/paymentSlice";
import { ordersSlice } from "./slices/ordersSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    user: userSlice.reducer,
    product: productSlice.reducer,
    shoppingCard: shoppingCardSlice.reducer,
    store: storeSlice.reducer,
    bestseller: bestsellerSlice.reducer,
    address: addressSlice.reducer,
    payment: paymentSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
