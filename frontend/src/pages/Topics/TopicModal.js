import React, { Component, useEffect, useState } from 'react';
import ReactDOM from "react-dom"
import { Save, Download, Add, TrashCan } from "@carbon/react/icons";
import { apiClient } from "../../utils/client";

import {
    Grid,
    Column,Button, 
    Modal, TextInput, SelectItem, Select, NumberInput,Row,Loading
} from '@carbon/react';

const TopicModal = ({open,setOpenModal,setTopics, setNotify}) => {

  const [topicName, setTopicName] = useState('');
  const [partitions, setPartitions] = useState(1);
  const [replicationFactor, setReplicationFactor] = useState(1);
  const [minInSyncReplicas, setMinInSyncReplicas] = useState(1);
  const [cleanupPolicy, setCleanupPolicy] = useState('delete');
  const [load, setLoad] = useState(false);

  const addTopic = (setOpenModal, setTopics) => {
    console.log("topic : ",topicName);
    setLoad(true);
    console.log("new topic : ", topicName, partitions);
    apiClient.post('http://localhost:8080/api/topic?clusterId=cluster1',
    {
        topicName: topicName
    }
    ).then((response) => { 
        console.log('topic response : ', response);
        if(response.status = 200){
            const new_topic = {
                "topicName": topicName,
                "isInternal": false,
                "partitions": null,
                "partitionCount": 1,
                "replicationFactor": 0,
                "cleanupPolicy": null,
                "documentation": null,
                "allowedActions": null,
                "id":123
            };
            setTopics(data => [new_topic,...data]);
            setOpenModal(false);
            setNotify({"status":true, "message": "Topic created successfully", "kind":"success"})
        }else{

        }
      }).catch(error => {
        console.error("topic error : ",error);
      });
}    

    return (
        <>
                <Modal
                    modalHeading="Create Topic"
                    primaryButtonText="Create"
                    secondaryButtonText="Cancel"
                    open={open}
                    onRequestClose={() => setOpenModal(false)}
                    onRequestSubmit={() => addTopic(setOpenModal,setTopics)}
                >
                    <TextInput
                        data-modal-primary-focus
                        id="text-input-1"
                        labelText="TOPIC NAME"
                        placeholder="e.g. test-topic"
                        invalidText="Topic name not valid"
                       // value={inputValue}
                        //onBlure={setInputValue}
                        onChange={(e) => setTopicName(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                    />
                    <Grid narrow style={{ marginBottom: '1rem' }}>
                        <Column lg={6} md={6} sm={6}  >
                            <NumberInput
                                id="carbon-number"
                                min={1}
                                max={100}
                                value={1}
                                label="PARTITIONS"
                                invalidText="Number is not valid"
                                iconDescription=""
                                onChange={(e) => setPartitions(e.target.value)}
                            />
                        </Column>
                        <Column lg={6} md={6} sm={6}  >
                            <NumberInput
                                id="carbon-number"
                                min={1}
                                max={100}
                                value={1}
                                label="Replication Factor"
                                invalidText="Number is not valid"
                                iconDescription=""
                            />

                        </Column>
                        <Column lg={4} md={4} sm={4}  >
                            <NumberInput
                                id="carbon-number"
                                min={1}
                                max={100}
                                value={1}
                                label="Min In-Sync Replicas"
                                invalidText="Number is not valid"
                                iconDescription=""

                            />
                        </Column>
                    </Grid>
                    <Grid narrow>
                        <Column lg={6} md={6} sm={6} >
                            <Select id="select-1" defaultValue="us-south" labelText="CLEANUP POLICY" >
                                <SelectItem value="us-south" text="delete" />
                                <SelectItem value="us-east" text="compact" />
                            </Select>
                        </Column>
                       { load && <Loading description="Active loading indicator" withOverlay={true} small /> }
                    </Grid>
                   
                </Modal>
            </>
    );
}

export default TopicModal;
