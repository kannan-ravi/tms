import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminPageLayout() {
  const { user } = useSelector((state) => state.user);
  if (user.type === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
