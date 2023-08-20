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
  FlexGrid, Row, Tile, Link
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
                <a href="/dashboard">Home</a>
              </BreadcrumbItem>
            </Breadcrumb>

            <h3 className="landing-page__heading">
              Welcome back to Kafka Console!
            </h3>
            <br></br>
            <h5>Your Console overview</h5>

            <Tile id="tile-1">
              <Grid narrow>
                <Column lg={4}>
                <DashBoardCardStatus
                    onresize={null}
                    data={3}
                    cardType="Topics"
                  />
                </Column>
                <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={12}
                    cardType="Partitions"
                  /></Column>
                <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={36}
                    cardType="Replicas"
                  /></Column>
                <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={"3/3"}
                    cardType="Brokers Online"
                  /></Column>
              </Grid>
            </Tile>

            <h5 className="mt-4">
              Cluster Details - SERVICES
            </h5>

            <div style={{ textAlign: "center", padding: "50px"}}>
  <img src="/images/apache_kafka.svg" alt="KafkaConsole logo" width="50%" height="auto" />
</div>

            <Tile id="tile-1">
              <Grid narrow>
                <Column lg={4}>
                <DashBoardCardStatus
                    onresize={null}
                    data={"Not Configured"}
                    cardType="Kafka Connect"
                  />
                </Column>
                <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={"Not Configured"}
                    cardType="Schema Registry"
                  /></Column>
                <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={"NaN"}
                    cardType="NaN"
                  /></Column>
                <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={"NaN"}
                    cardType="NaN"
                  /></Column>
              </Grid>
            </Tile>

          
            <h5 className="mt-4">
              Tips & Recommendation
            </h5>

            <Tile id="tile-1">
              <Grid narrow>
              <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={"NaN"}
                    cardType="NaN"
                  /></Column>
                <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={"NaN"}
                    cardType="NaN"
                  /></Column>
                <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={"NaN"}
                    cardType="NaN"
                  /></Column>
                <Column lg={4}> <DashBoardCardStatus
                    onresize={null}
                    data={"NaN"}
                    cardType="NaN"
                  /></Column>
              </Grid>
            </Tile>

          </Column>
        </div>

      </Layout>

    );
  }
};

export default Overview;
