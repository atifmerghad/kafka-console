import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout";
import { Form, Stack, TextInput, Tile, Select, SelectItem, Button, Grid, Column, FileUploader } from '@carbon/react';


const Profile = () => {

    return (
        <Layout>
            <div className="page-container">
                <Grid>
                    <Column lg={6}>
                        <Tile>
                        Contact information
                        </Tile>
                        <div style ={{width:"min-content"}}>
                            <img width="100%" src="/images/avatar_1.png" style ={{paddingTop: "3rem"}}></img>
                            <FileUploader buttonLabel="Uplad a photo" buttonKind=""  filenameStatus="edit" multiple={true} disabled={false} iconDescription="Uplad a photo" name="" />
                            <Button kind="danger">Delete picture</Button>
                        </div>
                        <div>
                        <h2>Name</h2>
                        <h5>Atif Merghad</h5>
                        </div>
                    </Column>
                    <Column lg={10}>
                        <Form>
                            <Stack gap={7}>
                                <TextInput
                                    helperText="This will show details about your cluster information ..."
                                    id="test2"
                                    invalidText="Invalid error message."
                                    labelText="User ID"
                                    placeholder="Boostrap Server"
                                    value="atif.merghad"
                                    disabled
                                />
                                <TextInput
                                    helperText="This will show details about your cluster information ..."
                                    id="test2"
                                    invalidText="Invalid error message."
                                    labelText="Password"
                                    placeholder="Boostrap Server"
                                    value="************"
                                    disabled
                                />

                                <TextInput
                                    helperText="This will show details about your cluster information ..."
                                    id="test2"
                                    invalidText="Invalid error message."
                                    labelText="User ID"
                                    placeholder="Boostrap Server"
                                    value="atif.merghad@gmail.com"
                                    disabled
                                />

                                <TextInput
                                    helperText="Click Edit to enter your role."
                                    id="test2"
                                    invalidText="Invalid error message."
                                    labelText="Role"
                                    placeholder="User, Admin"
                                />

                                <TextInput
                                    helperText="Click Edit to enter your department."
                                    id="test2"
                                    invalidText="Invalid error message."
                                    labelText="Department"
                                    placeholder="IT, ..."
                                />

                                <Select
                                    defaultValue="placeholder-item"
                                    id="select-1"
                                    invalidText="This is an invalid error message."
                                    labelText="Language"
                                >
                                    <SelectItem
                                        text="English"
                                        value="English"
                                    />
                                    <SelectItem
                                        text="Frensh"
                                        value="Frensh"
                                    />
                                    <SelectItem
                                        text="Arabic"
                                        value="Arabic"
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

                    </Column>
                </Grid>
            </div>
        </Layout>
    )
}

export default Profile;
