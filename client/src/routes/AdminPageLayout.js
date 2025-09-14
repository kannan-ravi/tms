import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export default function AdminPageLayout() {
  const { user } = useSelector((state) => state.user);
  if (user.type === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
