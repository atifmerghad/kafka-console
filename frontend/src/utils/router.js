import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "../hooks/useToken";
import routes from "./routes";
import { LoadingScreen } from "../pages/Loading/LoadingScreen";

const Login = React.lazy(() => import("../pages/Login/Login"));
const Overview = React.lazy(() => import("../pages/Overview/Overview"));
const Brokers = React.lazy(() => import("../pages/Brokers/Brokers"));
const Topics = React.lazy(() => import("../pages/Topics/Topics"));
const TopicDetails = React.lazy(() => import("../pages/Topics/TopicDetails"));
const ShemaPage = React.lazy(() => import("../pages/Metrics/Metrics"));
const ConnectPage = React.lazy(() => import("../pages/Metrics/Metrics"));
const Metric = React.lazy(() => import("../pages/Metrics/Metrics"));
const Security = React.lazy(() => import("../pages/Security/Security"));
const Track = React.lazy(() => import("../pages/Metrics/Metrics"));
const Tools = React.lazy(() => import("../pages/Tools/Tools"));
const ConsumerGroup = React.lazy(() => import("../pages/Groups/Groups"));
const Connectors = React.lazy(() => import("../pages/Connectors/Connectors"));
const Schemas = React.lazy(() => import("../pages/Schemas/Schemas"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const Profile = React.lazy(() => import("../pages/Profile/Profile"));

const Router = () => {
  const { isAccount } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <Login />
            </React.Suspense>
          }
          path={routes.LOGIN}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <Overview />
            </React.Suspense>
          }
          path={routes.DASHBOARD}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <Brokers />
            </React.Suspense>
          }
          path={routes.BROKERS}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
                <Topics />
            </React.Suspense>
          }
          path={routes.TOPICS}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <TopicDetails />
            </React.Suspense>
          }
          path={routes.TOPIC_DETAILS}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
             <Schemas/>
            </React.Suspense>
          }
          path={routes.SCHEMA}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <ConsumerGroup />
            </React.Suspense>
          }
          path={routes.GROUPS}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <NotFound />
            </React.Suspense>
          }
          path={routes.METRIC}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              < Security />
            </React.Suspense>
          }
          path={routes.SECURITY}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <Connectors />
            </React.Suspense>
          }
          path={routes.CONNECTOR}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
             <NotFound />
            </React.Suspense>
          }
          path={routes.KSQLDB}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <NotFound />
            </React.Suspense>
          }
          path={routes.TRACK}
        ></Route>
         <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <Tools />
            </React.Suspense>
          }
          path={routes.TOOLS}
        ></Route>
        
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <Tools />
            </React.Suspense>
          }
          path={routes.TOOLS}
        ></Route>

        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <Profile />
            </React.Suspense>
          }
          path={routes.PROFILE}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
