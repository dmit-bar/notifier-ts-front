import { rest } from "msw";

export const handlers = [
  // CSRF Token
  rest.get("/getCSRF", (req, res, ctx) => {
    sessionStorage.setItem("csrf-token", "legit-csrf-token");

    return res(ctx.status(200));
  }),
  rest.post("/auth", null),
];
