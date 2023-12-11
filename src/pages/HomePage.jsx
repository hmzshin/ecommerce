import BestsellerProducts from "../components/BestsellerProducts.jsx";
import Blog from "../components/Blog.jsx";
import Clients from "../components/Clients.jsx";
import Content from "../components/Content.jsx";
import Features from "../components/Features.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import ShopCards from "../components/ShopCards-home.jsx";
import Swiper from "../components/Swiper.jsx";

const HomePage = () => {
  return (
    <>
      <Header />
      <Swiper />
      <Clients />
      <ShopCards />
      <BestsellerProducts />
      <Content />
      <Features />
      <Blog />
      <Footer />
    </>
  );
};

export default HomePage;
