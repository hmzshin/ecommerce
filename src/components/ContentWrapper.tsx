import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Suspense } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ContentWrapper = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <Icon icon="svg-spinners:180-ring" className="m-auto w-20 h-20" />
        }
      >
        <Outlet />
      </Suspense>

      <Footer />
    </>
  );
};

export default ContentWrapper;
