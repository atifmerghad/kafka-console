import React, { Component, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Layout from "../../components/Layout/Layout";
import JSONPretty from 'react-json-pretty';
import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column, Toggle, Search, FormGroup,IconButton,
  DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableExpandedRow, TableExpandHeader, Button, Stack, Tile, Pagination, ContentSwitcher, Switch, TableExpandRow, Dropdown, ToastNotification, DataTableSkeleton, SkeletonText
} from '@carbon/react';
import { topicHeaderDetails } from './sampleData';
import { TrashCan, Save, Download, Add, Renew, Send, Close} from "@carbon/react/icons";

import ReactJson from 'react-json-view'

import ProducerModal from './ProducerModal';
import RecordDeleteModal from './RecordDeleteModal';
import SaveModal from './SaveModal';

import Svg from '../../components/Svg'

import { apiClient } from "../../utils/client";

const TopicDetails = () => {

  const theme = require("react-json-pretty/dist/monikai");
  const items = ['All', 'Partition 0'];
  const showHeaders = true;
  const [isLoading, SetIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [topicDetails, setTopicDetails] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageLoader, SetMessageLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [notify, setNotify] = useState({"status":false, "message": "Topic created seccusfuly", "kind":"success"});
  const [limit, setLimit] = useState(500);
  const [startOffset, setStartOffset] = useState('Newest-500');
  

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let topic = params.get('topic');
  var allRows = messages;
  const handleOnClick = () => {
    console.log("----click message !");
  }

  const fetchMessages = (limit) =>{
    SetMessageLoader(true);
    console.log('call fetch data ! ', limit);
    apiClient.get('http://localhost:8080/api/consume/'+topic+'/all?page=1&limit='+limit+'&clusterId=cluster1').then((response) => {
        console.log('--------> data ---> ', response.data);
        var initialArray = response.data.messages
        const reversedArray = [...initialArray].reverse();
        setMessages(reversedArray)
        //totalItems = response.data.totalResults;
        allRows = reversedArray;
        setRows(paginate({ page: 1, pageSize: 5 }));
        SetMessageLoader(false)
      }).catch(error => {
        console.log("Axios handle error - ctash")
     });;
  }
  useEffect(() => {
    apiClient.get('http://localhost:8080/api/topic/'+topic+'?clusterId=cluster1').then((response) => {
      setTopicDetails(response.data)
      SetIsLoading(false)
    }).catch(error => {
      console.log("Axios handle error - ctash")
   }).catch(error => {
    console.log("Axios handle error - ctash")
 });;
    
    fetchMessages(limit);
  }, []);

  
  const searchTopic = (e) => {

    setRows(allRows.filter(r => r.value.includes(e.target.value)));
    console.log("search in topic : ", e.target.value, allRows.filter(r => r.value.includes(e.target.value)));

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
            <a href="/dashboard">Cluster</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/topics">Topics</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href={'/topic-details?topic=' + topic} style={{ fontWeight: 'bold' }}>{topic}</a>
          </BreadcrumbItem>
          <Svg />
        </Breadcrumb>
      </Column>
      <br></br>
      <Column lg={16} md={8} sm={4} className="landing-page__r2" style={{ marginBottom: '1rem' }}>
        <Tile lg={4} md={4} sm={4}>
          <Grid>
            <Column lg={2} md={8} sm={4}>Size <br />  {isLoading && <SkeletonText />}  {!isLoading && <h3>{topicDetails['size']} B</h3>}</Column>
            <Column lg={2} md={8} sm={4}>Messages <br />  {isLoading && <SkeletonText />}  {!isLoading && <h3>{messages.length}</h3>}</Column>
            <Column lg={2} md={8} sm={4} style={{ borderLeft: '2px solid #cccccc', paddingLeft: '10px' }}>cleanup.policy <br />  {isLoading && <SkeletonText />}  {!isLoading && <h3>{topicDetails['cleanup.policy']}</h3>}</Column>
            <Column lg={2} md={8} sm={4}>segment.bytes<br />  {isLoading && <SkeletonText />}  {!isLoading && <h3>{topicDetails['segment.bytes']/1048576} MiB</h3>}</Column>
            <Column lg={2} md={8} sm={4}>segment.ms<br />  {isLoading && <SkeletonText />}  {!isLoading && <h3>{topicDetails['segment.ms']/(60*60*24*1000)} days</h3>}</Column>
            <Column lg={2} md={8} sm={4}>retention.ms <br />  {isLoading && <SkeletonText />}  {!isLoading && <h3>{topicDetails['retention.ms']/(60*60*24*1000)} days</h3>}</Column>
            <Column lg={2} md={8} sm={4}>retention.bytes <br />  {isLoading && <SkeletonText />}  {!isLoading && <h3>{topicDetails['retention.bytes']=='-1'?'Infinite':'NaN'}</h3>}</Column>

          </Grid>
        </Tile>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <ContentSwitcher onChange={() => { }}>
          <Switch name="one" text="Messages" />
          <Switch name="two" text="Consumers" />
          <Switch name="three" text="Partitions" />
          <Switch name="f" text="Configuration" />
          <Switch name="s" text="ACL" />
          <Switch name="s" text="Docs" />
        </ContentSwitcher>
        {/* 
        <Tabs >
          <TabList aria-label="List of tabs" contained>
            <Tab>Messages</Tab>
            <Tab>Consumers</Tab>
            <Tab>Partitions</Tab>
            <Tab>Configuration</Tab>
            <Tab>ACL</Tab>
            <Tab disabled>Docs</Tab>
          </TabList>
        </Tabs>
*/}
        <FormGroup legendText="">
          <Grid narrow>
          <Column  lg={8} sm={8}>
          <Stack orientation="horizontal" gap={3}>
            <div style={{ width: '9em', margin: '5px 1em' }}>
              <Dropdown
                id="default"
                titleText="PARTITION"
                label="All"
                onChange={({ selectedItem }) => {console.log('selectedPartition :',selectedItem);}}
                items={items}
                initialSelectedItem={items[0]}
                itemToString={(item) => (item ? item : '')}
              />
            </div>

            <div style={{ width: '9em', margin: '5px 0px' }}>
              <Dropdown
              label=""
              onChange={({ selectedItem }) => {console.log('START OFFSET :',selectedItem);setStartOffset(selectedItem)}}
                id="default1"
                titleText="START OFFSET"
                items={['Newest-'+limit, 'Oldset', 'Custom', 'Timestamp']}
                initialSelectedItem={'Newest-500'}
                selectedItem={startOffset}
                itemToString={(item) => (item ? item : '')}
              />
            </div>

            <div style={{ width: '9em', margin: '5px 0px' }}>
              <Dropdown
               label=""
                id="default2"
                titleText="MAX RESULTS"
                onChange={({ selectedItem }) =>{ setLimit(selectedItem); setStartOffset('Newest-'+selectedItem); fetchMessages(selectedItem)}}
                items={[1,5, 10, 20, 50, 100,200,500]}
                initialSelectedItem={limit}
                itemToString={(item) => (item ? item : '')}
              />
            </div>
            <div style={{ margin: '0.4em' }}>
              <Toggle
                labelText="FILTER"
                labelA=""
                labelB=""
                id="toggle-1"
                className="blue" />
            </div>
            <div style={{ margin: '1.8rem 0em' }}>
            <IconButton
              kind="tertiary"
              label={'refresh'}
              onClick={ fetchMessages}
              >      
              <Renew />
            </IconButton>
          </div>
          </Stack>
          </Column>
          <Column lg={8} sm={8}>
          <Stack orientation="horizontal" gap={3} className="float_right">
            <div style={{ margin: '1.8rem 0em' }}>
            <Button   style={{minHeight: '2.5rem'}}  renderIcon={TrashCan} kind="danger--tertiary" iconDescription="TrashCan" onClick={() => {setOpenModal(true)}}>Delete</Button>
            </div>

            <div style={{ margin: '1.8rem 0em' }}>
            <Button   style={{minHeight: '2.5rem'}} renderIcon={Send} iconDescription="Add"  kind="tertiary" onClick={() => {setOpen(true);setNotify({"status":false, "message": ""})}}>Produce</Button>
            </div>

            <div style={{ margin: '1.8rem 0em' }}>
            <Search 
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search-1"
            onChange={searchTopic}
            onKeyDown={() => { }} />
            </div>
          </Stack>
          </Column>
          </Grid>
        </FormGroup>
        {messageLoader && <DataTableSkeleton showHeader={false}  showToolbar={false} headers={showHeaders ? topicHeaderDetails : null} />}
        {!messageLoader &&
          <div>
            <DataTable rows={rows} headers={topicHeaderDetails} getRowId={(row) => row.offset}>
              {({
                rows,
                headers,
                getHeaderProps,
                getRowProps,
                getSelectionProps,
                getBatchActionProps,
                onInputChange,
                selectedRows
              }) => (
                <TableContainer className="table-container">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableExpandHeader />
                        {headers.map((header) => (
                          <TableHeader {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        
                        <React.Fragment  key={row.id}  >
                          <TableExpandRow {...getRowProps({ row })}>
                            {row.cells.map((cell) => (
                              <TableCell
                                className={
                                  cell.info.header === 'value' ? 'line-overflow' : "test"
                                }
                                key={cell.value}>{(cell.info.header === 'timestamp')?(new Date(cell.value)).toLocaleString(undefined, {
                                  year: 'numeric',
                                  month: 'numeric',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  second: 'numeric',
                                }):cell.value}</TableCell>
                            ))}
                          </TableExpandRow>
                          <TableExpandedRow
                            colSpan={headers.length + 3}
                            className="demo-expanded-td">
                               {(() => {
                                try {
                                  const parsedValue = JSON.parse(row.cells[4].value);
                                  return <ReactJson src={parsedValue} />;
                                } catch (error) {
                                  console.error('Error parsing JSON:', error);
                                  return <p>Invalid JSON value: {row.cells[4].value}</p>;
                                }
                              })()}
                          </TableExpandedRow>
                        </React.Fragment>
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
              pageSize={5}
              pageSizes={[
                5,
                10,
                20,
                30,
                40,
                50
              ]}
              totalItems={messages.length}
              size="md"
            />
            <br />
            <Button renderIcon={Download} iconDescription="Download" size="sm" kind="primary" onClick={() => {setOpenSaveModal(true)}}>Save Messages</Button>
          </div>}
      </Column>

      {open && <ProducerModal open={open} setOpenModal={setOpen} setNotify={setNotify}  setMessages={setRows} />}
      {openModal && <RecordDeleteModal topicName={topic} openModal={openModal} setOpenModal={setOpenModal}  />}
      {openSaveModal && <SaveModal topicName={topic} openSaveModal={openSaveModal} setOpenSaveModal={setOpenSaveModal}  />}
      
      {notify.status &&
        <ToastNotification
          title={notify.message}
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

export default TopicDetails;
