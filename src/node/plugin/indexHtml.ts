import { readFile } from 'fs/promises';
import { Plugin } from 'vite';
import { CLIENT_ENTRY_PATH, DEFAULT_TEMPLATE_PATH } from '../constants';

export function pluginIndexHtml(): Plugin {
  return {
    name: 'docgr:index-html',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: 'body'
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res) => {
          // 读取 template.html 内容
          let html = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8');
          html = await server.transformIndexHtml(
            req.url,
            html,
            req.originalUrl
          );
          // 返回 HTML
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        });
      };
    }
  };
}
