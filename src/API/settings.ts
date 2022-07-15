import { AxiosRequestConfig } from "axios";
import { Auth } from "../Components/Auth/Auth";
import { getCRSFToken } from "./session";

// TODO get value from enviroment
export const APP_API_URL = "http://localhost:1337/api";

export function defaultAppAPIAxiosConfig(
  auth: Auth,
  service: string,
  method: string
): AxiosRequestConfig {
  return {
    baseURL: APP_API_URL,
    url: service,
    method,
    headers: {
      "csrf-token": getCRSFToken(),
      "session-id": auth.sessionID,
    },
  };
}
