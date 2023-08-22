import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout";
import { useTheme } from '../../contexts/ThemeContext';
import { Form, Stack, TextInput, TextArea, Select, SelectItem, Button, Tile } from '@carbon/react';
import Stomp from "stompjs";


const Tools = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/chat");
        const stompClient = Stomp.over(socket);
        
        stompClient.connect({}, frame => {
          console.log("Connected: " + frame);
          stompClient.subscribe("/topic/randomMessages", message => {
            //const body = JSON.parse(message.body);
            const newMessage = message.body;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
    
          if (socket.readyState === WebSocket.OPEN) {
            //const messageContent = "Hello from the frontend!";
            //stompClient.send("/app/someEndpoint", {}, JSON.stringify(messageContent));
          }
        });
    
        return () => {
        if (socket.readyState === WebSocket.OPEN)
          stompClient.disconnect();
        };
      }, []);

    return (
        <Layout>
            <div className="page-container">
                <Form>
                    <Stack gap={7}>
                        <Stack gap={6} orientation="horizontal">
                            <TextInput
                                id="test2"
                                invalidText="Invalid error message."
                                labelText="Topic Name"
                                placeholder="topic_test"
                            />
                            <TextInput
                                id="test2"
                                invalidText="Invalid error message."
                                labelText="Password"
                                placeholder="***********"
                            />

                            <div>
                                <div>--</div>
                                <Button
                                    kind="primary"
                                    tabIndex={0}
                                    
                                >
                                    Save
                                </Button>
                            </div>
                        </Stack>


                        <TextArea

                            helperText="This will show details about your cluster information ..."
                            id="test5"
                            invalidText="Invalid error message."
                            labelText="Qeury Editor"
                            placeholder="Optional placeholder text"
                            rows={4}
                        />
                        <Select
                            defaultValue="placeholder-item"
                            id="select-1"
                            invalidText="Write your query to consume the data with specofoed criteria"
                            labelText="Read from"
                        >
                            <SelectItem
                                text="beginning"
                                value="beginning"
                            />
                            <SelectItem
                                text="latest"
                                value="latest"
                            />
                            <SelectItem
                                text="Custom"
                                value="custom"
                            />
                        </Select>
                        <Button
                            kind="primary"
                            tabIndex={0}
                        >
                            Run Query
                        </Button>

                        <Tile>
                        {messages.map((message, index) => (
                            <div key={index}>{message}</div>
                            ))}
                     </Tile>
                    </Stack>
                </Form>
            </div>
        </Layout>
    )
}

export default Tools;
