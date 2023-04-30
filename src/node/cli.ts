import cac from 'cac';
import { createDevServer } from './dev';
import { build } from './build';

const cli = cac('docgr').version('0.0.1').help();

cli.command('dev [root]', 'start dev server').action(async (root) => {
  const server = await createDevServer(root);
  await server.listen();
  // 控制台输出服务器启动后的地址
  server.printUrls();
});

cli.command('build [root]', 'build in production').action(async (root) => {
  await build(root);
});

cli.parse();
