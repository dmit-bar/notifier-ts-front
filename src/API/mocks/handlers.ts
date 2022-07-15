import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

export const handlers = [
  // Respond with CSRF
  rest.get("api/csrf-token", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(uuidv4()));
  }),
  // Setting up session
  rest.post("api/setup-session", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sessionID: uuidv4(),
      })
    );
  }),
  // Login
  rest.post("api/login", (req, res, ctx) => {
    return res(
      ctx.delay(3000),
      ctx.status(200),
      ctx.json({
        sessionID: "new-session-id-for-user",
      })
    );
  }),
];
