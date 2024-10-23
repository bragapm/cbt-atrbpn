import LoginPage from "@/app/admin/authentication/pages/LoginPage";
import LoginParticipant from "@/app/client/authentication/pages/LoginParticipant";
import AuthLayout from "@/layouts/AuthLayout";

export const unprotectedRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/exam",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginParticipant />,
      },
    ],
  },
];
