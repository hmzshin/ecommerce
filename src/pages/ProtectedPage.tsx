import { Icon } from "@iconify/react/dist/iconify.js";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedPage = () => {
  const user = localStorage.getItem("token");
  const location = useLocation();

  return user ? (
    <Suspense
      fallback={
        <Icon icon="svg-spinners:180-ring" className="m-auto w-20 h-20" />
      }
    >
      <Outlet />{" "}
    </Suspense>
  ) : (
    <Navigate to={`/login`} state={location} />
  );
};

export default ProtectedPage;
