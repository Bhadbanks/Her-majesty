import type { RouteObject } from "react-router-dom";
import Home from "../pages/home/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  // Catch-all route for undefined paths
  {
    path: "*",
    element: (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
          background: "linear-gradient(to bottom, #0a0015, #1a0a2e, #0f0520)",
          fontFamily: "'Pacifico', cursive",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>404 — Page Not Found 💔</h1>
        <p style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
          Bby... this page doesn’t exist🥺🌹
        </p>
      </div>
    ),
  },
];

export default routes;
