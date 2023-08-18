import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../../components/Layout/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column,
  DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectRow, TableToolbar,
  TableBatchActions, TableBatchActionn, TableToolbarContent, TableBatchAction, TableToolbarSearch, TableToolbarMenu,
  TableToolbarAction, Button, TableSelectAll, Stack, Section, Heading, Tile, Pagination, Checkbox,Link,
  Modal, TextInput, SelectItem, Select, ToastNotification,InlineNotification,DataTableSkeleton,SkeletonText,SkeletonPlaceholder
} from '@carbon/react';
import { headerData, rowData } from './sampleData';
import { Save, Download, Add, TrashCan } from "@carbon/react/icons";

import TopicModal from './TopicModal';
import TopicDeleteModal from './TopicDeleteModal';

import { apiClient } from "../../utils/client";


const Topics = () => {
  const showHeaders = true;
  const [isLoading, SetIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [topics, setTopics] = useState([]);
  const [partitions, setPartitions] = useState(0);
  const [open, setOpen] = useState(false);
  const [openTopicDeleteModal, setOpenTopicDeleteModal] = useState(false);
  const [notify, setNotify] = useState({"status":false, "message": ""});
  const [topicName, setTopicName] = useState(false);
  const navigate = useNavigate();


  var allRows = topics;

  useEffect(() => {
    apiClient.get('http://localhost:8080/api/topics?clusterId=cluster1').then((response) => {
      var topics = response.data.topics
      var count = 0;
      SetIsLoading(false)
      if (topics.length > 0) {

        topics.forEach((element, i) => {
          topics[i]['id'] = element.topicName;  
          topics[i]['action'] = <TrashCan onClick={()=>{deleteTopic(element.topicName)}}/>;
          count = count + topics[i].partitionCount;
        });
      }
      setPartitions(count);
      setTopics(response.data.topics);
      allRows = topics;
      setRows(paginate({ page: 1, pageSize: 10 }));
    }).catch(error => {
      console.log("Axios handle error - ctash")
   });
  }, []);

  const deleteTopic = (topicName)=> {
    setTopicName(topicName);
    setOpenTopicDeleteModal(true);
  }

  const saveTopics = () => {
    console.log("saveTopics topics ");
  }

  const downloadTopics = () => {
    console.log("downloadTopics topics ");
  }

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
            <a href="/topics">Topics</a>
          </BreadcrumbItem>
        </Breadcrumb>
      </Column>
<br></br>
      <Column lg={16} md={8} sm={4} className="landing-page__r2" style={{ marginBottom: '1rem' }}>
      <Tile  lg={4} md={4} sm={4}>
        <Grid>
          <Column  lg={2} md={8} sm={4}>Total Topics <br/>  {isLoading && <SkeletonText />}  {!isLoading && <h3>{topics.length} </h3>}</Column>
          <Column  lg={8} md={8} sm={4}>Partitions Details <br/> {isLoading && <SkeletonPlaceholder />} {!isLoading &&  <div style={{borderLeft: '2px solid #cccccc',paddingLeft: '10px'}}><span>Primary : {partitions} <br/>Replicated : 2 <br/>All : 65</span></div>}</Column>
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
            getLinkProps
          }) => (
            <TableContainer>
              <TableToolbar>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={TrashCan}
                    onClick={deleteTopic}
                  >
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={Save}
                    onClick={saveTopics}
                  >
                    Save
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={Download}
                    onClick={downloadTopics}
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
                    <Checkbox labelText={`Internal topics`} id="checkbox-label-1" />
                  </TableToolbarMenu>

                  <Button renderIcon={Add} iconDescription="Add" size="sm" kind="primary" onClick={() => {setOpen(true);setNotify(false)}}>Create Topic</Button>
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
                        
                         (cell.id == row.id+':topicName')?<TableCell key={cell.id} onClick={(e)=>{ navigate('/topic-details?topic='+cell.value);}}>{cell.value}</TableCell>:
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
            5,
            10,
            20,
            30,
            40,
            50
          ]}
          totalItems={topics.length}
          size="md"
        />
    </div>}
      </Column>

      {openTopicDeleteModal && <TopicDeleteModal  open={true}   setTopics={setRows} topicName={topicName} setOpenTopicDeleteModal={setOpenTopicDeleteModal}   setNotify={setNotify} />}
      {open && <TopicModal  open={open} setTopics={setRows} setOpenModal={setOpen} setNotify={setNotify} />}
      {notify.status && 
      <ToastNotification
            title= {notify.message}
            subtitle=''
            timeout="5000"
            kind={notify.kind}
            style={{ position: "absolute", bottom: 5, right: 5, zIndex: 9999, float: "right" }}
        />
      }
    </div>
    </Layout>
  );
};

export default Topics;
