import { RouterProvider } from "react-router-dom";
import ErrorFallback from "./components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import router from "./routes/routes";

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
