#!/usr/bin/env node
// --inspect-brk

// init 命令文件
const create = require('../lib/init');
const onList = require('../lib/onList');

// 用来进行命令行交互的
const { program } = require('commander');

// 读取 package.json
const packageConfig = require('../package.json');

// 输出 -V or --version 就能看到版本号
program.version(packageConfig.version);

// init
program
  .command('init <name>')
  .alias('i')
  .description('新建项目的命令')
  .action((name, cmd) => {
    create(name);
  })

// 查看模板
program
  .command('ls')
  .description('查看当前所有模板')
  .action(onList)

// 必须放到最后一行用于解析
program.parse(process.argv);
