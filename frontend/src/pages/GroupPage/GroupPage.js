import React, { Component, useEffect, useState } from 'react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column,
  DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableToolbar,
  TableBatchActions, TableToolbarContent, TableBatchAction, TableToolbarSearch, TableToolbarMenu,
  Tile, Pagination, Checkbox,
 ToastNotification,DataTableSkeleton,SkeletonText
} from '@carbon/react';
import { headerData, rowData } from './sampleData';
import { Save, Download, Add, TrashCan } from '@carbon/react/icons';


import Layout from "../../components/Layout/Layout";

import { apiClient } from "../../utils/client";

 
const GroupPage = () => {
  
  const [isLoading, SetIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [groups, setGroups] = useState([]);
  const [partitions, setPartitions] = useState(0);
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState(false);

  var allRows = groups;

  const showHeaders = true;
  useEffect(() => {
    apiClient.get('http://localhost:8080/api/consumer-groups?clusterId=cluster1').then((response) => {
      console.log("response :",response);
      var groups = response.data//.consumerGroups
      var count = 0;
      SetIsLoading(false)
      if (groups.length > 0) {
       
        groups.forEach((element, i) => {
          groups[i]['id'] = element.groupId;
          count = 0;
        });
      }
      setPartitions(count);
      setGroups(groups);
      allRows = groups;
      setRows(paginate({ page: 1, pageSize: 5 }));
    }).catch(error => {
      console.log("Axios handle error - ctash")
   });
  }, []);

  const deletegroups = () => {
    console.log("delete groups ");
  }

  const savegroups = () => {
    console.log("savegroups groups ");
  }

  const downloadgroups = () => {
    console.log("downloadgroups groups ");
  }

  const paginate = ({ page, pageSize }) => {
    console.log("call paginate - page : ", page, " pageSize : ", pageSize, " length : ", allRows.length);
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
            <a href="/">Consumer Groups</a> 
          </BreadcrumbItem>
        </Breadcrumb>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2" style={{ marginBottom: '1rem' }}>
        <Tile lg={4} md={4} sm={4}>
          <Grid>
            <Column lg={2} md={8} sm={4}>Total Groups <br />   {isLoading && <SkeletonText />} {!isLoading &&  <h3>  {groups.length}</h3>} </Column>
            <Column lg={8} md={8} sm={4}>Stable <br />  {isLoading && <SkeletonText />} {!isLoading &&  <h3>  {groups.length}</h3>}   </Column>
          </Grid>
        </Tile>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        {isLoading &&  <DataTableSkeleton headers={showHeaders ? headerData : null} />}
        {!isLoading && 
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
          }) => (
            <TableContainer>
              <TableToolbar>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={TrashCan}
                    onClick={deletegroups}
                  >
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={Save}
                    onClick={savegroups}
                  >
                    Save
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={Download}
                    onClick={downloadgroups}
                  >
                    Download
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent>
                  <TableToolbarSearch
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                    onChange={onInputChange}
                  />
                  <TableToolbarMenu
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                  >
                    <Checkbox labelText={`Internal groups`} id="checkbox-label-1" />
                  </TableToolbarMenu>

                </TableToolbarContent>
              </TableToolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
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
          totalItems={groups.length}
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

export default GroupPage;
