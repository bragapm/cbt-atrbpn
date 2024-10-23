import { createBrowserRouter } from "react-router-dom";
import { protectedRoutes } from "./protected-routes"; // Import protected routes
import { unprotectedRoutes } from "./unprotected-routes"; // Import unprotected routes
import AuthMidleware from "@/midlewares/AuthMidleware";

const router = createBrowserRouter([
  // Wrap protected routes with AuthGuard
  {
    element: <AuthMidleware />,
    children: protectedRoutes.map((route) => ({
      ...route,
    })),
  },
  // Map unprotected routes directly
  ...unprotectedRoutes.map((route) => ({
    ...route,
  })),
]);

export default router;
