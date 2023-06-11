import { Theme } from "@carbon/react";
import { APP_THEME } from "../../utils/constants";
import AppHeader from "../Header/AppHeader";
//import SideMenu from "../SideMenu/SideMenu";

export default function Layout({ children }) {
  return (
    <Theme theme={APP_THEME}>
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
