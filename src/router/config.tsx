import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
export default routes;
src/router/index.ts

import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";
let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;
declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}
export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});
export function AppRoutes() {
  const element = useRoutes(routes);
  if (!window.REACT_APP_NAVIGATE) {
    const navigate = useNavigate();
    useEffect(() => {
      window.REACT_APP_NAVIGATE = navigate;
      navigateResolver(window.REACT_APP_NAVIGATE);
    });
  }
  return element;
}
