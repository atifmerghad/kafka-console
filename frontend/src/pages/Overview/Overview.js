import React, { Component } from 'react';

import Layout from "../../components/Layout/Layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Grid, 
  Column,
} from '@carbon/react';
import { InfoSection, InfoCard } from '../../components/Info';
import { Globe, Application, PersonFavorite } from '@carbon/react/icons';

import DashBoardCardStatus from "./DashBoardCardStatus";

class Overview extends Component {
  render() {

    return (
      <Layout>
      <div className="page-container">
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem>
              <a href="/">Cluster Overview</a>
            </BreadcrumbItem>
          </Breadcrumb>

          <h3 className="landing-page__heading">
            Cluster Settings
          </h3>

          <DashBoardCardStatus
          onresize={null}
          data={12}
          cardType="Average fulfillment time"
        />


          <h3 className="landing-page__heading">
          Identification (Name - Cluster ID	)
          </h3>

          <DashBoardCardStatus
          onresize={null}
          data={12}
          cardType="Average fulfillment time"
        />

          <h3 className="landing-page__heading">
          Endpoints ( Bootstrap server )
          </h3>

          <DashBoardCardStatus
          onresize={null}
          data={1}
          cardType="Average fulfillment time"
        />

        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__r3">
          <InfoSection heading="Topics">
            <InfoCard
              heading="Carbon is Open"
              body="It's a distributed effort, guided by the principles of the open-source movement. Carbon's users are also it's makers, and everyone is encouraged to contribute."
              icon={() => <PersonFavorite size={32} />}
            />
            <InfoCard
              heading="Carbon is Modular"
              body="Carbon's modularity ensures maximum flexibility in execution. It's components are designed to work seamlessly with each other, in whichever combination suits the needs of the user."
              icon={() => <Application size={32} />}
            />
            <InfoCard
              heading="Carbon is Consistent"
              body="Based on the comprehensive IBM Design Language, every element and component of Carbon was designed from the ground up to work elegantly together to ensure consistent, cohesive user experiences."
              icon={() => <Globe size={32} />}
            />
          </InfoSection>
        </Column>
      </div>
      </Layout>
    );
  }
};

export default Overview;
