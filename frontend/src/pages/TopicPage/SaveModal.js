import React, { Component, useEffect, useState, useRef } from 'react';
import ReactDOM from "react-dom"
import { TrashCan, Save, Download, Add, Trash } from '@carbon/react/icons';
import axios from 'axios';
import Editor from "@monaco-editor/react";

import {
    Grid,
    RadioButtonGroup,RadioButton,
    Modal,Stack
} from '@carbon/react';

const SaveModal = ({ openSaveModal, setOpenSaveModal, setNotify }) => {

    const [topicName, setTopicName] = useState('');
    const [partitions, setPartitions] = useState(1);
    const [replicationFactor, setReplicationFactor] = useState(1);
    const [minInSyncReplicas, setMinInSyncReplicas] = useState(1);
    const [cleanupPolicy, setCleanupPolicy] = useState('delete');
    const [load, setLoad] = useState(false);


    
    const addTopic = (setOpenSaveModal) => {
        setLoad(true);
        setOpenSaveModal(false);
        setNotify(true)
    }

    return (
        <>
            <Modal
                modalHeading="Save Messages"
                primaryButtonText="Save Messages"
                secondaryButtonText="Cancel"
                open={openSaveModal}
                onRequestClose={() => setOpenSaveModal(false)}
                onRequestSubmit={() => addTopic(setOpenSaveModal)}
            >
                <Stack>
                    <p>Select the format in which you want to save all messages</p><br/>
                    <RadioButtonGroup
                        legendText=""
                        name="radio-button-group"
                        defaultSelected="radio-1">
                        <RadioButton
                            labelText="JSON"
                            value="radio-1"
                            id="radio-1"
                        />
                        <RadioButton
                            labelText="CSV"
                            value="radio-2"
                            id="radio-2"
                        />
                    </RadioButtonGroup>
                </Stack>
            </Modal>
        </>
    );
}

export default SaveModal;
