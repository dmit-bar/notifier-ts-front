import axios from "axios";
import * as Cookies from "js-cookie";
import { Auth, AUTH_SESSION_ID } from "../Model/Auth/Auth";
import { AUTH_URL as URL_AUTH } from "./settings";

export async function getAuthInfo(): Promise<Auth> {
  let auth: Auth;
  // TODO get auth session value from cookies
  // if not present request new guest session
  // return Session ID and CSRF token
  const session = Cookies.get(AUTH_SESSION_ID);
  if (session) {
    // TODO get CSRF token with auth-id in a header
    auth = { session, token: "" };
  }

  // TODO
  // try {
  //   const res = await axios({ url: URL_AUTH, method: "get" });
  //   Promise.resolve(res);
  // } catch (e) {}

  Cookies.set(AUTH_SESSION_ID, auth.session);

  return new Promise((resolve, reject) => {
    resolve({
      session: "randomly-generated-session-id",
      token: "randomly-generated-token-id",
    });
  });
}
