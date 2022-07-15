import axios from "axios";
import * as Cookies from "js-cookie";
import { Auth } from "../Components/Auth/Auth";
import { APP_API_URL as URL_AUTH } from "./settings";

export const SESSION_ID_COOKIE = "notifier-session-id";
const SETUP_SESSION = "/setup-session";

/**
 * setupAuth() is used to create new user session on the server
 * or reuse existing session using session ID taken from cookies.
 * @returns Authentication information
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
    axios({ url: URL_AUTH + SETUP_SESSION, method: "post" })
      .then((rs) => {
        const payload: Auth = rs.data as Auth;

        if (payload.sessionID) {
          Cookies.set(SESSION_ID_COOKIE, payload.sessionID);
          resolve(payload);
        } else {
          reject(
            new Error(
              `Failed to get session ID from server. Received empty session ID`
            )
          );
        }
      })
      .catch((e) => {
        reject(new Error(`Failed to get session ID from server. ${e}`));
      });
  });
}
