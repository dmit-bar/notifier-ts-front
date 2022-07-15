import axios from "axios";
import * as Cookies from "js-cookie";
import { Session, SessionPayload, UserCredentials } from "./Model/Session";
import {
  APP_API_URL as URL_AUTH,
  defaultAppAPIAxiosConfig,
  METHOD,
} from "./settings";

export const SESSION_ID_COOKIE = "session-id";
export const IS_AUTH_COOKIE = "is-authenticated";
const SERVICE = {
  SETUP_SESSION: "/setup-session",
  CSRF_TOKEN: "/csrf-token",
  LOGIN: "/login",
};

/**
 * Create new user session on the server
 * or reuse existing session using session ID taken from cookies.
 * @returns {Session} Authentication information
 */
function setupAuth(): Promise<Session> {
  return new Promise<Session>((resolve, reject) => {
    // check if session cookie is present
    const sessionID = Cookies.get(SESSION_ID_COOKIE);
    if (sessionID) {
      // TODO session ID expiration logic

      resolve({ id: sessionID });
      return;
    }

    // if session cookie is not present request new guest session
    axios({
      url: URL_AUTH + SERVICE.SETUP_SESSION,
      method: "post",
      headers: { "csrf-token": getCRSFToken() },
    })
      .then((res) => {
        const payload = res.data as SessionPayload;
        const session = { id: payload.sessionID };
        resolve(session);

        if (session.id) {
          Cookies.set(SESSION_ID_COOKIE, session.id);
          resolve(session);
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
function getCRSFToken(): string {
  const csrfInput = document.getElementById("csrf-token") as HTMLInputElement;
  return csrfInput.value;
}

/**
 * Set CSRF token value
 */
function setCRSFToken(token: string) {
  const csrfInput = document.getElementById("csrf-token") as HTMLInputElement;
  csrfInput.value = token;
}

/**
 * Request CSRF token from server to use in API calls
 * @returns {string} CSRF token
 */
function requestCRSFToken(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    axios({ url: URL_AUTH + SERVICE.CSRF_TOKEN, method: "get" })
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

/**
 * Authenticates and authorizes user using credentials
 * @returns {Session} new session ID for authenticated user
 */
function login(auth: Session, creds: UserCredentials): Promise<Session> {
  return new Promise<Session>((resolve, reject) => {
    axios({
      ...defaultAppAPIAxiosConfig(auth, SERVICE.LOGIN, METHOD.POST),
      data: creds,
    })
      .then((res) => {
        const payload = res.data as SessionPayload;
        resolve({ id: payload.sessionID });
      })
      .catch((e) => {
        reject(new Error(`Failed to login. Details: ${e}`));
      });
  });
}

export default {
  setupAuth,
  getCRSFToken,
  setCRSFToken,
  requestCRSFToken,
  login,
};
