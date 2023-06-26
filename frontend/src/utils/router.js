import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "../hooks/useToken";
import routes from "./routes";

const Login = React.lazy(() => import("../pages/Login/Login"));
const Overview = React.lazy(() => import("../pages/Overview/Overview"));
const Brokers = React.lazy(() => import("../pages/Brokers/Brokers"));
const Topics = React.lazy(() => import("../pages/Topics/Topics"));
const TopicDetails = React.lazy(() => import("../pages/Topics/TopicDetails"));
const ShemaPage = React.lazy(() => import("../pages/Metrics/Metrics"));
const ConnectPage = React.lazy(() => import("../pages/Metrics/Metrics"));
const Metric = React.lazy(() => import("../pages/Metrics/Metrics"));
const Security = React.lazy(() => import("../pages/Metrics/Metrics"));
const Track = React.lazy(() => import("../pages/Metrics/Metrics"));
const Tools = React.lazy(() => import("../pages/Tools/Tools"));
const ConsumerGroup = React.lazy(() => import("../pages/Groups/Groups"));

export function LoadingScreen() {
  return (
    <div className="loading-wrapper">
      {/* <div
        className="animate-spin inline-block w-8 h-8 border-4 border-gold-dark border-r-transparent rounded-full"
        role="status"
      > */}
      <span className="hidden">Loading...</span>
      {/* </div> */}
    </div>
  );
}

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
              <ShemaPage />
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
              <Metric />
            </React.Suspense>
          }
          path={routes.METRIC}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <Metric />
            </React.Suspense>
          }
          path={routes.SECURITY}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <ConnectPage />
            </React.Suspense>
          }
          path={routes.CONNECTOR}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
             <Tools />
            </React.Suspense>
          }
          path={routes.KSQLDB}
        ></Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingScreen />}>
              <Tools />
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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
