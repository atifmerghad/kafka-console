import React, { useEffect, useState } from 'react';

import Layout from "../../components/Layout/Layout";

import { apiClient } from "../../utils/client";

import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column,
  DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Tile, Pagination,ToastNotification,TableExpandRow,TableExpandHeader,DataTableSkeleton,SkeletonText, Theme
} from '@carbon/react';
import { headerData } from './sampleData';

import Svg from '../../components/Svg'


const Brokers = () => {

  const showHeaders = true;

  const [isLoading, SetIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [controllerId, setControllerId] = useState(0);
  const [brokers, setBrokers] = useState([]);
  const [version, setVersion] = useState("");
  const [notify, setNotify] = useState(false);

  
  var allRows = brokers;

  useEffect(() => { 
    apiClient.get('http://localhost:8080/api/brokers?clusterId=cluster1').then((response) => {
      var version = response.data.version;
      var brokers = response.data.brokers;
      var controllerId = response.data.controllerId;
      var count = 0;
      
      SetIsLoading(false);
      if (brokers.length > 0) {
        brokers.forEach((element, i) => {
          brokers[i]['id'] = element.brokerId;
          count = 0;
        });
      }
      setVersion(version);
      setControllerId(controllerId);
      setBrokers(brokers);
      allRows = brokers;
      setRows(paginate({ page: 1, pageSize: 10 }));
    }).catch(error => {
      console.log("Axios handle error - ctash")
   });
  }, []);

  const paginate = ({ page, pageSize }) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return allRows.slice(start, end);
  };

  return (
    <Layout>
    <div className="page-container">
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <Breadcrumb noTrailingSlash aria-label="Page navigation">
          <BreadcrumbItem>
            <a href="/">Cluster</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/">Brokers</a> 
          </BreadcrumbItem>
          <Svg/>
        </Breadcrumb>

      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2" style={{ marginBottom: '1rem' }}>
        <Tile lg={4} md={4} sm={4}>
          <Grid>
            <Column lg={2} md={8} sm={4}>ControllerID <br /> {isLoading && <SkeletonText />}   {!isLoading && <h3>{controllerId}</h3>} </Column>
            <Column lg={2} md={8} sm={4}>Broker Count <br />  {isLoading && <SkeletonText />}   {!isLoading &&<h3>{brokers.length}</h3>}</Column>
            <Column lg={8} md={8} sm={4}>Cluster Version<br />  {isLoading && <SkeletonText />}   {!isLoading &&<h3>{'V'+version}</h3>}</Column>
          </Grid>
        </Tile>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
     
      {isLoading &&  <DataTableSkeleton headers={showHeaders ? headerData : null} />}

        {
        !isLoading &&
        <div>
          <DataTable rows={rows} headers={headerData} >
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getBatchActionProps,
            onInputChange,
            selectedRows,
            getExpandHeaderProps
          }) => (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableExpandHeader
               enableExpando={true}
                {...getExpandHeaderProps()}
             />
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (                 
                    <TableExpandRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableExpandRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
        <Pagination
          backwardText="Previous page"
          forwardText="Next page"
          itemsPerPageText="Items per page:"
          onChange={({ page, pageSize }) => {
            setRows(paginate({ page, pageSize }));
          }}
          page={1}
          pageNumberText="Page Number"
          pageSize={10}
          pageSizes={[
            10,
            20,
            30,
            40,
            50
          ]}
          totalItems={brokers.length}
          size="md"
        />
        </div>
        }
      </Column>

      {notify &&
        <ToastNotification
          title='Topic created seccusfuly'
          subtitle=''
          timeout="5000"
          kind="success"
          style={{ position: "absolute", bottom: 5, right: 5, zIndex: 9999, float: "right" }}
        />
      }
    </div>
    </Layout>
  );
};

export default Brokers;
