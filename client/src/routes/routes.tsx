import { createBrowserRouter } from "react-router-dom";
import { protectedRoutes } from "./protected-routes"; // Import protected routes
import { unprotectedRoutes } from "./unprotected-routes"; // Import unprotected routes
import AuthMidleware from "@/midlewares/AuthMidleware";
import UserAuthMidleware from "@/midlewares/UserAuthMidleware";
import { userProtectedRoutes } from "./user-protect-routes";

const router = createBrowserRouter([
  // Wrap protected routes with AuthGuard
  {
    element: <AuthMidleware />,
    children: protectedRoutes.map((route) => ({
      ...route,
    })),
  },
  // Wrap protected user routes with
  {
    element: <UserAuthMidleware />,
    children: userProtectedRoutes.map((route) => ({
      ...route,
    })),
  },
  // Map unprotected routes directly
  ...unprotectedRoutes.map((route) => ({
    ...route,
  })),
]);

export default router;
