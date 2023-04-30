import { createServer } from "vite";

export async function createDevServer(root) {
  return createServer({
    root,
  });
}