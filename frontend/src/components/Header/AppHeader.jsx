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
import { useState } from "react";
import { Fragment } from "react";

const NavButtons = (props) => {
  const { navButton, navMenu } = props;
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
        <HeaderGlobalAction aria-label={title} href={link} isActive={isActive}>
          {icon}
        </HeaderGlobalAction>
      )}
    </>
  );
};

const AppHeader = () => {
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
            <NavButtons key={item.key} navButton={item} />
          ))}
        </HeaderGlobalBar>
        <SideNav
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
