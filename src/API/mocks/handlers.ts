import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

export const handlers = [
  // Setting up session
  rest.post("api/setup-session", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sessionID: uuidv4(),
      })
    );
  }),
];
