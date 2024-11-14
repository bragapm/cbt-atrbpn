import LoginPage from "@/app/admin/authentication/pages/LoginPage";
import { HasilAkhirUjianVideotron } from "@/app/admin/management-hasil-ujian/pages/HasilAkhirUjianVideotronPage";
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
  {
    path: "/hasil-ujian/videotron",
    element: <HasilAkhirUjianVideotron />,
  },
];
