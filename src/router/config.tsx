import type { RouteObject } from "react-router-dom";
import Home from "../pages/home/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "*", element: <Home /> } // fallback to home to avoid blank routes
];

export default routes;
