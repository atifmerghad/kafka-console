import {
  Analytics,
  CloudMonitoring,
  IotConnect,
  Map,
  Settings,
  UserAvatar,
  UserRole,
} from "@carbon/icons-react";
import routes from "./routes";

const headerNavLinks = [
  {
    key: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    // link: routes.SETTINGS, //TODO: update route
  },
  {
    key: "login",
    title: "Login",
    icon: <UserAvatar size={20} />,
    link: routes.LOGIN,
  },
];

const navMenuLinks = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: Analytics,
    // link: routes.DASHBOARD, //TODO: update route
    divider: true,
  },
  {
    key: "monitor-assets",
    title: "Topics",
    icon: CloudMonitoring,
    link: routes.TOPICS,
  },
  {
    key: "map-view",
    title: "Consumer Groups",
    icon: Map,
    link: routes.GROUPS,
    divider: true,
  },
  {
    key: "manage-assets",
    title: "Schema Registry",
    icon: IotConnect,
    link: routes.MANAGEASSETS,
  },
  {
    key: "manage-users",
    title: "Connectors",
    icon: UserRole,
    // link: routes.MANAGEUSERS, //TODO: update route
  },
  {
    key: "manage-users",
    title: "Security",
    icon: UserRole,
    // link: routes.MANAGEUSERS, //TODO: update route
  },
  {
    key: "manage-tools",
    title: "Track",
    icon: Analytics,
    // link: routes.MANAGEUSERS, //TODO: update route
  },
  {
    key: "dashboard",
    title: "Advanced Tools",
    icon: IotConnect,
    // link: routes.MANAGEUSERS, //TODO: update route
  },
];

export { headerNavLinks, navMenuLinks };
