import BestsellerProducts from "../components/BestsellerProducts.jsx";
import Clients from "../components/Clients.jsx";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import ShopCards from "../components/ShopCards.jsx";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Clients />
      <ShopCards />
      <BestsellerProducts />
    </>
  );
};

export default HomePage;
