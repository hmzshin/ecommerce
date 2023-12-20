import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProtectedPage from "./pages/ProtectedPage.tsx";
import { AxiosError, AxiosResponse } from "axios";
import { useAxios } from "./hooks/useAxios.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "./store/store.ts";
import { setGlobalData } from "./store/slices/globalSlice.ts";

function App() {
  const dispatch = useAppDispatch();
  interface UserData {
    roles: string[];
    categories: string[];
    language: string;
    theme: string;
  }
  const [getData, getRequest]: [
    AxiosResponse<UserData> | undefined,
    (payload?: any, toastify?: boolean) => Promise<void>,
    boolean,
    AxiosError<any> | undefined
  ] = useAxios({
    reqType: "get",
    endpoint: "roles",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await getRequest();
        const roles = response.map((role: any) => [role.name, role.code]);

        dispatch(
          setGlobalData({
            roles: roles,
            categories: [],
            language: "tr",
            theme: "lignt",
          })
        );
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
      </Routes>
    </>
  );
}

export default App;
