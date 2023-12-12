import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/shop" exact element={<ShopPage />} />
      </Routes>
      <Routes>
        <Route path="/product" exact element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
