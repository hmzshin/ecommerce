import BestsellerProducts from "../components/BestsellerProducts.jsx";
import Clients from "../components/Clients.jsx";
import Content from "../components/Content.jsx";
import Features from "../components/Features.jsx";
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
      <Content />
      <Features />
    </>
  );
};

export default HomePage;
