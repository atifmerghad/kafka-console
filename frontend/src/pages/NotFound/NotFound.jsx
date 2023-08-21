import React, { Component } from 'react';
import { Button, InlineNotification } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

import Layout from "../../components/Layout/Layout";

const NotFound = () =>{

  const navigate = useNavigate();

    return (
      <Layout>
      <div className="page-container">
        <div class="body-wrapper">
          <div class="image-spread">
            <img src="/images/404.svg" alt="Common error page image" />
          </div>
          <div class="supported-error">
            <div class="heading">Error 501</div>
            <div class="error">Unavailable</div>
            <div class="message">The page you are trying to access is not available in the current platform.</div>
            <div class="cds--grid">
            <div class="cds--row">
            <Button className="cds--col"  kind="primary" onClick={() => navigate(-1)}>
                Back
            </Button>
            <span> </span>
            <Button className="cds--col"  kind="" onClick={() => navigate("/")}>
                Home
            </Button>
            </div>
            </div>
            
          </div>
        </div>
        </div>
                {/*
        <InlineNotification
          title='404'
          subtitle='Not Found'
        />
                    <button commonerrorpage-see-details-button="" class="bx--btn bx--btn--secondary hide" onclick="document.getElementById('ErrorDetails') &amp;&amp; document.getElementById('ErrorDetails').classList.add('is-visible')" type="button">See details</button>

        */}
        </Layout>

    );
  };
  
export default NotFound;
