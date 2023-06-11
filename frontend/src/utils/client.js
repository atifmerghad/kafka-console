import axios from "axios";

export const clientToken = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

clientToken.defaults.headers.common["Content-Type"] = "application/json";

const getToken = () =>
  localStorage.getItem("kafka-console-auth-token")
    ? localStorage.getItem("kafka-console-auth-token")
    : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    authorization: getAuthorizationHeader(),
  },
});