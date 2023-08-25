import { Suspense, lazy } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { LoadingScreen } from "../pages/Loading/LoadingScreen";
import LoadSpinner from "../components/LoadSpinner/LoadSpinner";
const Overview = lazy(() => import("../pages/Overview/Overview"));
const Brokers = lazy(() => import("../pages/Brokers/Brokers"));
const Topics = lazy(() => import("../pages/Topics/Topics"));
const TopicDetails = lazy(() => import("../pages/Topics/TopicDetails"));
const ConnectPage = lazy(() => import("../pages/Metrics/Metrics"));
const Metric = lazy(() => import("../pages/Metrics/Metrics"));
const Security = lazy(() => import("../pages/Security/Security"));
const Track = lazy(() => import("../pages/Metrics/Metrics"));
const Tools = lazy(() => import("../pages/Tools/Tools"));
const ConsumerGroup = lazy(() => import("../pages/Groups/Groups"));
const Connectors = lazy(() => import("../pages/Connectors/Connectors"));
const Schemas = lazy(() => import("../pages/Schemas/Schemas"));
const SchemaDetails = lazy(() => import("../pages/Schemas/SchemaDetails"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Clients = lazy(() => import("../pages/Clients/Clients"));
const KsqlDB = lazy(() => import("../pages/KsqlDB/KsqlDB"));

// const Router = ({ handleSpinnerStatus })
// <Map handleSpinnerStatus={handleSpinnerStatus} />
const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={<LoadSpinner active={true} />}>
              <Overview />
            </Suspense>
          }
          path={routes.DASHBOARD}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Brokers />
            </Suspense>
          }
          path={routes.BROKERS}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
                <Topics />
            </Suspense>
          }
          path={routes.TOPICS}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <TopicDetails />
            </Suspense>
          }
          path={routes.TOPIC_DETAILS}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
             <Schemas/>
            </Suspense>
          }
          path={routes.SCHEMA}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <SchemaDetails />
            </Suspense>
          }
          path={routes.SCHEMA_DETAILS}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <ConsumerGroup />
            </Suspense>
          }
          path={routes.GROUPS}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <NotFound />
            </Suspense>
          }
          path={routes.METRIC}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              < Security />
            </Suspense>
          }
          path={routes.SECURITY}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Connectors />
            </Suspense>
          }
          path={routes.CONNECTOR}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <NotFound />
            </Suspense>
          }
          path={routes.TRACK}
        ></Route>
         <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Tools />
            </Suspense>
          }
          path={routes.TOOLS}
        ></Route>
        
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Tools />
            </Suspense>
          }
          path={routes.TOOLS}
        ></Route>

  <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <KsqlDB />
            </Suspense>
          }
          path={routes.KSQLDB}
        ></Route>

        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Profile />
            </Suspense>
          }
          path={routes.PROFILE}
        ></Route>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Clients />
            </Suspense>
          }
          path={routes.CLIENTS}
        ></Route>
         <Route
          path="*"
          element={<NotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
