import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from "../../components/Layout/Layout";
import { Column, CodeSnippet, TextInput,Button } from '@carbon/react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia, okaidiaInit } from '@uiw/codemirror-theme-okaidia';
import { useTheme } from '../../contexts/ThemeContext';


const addSchema = () => {

  const { theme, toggleTheme } = useTheme();


  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let schema = params.get('schema');

  const sh = `{
    "type": "record",
    "namespace": "com.mycorp.mynamespace",
    "name": "sampleRecord",
    "doc": "Sample schema to help you get started.",
    "fields": [
      {
        "name": "my_field1",
        "type": "int",
        "doc": "The int type is a 32-bit signed integer."
      },
      {
        "name": "my_field2",
        "type": "double",
        "doc": "The double type is a double precision (64-bit) IEEE 754 floating-point number."
      },
      {
        "name": "my_field3",
        "type": "string",
        "doc": "The string is a unicode character sequence."
      }
    ]
  }`;

  return (
    <Layout>
      <div className="page-container">
        <h6>Subject Name : {schema}</h6>
        <br></br>

        <h5>Add new schema</h5>

        <TextInput
          id="test2"
          invalidText="Invalid error message."
          labelText="Subject Name"
          placeholder="topic_test"
        />
        <br></br>
        <h5>Schema</h5>
        <br></br>
        {(theme == 'dark') ?
          <CodeMirror
            value={sh}
            height="400px"
            extensions={[javascript({ jsx: true })]}
            theme={okaidia}
            onChange={onChange}
          /> :
          <CodeMirror
            value={sh}
            height="400px"
            onChange={onChange}
          />
        }

<br></br>
        <Button
          kind=""
          tabIndex={0}

        >
          Validate
        </Button>


        <Button
          kind="primary"
          tabIndex={0}

        >
          Create
        </Button>
      </div>
    </Layout>
  );
};

export default addSchema;
