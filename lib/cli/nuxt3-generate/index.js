'use strict';

const cliManager = require('../manager.class')

const downUrl = 'https://gitee.com/ChuPiJiang/library-nuxt3-cms.git#master'

module.exports = function (name) {
  // 需替换模板的文件
  const files = ['package.json']

  const cli = new cliManager([
    {
      type: 'input',
      message: '项目名称',
      name: 'name',
      default: name
    },
  ], downUrl, files)
  cli.resolve(answers => {
    return Object.assign({}, answers, {dir: name})
  }, name)
}
