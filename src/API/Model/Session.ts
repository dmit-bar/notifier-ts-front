export interface Session {
  id: string;
}

export interface SessionPayload {
  sessionID: string;
}

export interface UserCredentials {
  login: string;
  pass: string;
}
