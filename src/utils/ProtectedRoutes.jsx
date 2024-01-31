import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes"; // Route list
//import Loader from "sharedComponent/Loader";

const ProtectedRoutes = () => (
  <Routes>
    <Suspense>
      {routes.map(({ component: Component, path, exact }) => (
        <Route path={`/${path}`} key={path} exact={exact}>
          <Component />
        </Route>
      ))}
    </Suspense>
  </Routes>
);

export default ProtectedRoutes;
/*
const config = {
	SOILCARE_API: "http://64.227.182.49:4000",
	ADDRESS_API: "https://address.ttsec.co.in"
}
export default config;
*/
