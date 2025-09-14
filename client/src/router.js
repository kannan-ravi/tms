import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPageLayout from "./routes/MainPageLayout";
import ChatPageLayout from "./routes/ChatPageLayout";
import AdminPageLayout from "./routes/AdminPageLayout";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { Suspense, lazy } from "react";
import AdminProtectedRoutes from "./routes/AdminPageLayout";
import LazyLoader from "./components/ui/lazy-loader/LazyLoader";

const Home = lazy(() => import("./layouts/home/Home"));
const CreateTask = lazy(() => import("./layouts/create-task/CreateTask"));
const EditTask = lazy(() => import("./layouts/edit-task/EditTask"));
const ScheduleMeeting = lazy(() =>
  import("./layouts/schedule-meeting/ScheduleMeeting")
);
const Profile = lazy(() => import("./layouts/Profile/profile"));
const Notification = lazy(() => import("./layouts/Profile/Notification"));
const Timelimit = lazy(() => import("./layouts/time-limit/TimeLimit"));
const Individual = lazy(() => import("./layouts/individual-task/Individual"));
const ScreenShare = lazy(() => import("./layouts/screen-share/ScreenShare"));
const GroupInfo = lazy(() => import("./layouts/group-info/GroupInfo"));
const NeedGuidance = lazy(() => import("./layouts/need-guidance/NeedGuidance"));
const ChatRooms = lazy(() => import("./layouts/chat-rooms/ChatRooms"));
const Login = lazy(() => import("./layouts/login/Login"));
const Chat = lazy(() => import("./layouts/chat/Chat"));
const TeamCall = lazy(() => import("./layouts/team-call/TeamCall"));
const CameraCapture = lazy(() =>
  import("./layouts/camera-capture/CameraCapture")
);
const AdminHome = lazy(() => import("./layouts/admin/home/AdminHome"));
const AddTeam = lazy(() => import("./layouts/admin/add-team/AddTeam"));
const AddUser = lazy(() => import("./layouts/admin/add-user/AddUser"));
const AddChat = lazy(() => import("./layouts/admin/add-chat/AddChat"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/",
        element: <MainPageLayout />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/profile",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: "/notification",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <Notification />
              </Suspense>
            ),
          },
          {
            path: "/time-limit",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <Timelimit />
              </Suspense>
            ),
          },
          {
            path: "/individual-task/:task_id",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <Individual />
              </Suspense>
            ),
          },
          {
            path: "/chatrooms",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <ChatRooms />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "",
        element: <ChatPageLayout />,
        children: [
          {
            path: "/chat/:chatId",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <Chat />
              </Suspense>
            ),
          },
          {
            path: "/create-task/:chatId",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <CreateTask />
              </Suspense>
            ),
          },
          {
            path: "/edit-task/:task_id",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <EditTask />
              </Suspense>
            ),
          },
          {
            path: "/schedule-meeting",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <ScheduleMeeting />
              </Suspense>
            ),
          },
          {
            path: "/screen-sharing",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <ScreenShare />
              </Suspense>
            ),
          },
          {
            path: "/group-info/:chatId",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <GroupInfo />
              </Suspense>
            ),
          },
          {
            path: "/need-guidance",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <NeedGuidance />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "admin",
        element: <AdminPageLayout />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <AdminHome />
              </Suspense>
            ),
          },
          {
            path: "add-team",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <AddTeam />
              </Suspense>
            ),
          },
          {
            path: "add-user",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <AddUser />
              </Suspense>
            ),
          },
          {
            path: "add-chat",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <AddChat />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/camera-capture",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <CameraCapture />
      </Suspense>
    ),
  },
  {
    path: "/team-call",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <TeamCall />
      </Suspense>
    ),
  },
]);

export default router;
