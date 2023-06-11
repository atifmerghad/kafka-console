import React, { Component, useEffect, useState } from 'react';
import ReactDOM from "react-dom"
import {  Save, Download, Add, TrashCan } from "@carbon/react/icons";
import axios from 'axios';

import {
    Grid,
    Column,Button, 
    Modal, TextInput, SelectItem, Select, NumberInput,Row,Loading,Tag
} from '@carbon/react';

const TopicDeleteModal = ({open,topicName,setOpenTopicDeleteModal,setNotify}) => {

  const [name, setName] = useState('test');
  const [load, setLoad] = useState(false);
  const [match, setMatch] = useState(true);

    const deleteTopic = (topicName,setOpenTopicDeleteModal) => {
        if(name==topicName){
        axios.delete('http://localhost:8080/api/topic/'+topicName+'?clusterId=cluster1')
        .then(response => {
        console.log("response.data : ", response.status == 200);
        if(response.status == 200){
            setOpenTopicDeleteModal(false)
        }else{
            setOpenTopicDeleteModal(false)
        }
        })
        .catch(error => {
        console.error("error : ",error);
        });
       }else{
        setMatch(false)
        console.log('topic not match');
       }
    }

    return (
        <>
                <Modal
                    modalHeading="Delete Topic"
                    primaryButtonText="Delete"
                    secondaryButtonText="Cancel"
                    open={open}
                    danger='true'
                    onRequestClose={() => setOpenTopicDeleteModal(false)}
                    onRequestSubmit={() => deleteTopic(topicName,setOpenTopicDeleteModal)}
                >
                    <p>Are you sure you want to delete topic 
                    <Tag className="some-class" type="magenta" size="sm" title="Clear Filter">
        {topicName}      </Tag>
                         ?</p>
                    <p>This action cannot be undone.</p>
                    <br/>
                    <TextInput
                        data-modal-primary-focus
                        id="text-input-1"
                        labelText="TOPIC NAME"
                        placeholder="e.g. test-topic"
                        invalidText="Topic name not valid"
                       // value={inputValue}
                        //onBlure={setInputValue}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                    />
                   { !match &&  <span style={{color:'red'}}>Topic not match, please enter correct name</span>}
                </Modal>
            </>
    );
}

export default TopicDeleteModal;
