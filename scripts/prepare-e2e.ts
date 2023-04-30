import path from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';

const exampleDir = path.resolve(__dirname, '../e2e/playground/basic');
const ROOT = path.resolve(__dirname, '..');
const defaultOptions = {
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};
async function prepareE2E() {
  if (!fse.existsSync(path.resolve(__dirname, '../dist'))) {
    execa.execaCommandSync('pnpm build', {
      cwd: ROOT,
      ...defaultOptions
    });
  }

  execa.execaCommandSync('npx playwright install', {
    cwd: ROOT,
    ...defaultOptions
  });

  execa.execaCommandSync('pnpm start', {
    cwd: exampleDir,
    ...defaultOptions
  });
}

prepareE2E();
