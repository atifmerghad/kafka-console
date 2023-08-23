import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from "../../components/Layout/Layout";
import { Column, CodeSnippet } from '@carbon/react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia,okaidiaInit } from '@uiw/codemirror-theme-okaidia';
import { useTheme } from '../../contexts/ThemeContext';


const SchemaDetails = () => {
  
  const { theme, toggleTheme } = useTheme();


  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let schema = params.get('schema');

  return (
    <Layout>
     <div className="page-container">
      <h6>Subject Name : {schema}</h6>
      <br></br>
      <CodeSnippet  type="multi">
      {`  "scripts": {
    "build": "lerna run build --stream --prefix --npm-client yarn",
    "ci-check": "carbon-cli ci-check",
    "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
    "doctoc": "doctoc --title '## Table of Contents'",
    "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
    "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
    "lint": "eslint actions config codemods packages",
    "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
    "sync": "carbon-cli sync",
    "test": "cross-env BABEL_ENV=test jest",
    "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
  },
  "resolutions": {
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-is": "~16.9.0",
    "react-test-renderer": "~16.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.10.0",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-proposal-export-default-from": "^7.7.4",
    "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
    "@babel/plugin-transform-runtime": "^7.10.0",
    "@babel/preset-env": "^7.10.0",
    "@babel/preset-react": "^7.10.0",
    "@babel/runtime": "^7.10.0",
    "@commitlint/cli": "^8.3.5",`}      </CodeSnippet>

{(theme == 'dark')?
<CodeMirror
      value="console.log('hello world!');"
      height="200px"
      extensions={[javascript({ jsx: true })]}
      theme={okaidia}
      onChange={onChange}
    />:
    <CodeMirror
      value="console.log('hello world!');"
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
}

    </div>
    </Layout>
  );
};

export default SchemaDetails;
 