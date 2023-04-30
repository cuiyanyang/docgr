import { createServer } from 'vite';
import { pluginIndexHtml } from './plugin/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_PATH } from './constants';

export async function createDevServer(root) {
  return createServer({
    root,
    plugins: [pluginIndexHtml(), pluginReact()],
    server: {
      fs: {
        allow: [PACKAGE_PATH]
      }
    }
  });
}
