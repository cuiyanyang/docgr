// const { add } = require("./util.mjs"); // 会报错，同步的 require 方法并不能导入 ESM 模块

async function foo() {
  const { add } = await import("./util.mjs");
  console.log(add(1, 2));
}

foo();
