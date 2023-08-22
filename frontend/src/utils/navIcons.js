import {
  Analytics,
  CloudMonitoring,
  IotConnect,
  Map,
  Settings,
  BrightnessContrast,
  UserAvatar,
  UserRole,
  DataCenter,
  Schematics,
  IbmCloudDirectLink_1Connect,
  IbmSecurity,
  TaskTools,
  Activity,
  Api,
  Laptop,
  Sql
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
    link: routes.PROFILE//routes.LOGIN,
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
    icon: DataCenter,
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
    icon: Api,
    link: routes.GROUPS,
    divider: true,
  },
  {
    key: "manage-assets",
    title: "Schema Registry",
    icon: Schematics,
    link: routes.SCHEMA,
  },
  {
    key: "manage-connectors",
    title: "Connectors",
    icon: IbmCloudDirectLink_1Connect,
    link: routes.CONNECTOR, //TODO: update route
  },
  {
    key: "manage-users",
    title: "Security",
    icon: IbmSecurity,
    link: routes.SECURITY, //TODO: update route
  },
  {
    key: "manage-tools",
    title: "Track",
    icon: Activity,
    link: routes.TRACK, //TODO: update route
  },
  {
    key: "ksqldb",
    title: "KSQLDB",
    icon: Sql,
    link: routes.KSQLDB, //TODO: update route
  },
  {
    key: "clients",
    title: "Clients",
    icon:Laptop,
    link: routes.CLIENTS, //TODO: update route
  },
  {
    key: "tools-p",
    title: "Advanced Tools",
    icon: TaskTools,
    link: routes.TOOLS, //TODO: update route
  }
];

export { headerNavLinks, navMenuLinks };
