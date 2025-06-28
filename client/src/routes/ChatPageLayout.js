import { Navigate, Outlet } from "react-router-dom";
import ChatHeader from "../components/chat/header/ChatHeader";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useSelector } from "react-redux";

export default function ChatPageLayout() {
  const { user } = useSelector((state) => state.user);
  if (user.type !== "admin") {
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ChatHeader />
          <Outlet />
        </LocalizationProvider>
      </>
    );
  } else {
    return <Navigate to="/admin" />;
  }
}
