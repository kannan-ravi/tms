import { Outlet, Navigate } from "react-router-dom";
import Sidenav from "../components/header/SideNav";
import BottomTabs from "../components/bottom-tabs/BottomTabs";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import React from "react";

export default function MainPageLayout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  if (user.type !== "admin") {
    return (
      <>
        {location.pathname !== "/profile" && <Sidenav />}
        <Outlet />
        {location.pathname !== "/notification" && <BottomTabs />}
      </>
    );
  } else {
    return <Navigate to="/admin" />;
  }
}
