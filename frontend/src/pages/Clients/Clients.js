import React from 'react';
import Layout from "../../components/Layout/Layout";
import { ProgressIndicator, ProgressStep, Tile,Column, Grid } from '@carbon/react';

const Clients = () => {
   
    return (
        <Layout>
        <div className="page-container">
        <Tile>New Client</Tile>
        <p>Produce and consume data with your cluster in the programming language of your choice.</p>
        <br/>
        <div className="some-container">
        <Grid narrow>
          <Column sm={4}>
          <ProgressIndicator vertical>
        <ProgressStep
          complete
          label="Choose your language"
          description="Step 1: Getting started with Carbon Design System"
          secondaryLabel="Get the required configuration for your programming language."
        />
        <ProgressStep
          current
          label="Copy the configuration snippet for your clients"
          secondaryLabel="Paste the following configuration data into a file called client.properties.          "
          description="Step 2: Getting started with Carbon Design System"
        />

        <ProgressStep
          label="Install the required libraries"
          description="Step 3: Getting started with Carbon Design System"
        />
        <ProgressStep
          label="Produce data"
          description="Step 4: Getting started with Carbon Design System"
          invalid
          secondaryLabel="Example invalid step"
        />
        <ProgressStep
          label="Consume data"
          description="Step 5: Getting started with Carbon Design System"
          disabled
        />
      </ProgressIndicator>
          </Column>
          <Column sm={4}>
          Test
          </Column>
        </Grid>
    </div>
            </div>
        </Layout>
    )
}

export default Clients;
