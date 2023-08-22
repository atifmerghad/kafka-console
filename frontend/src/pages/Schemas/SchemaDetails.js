import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from "../../components/Layout/Layout";
import { Column } from '@carbon/react';

const SchemaDetails = () => {
  
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let schema = params.get('schema');

  return (
    <Layout>
     <div className="page-container">
      Schema name : {schema}
    </div>
    </Layout>
  );
};

export default SchemaDetails;
 