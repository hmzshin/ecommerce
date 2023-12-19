import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProtectedPage from "./pages/ProtectedPage.tsx";

function App() {
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
          path="contact"
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
