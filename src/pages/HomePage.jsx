import BestsellerProducts from "../components/BestsellerProducts-home.jsx";
import TopProductsOfWeek from "../components/TopProductOfWeek.jsx";
import Blog from "../components/Blog.jsx";
import Clients from "../components/Clients.jsx";
import Content from "../components/Content.jsx";
import Features from "../components/Features.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Swiper from "../components/Swiper.jsx";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";

const HomePage = () => {
  return (
    <>
      <Header />
      <Swiper
        slides={[<Hero />, <Hero />]}
        config={{
          spaceBetween: 0,
          speed: "1000",
          modules: [Navigation, Pagination, Scrollbar, A11y, Mousewheel],
          className: "w-[90vw]",
        }}
      />
      <Clients />
      <TopProductsOfWeek />
      <BestsellerProducts />
      <Content />
      <Features />
      <Blog />
      <Footer />
    </>
  );
};

export default HomePage;
