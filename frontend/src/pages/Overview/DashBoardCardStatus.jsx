import { CloudOffline, Flash } from "@carbon/icons-react";
export default function DashBoardCardStatus(props) {
  const { data, cardType } = props;

  return (
    <div className="dashboardRightSection">
      <div className="dashboardNumber">
          <span>{data}</span>
      </div>
      <div className="dashboardCardTitle">
        <span></span>
        {cardType}
      </div>
    </div>
  );
}
