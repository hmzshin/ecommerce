import { Route, Routes } from "react-router-dom";
import { useEffect, lazy } from "react";
import { useAppDispatch } from "./store/store.ts";
import { fetchCategories, fetchRoles } from "./store/slices/globalSlice.ts";
import SignInPage from "./pages/SignInPage.tsx";
import { setUser } from "./store/slices/userSlice.ts";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./api/axiosInstance.tsx";
import ShoppingCartPage from "./pages/ShoppingCartPage.tsx";
import ContentWrapper from "./components/ContentWrapper.tsx";

const HomePage = lazy(() => import("./pages/HomePage.tsx"));
const ShopPage = lazy(() => import("./pages/ShopPage.tsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const TeamPage = lazy(() => import("./pages/TeamPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage.tsx"));
const ProtectedPage = lazy(() => import("./pages/ProtectedPage.tsx"));
const OrderPage = lazy(() => import("./pages/OrderPage.tsx"));

function App() {
  const dispatch = useAppDispatch();

  const verifyUser = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await axiosInstance.get("verify");
      dispatch(setUser(response.data));
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(setUser({ name: "", email: "", role_id: "" }));
      throw error;
    }
  };

  useEffect(() => {
    Promise.all([
      dispatch(fetchRoles()),
      dispatch(fetchCategories()),
      verifyUser(),
    ]);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<ContentWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route
            path="/shop/:category_id/:gender/:category/:productId/:productName"
            element={<ProductPage />}
          />
          <Route
            path="/shop/:category_id/:gender/:category"
            element={<ShopPage />}
          />
          <Route path="/shop/:search" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/order" element={<ProtectedPage />}>
            <Route index element={<OrderPage />} />
          </Route>
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
