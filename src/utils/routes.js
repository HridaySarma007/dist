import { lazy } from "react";

const routes = [
  {
    path: "dashboard",
    component: lazy(() => import("../pages/Home")),
    exact: true,
  },
];

export default routes;
