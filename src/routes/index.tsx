import { createBrowserRouter } from "react-router";
import { DefaultLayout } from "../common/layouts/DefaultLayout";
import Dashboard from '../features/dashboard/pages/Dashboard';
import { ProtectedRoute } from "../common/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: "login",
        lazy: () => import("../features/auth/pages/LoginForm").then((module) => ({ element: <module.LoginForm /> })),
      },
      {
        path: "register",
        lazy: () => import("../features/auth/pages/RegistrationForm").then((module) => ({ element: <module.RegisterForm /> })),
      }
    ]
  },
])