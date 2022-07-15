import { AxiosRequestConfig } from "axios";
import { Session } from "./Model/Session";
import { getCRSFToken } from "./session";

export const METHOD = {
  GET: "get",
  POST: "post",
};

// TODO get value from enviroment
export const APP_API_URL = "http://localhost:1337/api";

export function defaultAppAPIAxiosConfig(
  session: Session,
  service: string,
  method: string
): AxiosRequestConfig {
  return {
    baseURL: APP_API_URL,
    url: service,
    method,
    headers: {
      "csrf-token": getCRSFToken(),
      "session-id": session.id,
    },
  };
}
