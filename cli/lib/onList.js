/**
 * @Description: 查看模板
 * @author: JamisonLee on 2021/3/28
 * @modify: JamisonLee on 2021/3/28
 */

const registries = require('../json/registries.json');

/**
 * @Description: 查看模板初始化函数
 * @author: JamisonLee on 2021/3/28
 */
function onList () {
  let allRegistries = getAllRegistry();
  let info = [];
  const keys = Object.keys(allRegistries);
  const len = Math.max(...keys.map(key => key.length)) + 3;
  Object.keys(allRegistries).forEach(function (key) {
    let item = allRegistries[key];
    info.push(key + line(key, len) + item);
  })
  printMsg(info);
}

/**
 * @Description: 获取所有仓库模板链接
 * @author: JamisonLee on 2021/3/28
 */
function getAllRegistry () {
  const all = {
    ...registries
  }
  return all;
}

/**
 * @Description: 展示信息列表使用 - 拼接
 * @author: JamisonLee on 2021/3/28
 */
function line (str, len) {
  let line = new Array(Math.max(1, len - str.length)).join('-');
  return ' ' + line + ' ';
}

/**
 * @Description: 打印模板信息列表
 * @author: JamisonLee on 2021/3/28
 */
function printMsg (infos) {
  infos.forEach(function (info) {
    console.log(info);
  });
}

module.exports = () => {
  onList()
}
