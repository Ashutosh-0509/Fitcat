import { createRouter } from "./router";
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

const handler = createStartHandler({
  createRouter,
})(defaultStreamHandler);

export default { fetch: handler };
