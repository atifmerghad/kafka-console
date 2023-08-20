import {
  Analytics,
  CloudMonitoring,
  IotConnect,
  Map,
  Settings,
  BrightnessContrast,
  UserAvatar,
  UserRole,
} from "@carbon/icons-react";
import routes from "./routes";


const headerNavLinks = [
  {    
  key: "theme",
  title: "Theme",
   icon: <BrightnessContrast size={20} />,
   link: routes.SETTINGS
  },
  {
    key: "settings",
    title: "Settings",
    icon: <Settings size={20}/>,
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
    link: routes.DASHBOARD, //TODO: update route
    divider: true,
  },
  {
    key: "broker",
    title: "Brokers",
    icon: Analytics,
    link: routes.BROKERS, //TODO: update route
    divider: false,
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
    link: routes.SCHEMA,
  },
  {
    key: "manage-users",
    title: "Connectors",
    icon: UserRole,
    link: routes.CONNECTOR, //TODO: update route
  },
  {
    key: "manage-users",
    title: "Security",
    icon: UserRole,
    link: routes.SECURITY, //TODO: update route
  },
  {
    key: "manage-tools",
    title: "Track",
    icon: Analytics,
    link: routes.TRACK, //TODO: update route
  },
  {
    key: "dashboard",
    title: "Advanced Tools",
    icon: IotConnect,
    link: routes.TOOLS, //TODO: update route
  },
];

export { headerNavLinks, navMenuLinks };
