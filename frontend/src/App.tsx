import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Langing from "./pages/Langing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
import { mutationConfig, queriesConfig } from "./lib/TanStackConfig";

const queryClient = new QueryClient({
  mutationCache: mutationConfig,
  defaultOptions: {
    queries: queriesConfig,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Langing />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/subscriptions",
    element: <Subscriptions />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
