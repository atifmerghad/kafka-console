import React, { Component, useEffect, useState } from 'react';
import ReactDOM from "react-dom"
import { Save, Download, Add, TrashCan } from "@carbon/react/icons";
import axios from 'axios';

import {
    Grid,
    Column, Button,
    Modal, TextInput, SelectItem, Select, NumberInput, Row, Loading, Tag, TileGroup, RadioTile
} from '@carbon/react';

const RecordDeleteModal = ({ topicName, openModal, setOpenModal }) => {

    const [name, setName] = useState('test');
    const [load, setLoad] = useState(false);
    const [match, setMatch] = useState(true);

    const deleteTopic = (topicName, setOpenModal) => {
        if (name == topicName) {
            axios.delete('http://localhost:8080/api/topic/' + topicName + '?clusterId=cluster1')
                .then(response => {
                    console.log("response.data : ", response.status == 200);
                    if (response.status == 200) {
                        setOpenModal(false)
                    } else {
                        setOpenModal(false)
                    }
                })
                .catch(error => {
                    console.error("error : ", error);
                });
        } else {
            setMatch(false)
            console.log('topic not match');
        }
    }

    return (
        <>
            <Modal
                modalHeading="Delete records in topic"
                primaryButtonText="Choose End Offset"
                secondaryButtonText="Cancel"
                open={openModal}
                danger='true'
                onRequestClose={() => setOpenModal(false)}
                onRequestSubmit={() => deleteTopic(topicName, setOpenModal)}
            >

                <br />
                <p>
                    You are about to delete records in your topic <Tag className="some-class" type="magenta" size="sm" title="Clear Filter">{topicName}</Tag>. Choose on what partitions you want to delete records. In the next step you can choose the new low water mark for your selected partitions.
                </p>
                <br/>
                <TileGroup
                    name="G">
                    <RadioTile
                        id="radio-tile-3"
                        value="standard"
                        style={{ marginBottom: '.5rem', border:'0.5px solid black' }}>
                        All Partitons<br/>
                        <span>Delete records until specified offset across all available partitions in this topic.</span>
                    </RadioTile>
                    <RadioTile id="radio-tile-4" value="default-selected"  style={{ border:'0.5px solid black' }}>
                        Specific Partition<br/>
                        <span>Delete records within a specific partition in this topic only.</span>
                    </RadioTile>
                </TileGroup>
                {!match && <span style={{ color: 'red' }}>Under Construction !</span>}
            </Modal>
        </>
    );
}

export default RecordDeleteModal;
