import { createServer } from "vite";
import { pluginIndexHtml } from "./plugin/indexHtml";

export async function createDevServer(root) {
  return createServer({
    root,
    plugins: [pluginIndexHtml()]
  });
}