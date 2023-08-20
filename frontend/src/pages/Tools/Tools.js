import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout";
import { useTheme } from '../../hooks/ThemeContext';
import { Form, Stack, TextInput, TextArea, Select, SelectItem, Button } from '@carbon/react';


const Tools = () => {

    const { theme, toggleTheme } = useTheme();

    return (
        <Layout>
            <div className="page-container">
                {/*
                              <div className="settings">
                    <h2>Theme Settings</h2>
                    <Button onClick={toggleTheme}>Theme {theme}</Button> <pre>   </pre>
                </div>
                 */}

                <Form>
                    <Stack gap={7}>
                        <TextInput
                            helperText="This will show details about your cluster information ..."
                            id="test2"
                            invalidText="Invalid error message."
                            labelText="Auttomate Kafka Tasks"
                            placeholder="Boostrap Server"
                        />
                        <TextArea
                            cols={50}
                            helperText="This will show details about your cluster information ..."
                            id="test5"
                            invalidText="Invalid error message."
                            labelText="Auttomate Kafka Tasks"
                            placeholder="Optional placeholder text"
                            rows={4}
                        />
                        <Select
                            defaultValue="placeholder-item"
                            id="select-1"
                            invalidText="This is an invalid error message."
                            labelText="Select"
                        >
                            <SelectItem
                                text="Option 1"
                                value="option-1"
                            />
                            <SelectItem
                                text="Option 2"
                                value="option-2"
                            />
                            <SelectItem
                                text="Option 3"
                                value="option-3"
                            />
                        </Select>
                        <Button
                            kind="primary"
                            tabIndex={0}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Stack>
                </Form>
            </div>
        </Layout>
    )
}

export default Tools;
