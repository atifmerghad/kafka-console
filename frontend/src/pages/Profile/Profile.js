import React, { startTransition, useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import { Form, Stack, TextInput, Tile, Select, SelectItem, Button, Grid, Column, FileUploader } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import routes from "../../utils/routes";

const Profile = () => {
    const navigate = useNavigate();
    const logout = async () => {
        await startTransition(() => {
          localStorage.clear();
          navigate(routes.LOGIN);
        });
      };
  
    return (
        <Layout>
            <div className="page-container">
                <Grid>
                    <Column lg={8}>
                        <Tile>
                            User information
                        </Tile>

                        <div style={{ width: "min-content" }}>
                            <img width="100%" src="/images/avatar_1.png" style={{ paddingTop: "3rem" }}></img>
                            <div>
                                <FileUploader buttonLabel="Uplad a photo" buttonKind="" filenameStatus="edit" multiple={true} disabled={false} iconDescription="Uplad a photo" name="" />

                                <Button kind="danger">Delete picture</Button>


                            </div>
                        </div>

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
                                    labelText="Email"
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
                    <Column lg={8}>
                        <Tile>
                            Settings
                        </Tile>
                        <div>
                            <br></br>
                            <Button onClick={() => logout()}>Log out</Button>
                        </div>

                    </Column>
                </Grid>
            </div>
        </Layout>
    )
}

export default Profile;
