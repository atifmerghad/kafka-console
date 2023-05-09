import React, {useState} from 'react';
import { Button } from '@carbon/react';

const NotConfigured = React.memo((props) => {
    const [name, setName] = useState(props.serviceName);
  
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <h3>Not Configured</h3>
          <p>{name} is not configured in Kafka Tower.</p>
          <div>
            <Button size="sm" kind="primary">
              Read Documentation
            </Button>
          </div>
        </div>
      </>
    );
  });

export default NotConfigured;
