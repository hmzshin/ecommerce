import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProtectedPage from "./pages/ProtectedPage.tsx";

import { useEffect } from "react";
import { useAppDispatch } from "./store/store.ts";
import { fetchGlobalData } from "./store/slices/globalSlice.ts";
import SignInPage from "./pages/SignInPage.tsx";
import { AxiosInstance } from "./api/axiosInstance.tsx";
import { setUser } from "./store/slices/userSlice.ts";
import { AxiosResponse } from "axios";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const verifyUser = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await AxiosInstance.get("verify");
        console.log("app verify result", response.data);
        dispatch(setUser(response.data));
      } catch (error) {
        localStorage.removeItem("token");
        dispatch(setUser({ name: "", email: "", role_id: "" }));
        throw error;
      }
    };
    verifyUser();
  }, []);

  useEffect(() => {
    dispatch(fetchGlobalData());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/team"
          element={
            <ProtectedPage>
              <TeamPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedPage>
              <ContactPage />
            </ProtectedPage>
          }
        />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </>
  );
}

export default App;
