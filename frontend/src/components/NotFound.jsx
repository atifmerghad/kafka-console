import React, { Component } from 'react';
import { InlineNotification } from '@carbon/react';

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
            <div class="reason"></div></div><div class="buttons"><button class="bx--btn bx--btn--primary " onclick="history.back()" type="button">Back</button>
            <button commonerrorpage-see-details-button="" class="bx--btn bx--btn--secondary hide" onclick="document.getElementById('ErrorDetails') &amp;&amp; document.getElementById('ErrorDetails').classList.add('is-visible')" type="button">See details</button>
          </div>
        </div>
        
        <InlineNotification
          title='404'
          subtitle='Not Found'
        />
      </>

    );
  }
};

export default NotFound;
