import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.user);

  if (user === null) {
    return <Navigate to="/login" />;
  } else if (user.type === "user" || user.type === "rep") {
    return <Outlet />;
  } else if (user.type === "admin") {
    return <Outlet />;
  } else {
    return null;
  }
};

export default ProtectedRoutes;
