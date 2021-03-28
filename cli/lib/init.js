/**
 * @Description: init
 * @author: JamisonLee on 2021/3/28
 * @modify: JamisonLee on 2021/3/28
 */

const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
// 命令行交互
const inquirer = require('inquirer');
// 从 Git 拉模板
const download = require('download-git-repo');
// 终端 loading 效果，图标
const ora = require('ora');
// 终端样式库
const chalk = require('chalk');
// 终端日志图标
const logSymbols = require('log-symbols');
// log 声明
const log = console.log;
// 获取所有 template
const { getAllTemplate, getTogitdown } = require('../utils');

// 声明具体的交互内容
const promptList = [
  { type: 'input', name: 'author', message: '作者:', default: '' },
  { type: 'input', name: 'mail', message: '邮箱:', default: '' },
  { type: 'input', name: 'description', message: '描述:', default: '' }
]

const spinner = ora('下载中...')

// 新建项目
async function create (projectName, options) {
  // 获取当前路径
  const cwd = process.cwd();
  // 目标路径，获取当前路径下目标名称
  const targetDir = path.resolve(cwd, projectName || '.');
  // 当前可选模板
  const allTemplate = getAllTemplate()
  // 可选模板的 key
  const keys = Object.keys(allTemplate);
  let templateSwitch = {
    type: 'list',
    name: 'template',
    message: '选择初始化的template',
    choices: keys
  }
  promptList.unshift(templateSwitch);

  // 判断当前路径下是否有此文件夹
  if (!fs.existsSync(targetDir)) {
    // 没有
    // 1. 创建交互
    inquirer.prompt(promptList).then((answers) => {
      // 2. 拉取模板
      const { template, description, author, mail } = answers;
      log(`正在拉取${template}项目模板`);
      let url = getTogitdown(allTemplate[template]);
      spinner.start();
      downTemplate(url, projectName, () => {
        // 用户输入的值写入 package.json
        writePackageJson(targetDir, answers, projectName);
        // 先 cd 到对应目录下
        shell.cd(projectName);
        // 拉取代码
        npmInstall();
        // 成功后的输出
        successConsole(projectName);
      })
    })
  } else {
    // 有
    log(logSymbols.error, chalk.red('当前路径已存在同名目录，请确定后再试'));
  }
}

// 拉取代码
function npmInstall () {
  shell.exec('npm install');
}

// 下载模板
function downTemplate (url, projectName, callBack) {
  download(url, projectName, { clone: true }, (err) => {
    // 判断是否下载失败
    if (err) {
      // 下载失败
      spinner.fail() // 下载失败提示
      log(logSymbols.error, chalk.red(err));
      return;
    }
    // 下载成功
    spinner.succeed();
  })
}

// 下载成功后重写 package.json
function writePackageJson (targetDir, answers, name) {
  const { description, author, mail } = answers;
  let packPath = targetDir + '/package.json';
  // 读取 package 的内容
  let tmpJson = fs.readFileSync(packPath);
  let packageJson;
  packageJson = JSON.parse(tmpJson);
  let result = {
    ...packageJson,
    name,
    description,
    author,
    mail
  }
  fs.writeFileSync(packPath, JSON.stringify(result, null,'\t'));
}

// 成功后的输出
function successConsole (projectName) {
  log(chalk.green('success'));
  log(logSymbols.success, chalk.magenta(`${projectName}创建成功`));
  // 判断系统类型
  if (process.platform !== 'darwin') {
    log(chalk.magenta('检测到您是windows系统,请使用git bash打开项目根目录,执行npm run lf再运行项目'));
  }
  log(chalk.green(`执行下面命令启动项目`));
  log(logSymbols.info, chalk.rgb(100, 73, 238)(`cd ${projectName}`));
  log(logSymbols.warning, chalk.rgb(100, 73, 238)(`vue模板: npm run serve`));
}

module.exports = (...args) => {
  return create(...args).catch((err) => {
    console.log(err);
    process.exit(1);
  })
}
