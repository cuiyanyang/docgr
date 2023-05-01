import { createServer } from 'vite';
import { pluginIndexHtml } from './plugin/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_PATH } from './constants';
import { resolveConfig } from './config';

export async function createDevServer(root) {
  const config = await resolveConfig(root, 'serve', 'development');
  console.log(config);
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
