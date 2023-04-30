import { readFile } from "fs/promises";
import { Plugin } from "vite";
import { DEFAULT_TEMPLATE_PATH } from "../constants";

export function pluginIndexHtml(): Plugin {
  return {
    name: 'docgr:index-html',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // 读取 template.html 内容
          const html = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8');
          // 返回 HTML
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        })
      }
    }
  }
}