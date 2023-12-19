import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedPage = ({ children }: any) => {
  const user = localStorage.getItem("token");
  const location = useLocation();

  return user ? children : <Navigate to={`/signup`} state={location} />;
};

export default ProtectedPage;
