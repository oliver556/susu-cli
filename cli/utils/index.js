
// 当前template模板地址
const registries = require('../json/registries.json');
/**
 * @Description: 获取所有 template
 * @author: JamisonLee on 2021/3/28
 */
function getAllTemplate () {
  let all = {
    ...registries
  }
  return all;
}

/**
 * @Description: git地址转换成可下载地址
 * @author: JamisonLee on 2021/3/28
 */
function getTogitdown (url) {
  // 最后的地址格式
  // 域名:所有者/项目名称#分支
  // 例如https://gitea.51trust.com:front/vueDemo#master
  // "vue":"https://gitea.51trust.com:front/vueDemo#master",
  // "vue2":"https://gitea.51trust.com/front/vueDemo.git"
  // let tmpUrl = _.replace(url, ".git", "#master")
  // let tmpArray = _.split(tmpUrl, '/');
  // let result = tmpArray[0] + "//" + tmpArray[2] + ":" + tmpArray[3] + "/" + tmpArray[4]
  return url;
}

module.exports = {
  getAllTemplate,
  getTogitdown
}
