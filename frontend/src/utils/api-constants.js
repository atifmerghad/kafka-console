const PATH = "/api/";
const CLOUDPATH = "v2/charts/";

export const constants = {
  AUTH_LOGIN: "/auth/login",
  GET_ALL_BROKERS: `${PATH}brokers?clusterId=cluster1`,
  GET_SINGLE_BROKER: `${PATH}broker`,
  GET_ALL_TOPICS: `${PATH}topics`,
  GET_TOPIC:  `${PATH}topic`,
  CREATE_TOPIC: `${PATH}topic`,
  DELETE_TOPIC: `${PATH}topic/`,
  GET_ALL_CONSUMER_GROUPS: `${PATH}groups`,
  GET_ALL_USERS: `${PATH}users`,
  GET_ALL_ACL: `${PATH}acl`,
  ADD_ACL: `${PATH}acl`,
  GET_CONNECTORS: `${PATH}connectors`,
  GET_CONNECTOR_DETAILS: `${PATH}connector_details`,
  GET_SCHEMAS: `${PATH}schema-registries`,
  GET_CONSUMER: `${PATH}consumer-group`,
  GET_X: `${PATH}schema-registries`
};