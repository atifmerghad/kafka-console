import React, { Component, useEffect, useState,useRef } from 'react';
import ReactDOM from "react-dom"
import { Save, Download, Add, TrashCan } from "@carbon/react/icons";
import axios from 'axios';
import Editor from "@monaco-editor/react";

import {
    Grid,
    Column, Button, Stack, Dropdown,
    Modal, TextInput, SelectItem, Select, NumberInput, Row, Loading
} from '@carbon/react';

const ProducerModal = ({ open, setOpenModal, setNotify }) => {

    const [topicName, setTopicName] = useState('');
    const [partitions, setPartitions] = useState(1);
    const [replicationFactor, setReplicationFactor] = useState(1);
    const [minInSyncReplicas, setMinInSyncReplicas] = useState(1);
    const [cleanupPolicy, setCleanupPolicy] = useState('delete');
    const [load, setLoad] = useState(false);

    const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }
  function showValue() {
    alert(editorRef.current.getValue());
  }

    const addTopic = (setOpenModal) => {
        setLoad(true);
        let payload ={
            "headers": [
              {
                "key": "tetsts",
                "value": "string"
              }
            ],
            "key": "string",
            "keyFormat": "JSON",
            "value": editorRef.current.getValue(),
            "valueFormat": "JSON",
            "timestamp": 0,
            "partition": 0,
            "offset": 0,
            "topic": "string"
          }
        
        
        const config = {
            headers: {
              'accept': '*/*',
              'Content-Type': 'application/json'
            }
          };
        console.log("value -----> : ",payload);
        axios.post('http://localhost:8080/api/producer/produce/test-topic/1?clusterId=cluster1',payload,config).then((response) => {
            console.log('topic response : ', response);
            if (response.data = 200) {
                setOpenModal(false);
                setNotify(true)
            } else {

            }
        }).catch(error => {
            console.error("topic error : ", error);
        });
    }

    return (
        <>
            <Modal
                modalHeading="Produce Message"
                primaryButtonText="Publish"
                secondaryButtonText="Cancel"
                open={open}
                onRequestClose={() => setOpenModal(false)}
                onRequestSubmit={() => addTopic(setOpenModal)}
            >
                <Grid narrow>
                    <Stack orientation="horizontal" gap={3}>
                        <div style={{ width: '18em', margin: '5px 0em' }}>
                            <Dropdown
                                id="default"
                                titleText="TOPICS"
                                label="All"
                                items={['test-topic', 'test', 'topic-x', 'time-topic-1']}
                                initialSelectedItem={'test-topic'}
                                itemToString={(item) => (item ? item : '')}
                            />
                        </div>

                        <div style={{ width: '10em', margin: '5px 0px' }}>
                            <Dropdown
                                id="default1"
                                titleText="PARTITION"
                                items={['Partition 1', 'Partition 2', 'Partition 3', 'Partition 4']}
                                initialSelectedItem={'Partition 1'}
                                itemToString={(item) => (item ? item : '')}
                            />
                        </div>

                        <div style={{ width: '10em', margin: '5px 0px' }}>
                            <Dropdown
                                id="default1"
                                titleText="COMPRESSION TYPE"
                                items={['Uncompressed', 'GZip', 'Snappy']}
                                initialSelectedItem={'Uncompressed'}
                                itemToString={(item) => (item ? item : '')}
                            />
                        </div>

                        <div style={{ width: '10em',margin: '5px 0px' }}>
                            <Dropdown
                                id="default2"
                                titleText="TYPE"
                                items={['TEXT', 'JSON', 'BINARY']}
                                initialSelectedItem={'JSON'}
                                itemToString={(item) => (item ? item : '')}
                            />
                        </div>
                    </Stack>
                </Grid>
                <Editor
                    height="30vh"
                    defaultLanguage="json"
                    onMount={handleEditorDidMount}
                />
            </Modal>
        </>
    );
}

export default ProducerModal;
