import Clients from "../components/Clients";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Products from "../components/Products";
import ShopCards from "../components/ShopCards-shop";

const ShopPage = () => {
  return (
    <>
      <Header />
      <ShopCards />
      <Products />
      <Clients />
      <Footer />
    </>
  );
};

export default ShopPage;
