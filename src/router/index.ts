import { useNavigate, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";

let navigateResolver: any;
export const navigatePromise = new Promise((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(window as any).REACT_APP_NAVIGATE) {
      (window as any).REACT_APP_NAVIGATE = navigate;
      navigateResolver(navigate);
    }
  }, [navigate]);

  return element;
}
