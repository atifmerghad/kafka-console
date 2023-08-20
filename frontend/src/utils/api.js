import { useState, useMemo } from "react";
import { constants } from "./api-constants";
import {
  apiClient,
  clientToken,
  getAuthorizationHeader,
} from "../utils/client";

const catchError = (err) => {
  let res = err.response.data;
  res.statusCode = err.response.status;
  return { res };
};

const ApiFetch = async (url, method, body) => {
  let api;
  switch (method) {
    case "GET":
      api = await apiClient
        .get(url, {
          headers: { authorization: getAuthorizationHeader() },
        })
        .then((res) => {
          return res.data//.response;
        })
        .catch((err) => {
          return catchError(err);
        });
      break;
    case "POST":
      api = await apiClient
        .post(url, body, {
          headers: { authorization: getAuthorizationHeader() },
        })
        .then((res) => {
          return res.data.response;
        })
        .catch((err) => {
          return catchError(err);
        });
      break;
    case "DELETE":
      api = await apiClient
        .delete(url, { data: body })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return catchError(err);
        });
      break;
    case "TOKEN":
      api = await clientToken
        .post(url, body)
        .then((res) => {
          return res.data.response;
        })
        .catch((err) => {
          return catchError(err);
        });
      break;
    case "POSTFORMDATA":
      api = await apiClient
        .post(url, body, {
          "Content-Type": `multipart/form-data;`,
        })
        .then((res) => {
          return res.data.response;
        })
        .catch((err) => {
          return catchError(err);
        });
      break;
    default:
  }
  return api;
};

const getAllBrokers = async () => {
  try {
    let res = await ApiFetch(`${constants.GET_ALL_BROKERS}`, "GET");
    if (res) return { res };
  } catch { }
};


export {
  getAllBrokers
};