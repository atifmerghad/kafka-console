import React, { Component } from 'react';
import UIShell from './pages/UIShell/UIShell';
import Login from './pages/Login';
import './App.scss';
import { Theme } from '@carbon/react';


class App extends Component {
  
  render() {
    return (
        <Theme >
          <UIShell />
        </Theme>
    );
  }
}

export default App;
