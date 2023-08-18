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
                <a href="/dashboard">Home</a>
              </BreadcrumbItem>
            </Breadcrumb>

            <h3 className="landing-page__heading">
              Welcome back to Kafka Console!
            </h3>
            <br></br>
            <h5>Your Console overview</h5>

            <div class="section">
              <p>Summary of your existing resources</p> <br />
              <Grid>
                <Column lg={2} md={2} sm={2}>
                  <DashBoardCardStatus
                    onresize={null}
                    data={1}
                    cardType="Environments"
                  />
                </Column>

                <Column lg={2} md={2} sm={2}>
                  <DashBoardCardStatus
                    onresize={null}
                    data={3}
                    cardType="Clusters"
                  />
                </Column>

                <Column lg={2} md={2} sm={2}>
                  <DashBoardCardStatus
                    onresize={null}
                    data={12}
                    cardType="Topics"
                  />
                </Column>

                <Column lg={2} md={2} sm={2}>
                  <DashBoardCardStatus
                    onresize={null}
                    data={122}
                    cardType="Partitions"
                  />
                </Column>

                <Column lg={2} md={2} sm={2}>
                  <DashBoardCardStatus 
                     className="no-border"
                    onresize={null}
                    data={0}
                    cardType="Connectors"
                  />
                </Column>
              </Grid>
            </div>

            <h5 className="mt-4">
            Recently viewed clusters
            </h5>

            <div class="section">
            <DashBoardCardStatus
              onresize={null}
              data={1}
              cardType="Cluster_aws_0"
            />
            </div>

            <h5 className="mt-4">
              Tips & Recommendation
            </h5>

            <div class="section">
            <DashBoardCardStatus
              onresize={null}
              data={1}
              cardType="Explore with an interactive demo"
            />
            </div>

          </Column>
        </div>
      </Layout>
    );
  }
};

export default Overview;
