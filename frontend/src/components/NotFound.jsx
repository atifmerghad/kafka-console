import React, { Component } from 'react';
import { Button, InlineNotification } from '@carbon/react';
class NotFound extends Component {
  render() {
    return (
      <>
        <div class="body-wrapper">
          <div class="image-spread">
            <img src="/images/404.svg" alt="Common error page image" />
          </div>
          <div class="supported-error">
            <div class="heading">Error 501</div>
            <div class="error">Unavailable</div>
            <div class="message">The page you are trying to access is not available in the current platform.</div>
            <Button size="sm" kind="primary">
            Back
            </Button>
          </div>
        </div>
        {/*
        <InlineNotification
          title='404'
          subtitle='Not Found'
        />
                    <button commonerrorpage-see-details-button="" class="bx--btn bx--btn--secondary hide" onclick="document.getElementById('ErrorDetails') &amp;&amp; document.getElementById('ErrorDetails').classList.add('is-visible')" type="button">See details</button>

        */}
      </>

    );
  }
};

export default NotFound;
