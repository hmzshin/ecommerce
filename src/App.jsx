import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/shop" exact element={<ShopPage />} />
        <Route path="/product" exact element={<ProductPage />} />
        <Route path="/about" exact element={<AboutPage />} />
        <Route path="/team" exact element={<TeamPage />} />
      </Routes>
    </>
  );
}

export default App;
