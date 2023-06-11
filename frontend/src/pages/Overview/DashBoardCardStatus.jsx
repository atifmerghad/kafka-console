import { CloudOffline, Flash } from "@carbon/icons-react";
export default function DashBoardCardStatus(props) {
  const { data, cardType } = props;

  return (
    <div className="dashboardRightSection">
      <div className="dashboardNumber">
        {cardType === "Distressed Assets"
          ? data?.numberOfRobots?.attention_distress
          : cardType === "Assets in use"
          ? data?.numberOfRobots?.assetsInUse
          : "20"}
        {cardType === "Topic Number" && (
          <span className="min-title">min</span>
        )}
        {cardType === "Assets in use" ? (
          <span>/ {data?.numberOfRobots?.total}</span>
        ) : null}
      </div>
      <div className="dashboardCardTitle">
        <span></span>
        {cardType === "Distressed Assets"
          ? "Distressed Assets"
          : cardType === "Assets in use"
          ? "Assets in use"
          : "Topic Number"}
      </div>
      <div className="dashboardCardStatus">
        <span className="dashboardStatusIcon">
          {cardType === "Distressed Assets" ? (
            <CloudOffline size="16" className="lightRed" />
          ) : cardType === "Assets in use" ? (
            <Flash size="16" className="lightBlue" />
          ) : null}
        </span>
        <div className="dashboardStatustext">
          {cardType === "Distressed Assets"
            ? data?.numberOfRobots?.unavailable + " " + "offline"
            : cardType === "Assets in use"
            ? data?.numberOfRobots?.charging_maintenance +
              " " +
              "Assets Charging"
            : null}
        </div>
      </div>
    </div>
  );
}
