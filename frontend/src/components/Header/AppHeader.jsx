import { useLocation } from "react-router-dom";
import { headerNavLinks, navMenuLinks } from "../../utils/navIcons";
import { APP_NAME } from "../../utils/constants";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink,
  HeaderGlobalAction,
  SideNavDivider,
} from "@carbon/react";
import React, { Fragment, useState } from "react";
import { useTheme } from '../../contexts/ThemeContext';


const NavButtons = (props) => {
  const { navButton, navMenu, onClick} = props;
  const { link, icon, title } = navButton;

  const location = useLocation();
  const isActive = location?.pathname === link;

  return (
    <>
      {navMenu ? (
        <SideNavLink renderIcon={icon} href={link} isActive={isActive}>
          {title}
        </SideNavLink>
      ) : (
        <HeaderGlobalAction aria-label={title} href={link} isActive={isActive} onClick={onClick}>
          {icon}
        </HeaderGlobalAction>
      )}
    </>
  );
};

const AppHeader = () => {

  const {toggleTheme } = useTheme();
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  return (
    <div className="container header">
      <Header aria-label={APP_NAME}>
        <HeaderMenuButton
          isCollapsible
          isActive={isSideNavExpanded}
          aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
          onClick={() => setIsSideNavExpanded((prev) => !prev)}
        />
        <HeaderName href="#" prefix="X">
          {APP_NAME}
        </HeaderName>
        <HeaderGlobalBar>
          {headerNavLinks.map((item) => (
            <React.Fragment key={item.key}>
              {item.key === "theme" ? (
                <NavButtons navButton={item} onClick={toggleTheme} />
              ) : (
                <NavButtons navButton={item} />
              )}
            </React.Fragment>
          )
          )}
        </HeaderGlobalBar>
        <SideNav className='nav-border'
          isRail
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
        >
          <SideNavItems>
            {navMenuLinks.map((item) => (
              <Fragment key={item.key}>
                <NavButtons navButton={item} navMenu />
                {item.divider && <SideNavDivider />}
              </Fragment>
            ))}
          </SideNavItems>
        </SideNav>
      </Header>
    </div>
  );
};

export default AppHeader;
