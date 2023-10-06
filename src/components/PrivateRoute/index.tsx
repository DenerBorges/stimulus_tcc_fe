import { Navigate, } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const isAuthenticated = localStorage.getItem("userToken");

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
