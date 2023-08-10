import React from 'react';
import { Loading } from '@carbon/react';
import './_LoadSpinner.scss';

const LoadSpinner = ({ active }) => {

  return (
    <Loading
      className={"spinner-cls"}
      withOverlay={true}
      active={active}
    />
  );
}

export default LoadSpinner;