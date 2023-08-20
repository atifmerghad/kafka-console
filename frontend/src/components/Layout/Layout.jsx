import React, { useEffect, useState } from 'react';
import { Theme } from "@carbon/react";
import { APP_THEME } from "../../utils/constants";
import AppHeader from "../Header/AppHeader";
//import SideMenu from "../SideMenu/SideMenu";

import { useTheme } from '../../contexts/ThemeContext';

export default function Layout({ children }) {

  const { theme } = useTheme();

  return (
    <Theme theme={theme=='light'?'white':'g100'}>
      <div className="layout">
        <header className="bx--header">
          <AppHeader />
        </header>
        {/*<SideMenu/>*/}
        <main className="layout-content">{children}</main>
      </div>
    </Theme>
  );
}
