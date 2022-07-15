import axios from "axios";
import * as Cookies from "js-cookie";
import { Auth } from "../Components/Auth/Auth";
import { APP_API_URL as URL_AUTH } from "./settings";

export const SESSION_ID_COOKIE = "notifier-session-id";
const SETUP_SESSION = "/setup-session";
const CSRF_TOKEN = "/csrf-token";

/**
 * Create new user session on the server
 * or reuse existing session using session ID taken from cookies.
 * @returns {Auth} Authentication information
 */
export function setupAuth(): Promise<Auth> {
  return new Promise<Auth>((resolve, reject) => {
    // check if session cookie is present
    const sessionID = Cookies.get(SESSION_ID_COOKIE);
    if (sessionID) {
      // TODO session ID expiration logic

      resolve({ sessionID });
      return;
    }

    // if session cookie is not present request new guest session
    axios({
      url: URL_AUTH + SETUP_SESSION,
      method: "post",
      headers: { "csrf-token": getCRSFToken() },
    })
      .then((rs) => {
        const payload: Auth = rs.data as Auth;

        if (payload.sessionID) {
          Cookies.set(SESSION_ID_COOKIE, payload.sessionID);
          resolve(payload);
        } else {
          reject(new Error("Received empty session ID"));
        }
      })
      .catch((e) => {
        reject(new Error(`Failed to get session ID from server. ${e}`));
      });
  });
}

/**
 * Get CSRF token value
 * @returns {string} CSRF token
 */
export function getCRSFToken(): string {
  const csrfInput = document.getElementById("csrf-token") as HTMLInputElement;
  return csrfInput.value;
}

/**
 * Set CSRF token value
 */
export function setCRSFToken(token: string) {
  const csrfInput = document.getElementById("csrf-token") as HTMLInputElement;
  csrfInput.value = token;
}

/**
 * Request CSRF token from server to use in API calls
 * @returns {string} CSRF token
 */
export function requestCRSFToken(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    axios({ url: URL_AUTH + CSRF_TOKEN, method: "get" })
      .then((res) => {
        const token = res.data as string;

        if (token) {
          resolve(token);
        } else {
          reject(new Error("Received empty CSRF token"));
        }
      })
      .catch((e: Error) => {
        reject(new Error(`Failed to get session ID from server. ${e}`));
      });
  });
}
