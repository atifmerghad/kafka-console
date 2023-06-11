import React, { Component, useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column,
  DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectRow, TableToolbar,
  TableBatchActions, TableBatchActionn, TableToolbarContent, TableBatchAction, TableToolbarSearch, TableToolbarMenu,
  TableToolbarAction, Button, TableSelectAll, Stack, Section, Heading, Tile, Pagination, Checkbox,
  Modal, TextInput, SelectItem, Select, ToastNotification, InlineNotification,TableExpandRow,TableExpandHeader,DataTableSkeleton,SkeletonText
} from '@carbon/react';
import { headerData, rowData } from './sampleData';
import { Save, Download, Add, TrashCan } from "@carbon/react/icons";

import Svg from '../../components/Svg'

import axios from 'axios';

const SecurityPage = () => {

  const showHeaders = true;
  const [isLoading, SetIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [acls, setAcls] = useState([]);
  const [notify, setNotify] = useState(false);
  var allRows = acls;

  useEffect(() => {
    axios.get('http://localhost:8080/api/acls/?clusterId=cluster1').then((response) => {
      var acls = response.data;
      SetIsLoading(false);
      if (acls.length > 0) {
        acls.forEach((element, i) => {
          acls[i]['id'] = (i+1);
        });
      }
      setAcls(acls);
      allRows = acls;
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
    <div className="page-container">
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <Breadcrumb noTrailingSlash aria-label="Page navigation">
          <BreadcrumbItem>
            <a href="/">Cluster</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/">Kafka Access Control</a> 
          </BreadcrumbItem>
          <Svg/>
        </Breadcrumb>

      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2" style={{ marginBottom: '1rem' }}>
        <Tile lg={4} md={4} sm={4}>
          <Grid>
            <Column lg={2} md={8} sm={4}>ACL Count <br />  {isLoading && <SkeletonText />}   {!isLoading &&<h3>{acls.length}</h3>}</Column>
            <Column lg={2} md={8} sm={4}>Users <br />  {isLoading && <SkeletonText />}   {!isLoading &&<h3>{acls.length -2}</h3>}</Column>
            <Column lg={2} md={8} sm={4}>Groups <br />  {isLoading && <SkeletonText />}   {!isLoading &&<h3>{acls.length -5}</h3>}</Column>

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
               <TableToolbar>
                <TableToolbarContent>
                  <TableToolbarSearch
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                    onChange={onInputChange}
                  />
                  <Button renderIcon={Add} iconDescription="Add" size="sm" kind="primary" onClick={() => {setNotify(false)}}>Add ACL</Button>
                </TableToolbarContent>
              </TableToolbar>

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
          totalItems={acls.length}
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

  );
};

export default SecurityPage;
