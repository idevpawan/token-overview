import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";

export const routes = [
  {
    id: "landing",
    element: Landing,
    route: "/",
  },
  {
    id: "dashboard",
    element: Dashboard,
    route: "/dashboard",
  },
];
