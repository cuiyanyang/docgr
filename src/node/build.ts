
import { InlineConfig, build as viteBuild } from "vite";
import type { RollupOutput } from 'rollup'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from "./constants";
import { join, resolve } from "path";
import * as fs from 'fs-extra';

export async function bundle(root: string) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: 'production',
    root,
    build: {
      ssr: isServer,
      outDir: isServer ? '.temp' : 'build',
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm',
        }
      }
    }
  })
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(resolveViteConfig(false)),
      // server build
      viteBuild(resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch(e) {
    console.log(e)
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(chunk => chunk.type === 'chunk' && chunk.isEntry)
  const appHtml = render();
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script type="module" src="./${clientChunk.fileName}"></script>
    </body>
  </html>
  `.trim();
  await fs.writeFile(join(root, 'build/index.html'), html);
  await fs.remove(join(root, '.temp'))
}

export async function build(root: string) {
  // 1. 生成 client bundle 和 server bundle
  const [clientBundle, serverBundle] = await bundle(root);
  debugger
  // 2. 引入ssr入口模块
  const serverEntryPath = resolve(root, ".temp", "ssr-entry.js"); // 使用join话找不到模块
  // 3. 服务端渲染，产出HTML
  const { render } = require(serverEntryPath);
  await renderPage(render, root, clientBundle);
}