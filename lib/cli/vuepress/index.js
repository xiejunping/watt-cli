'use strict';

const cliManager = require('../manager.class')

const downUrl = 'https://gitee.com/ChuPiJiang/hn-front-doc.git#master'

module.exports = function (name) {
  // 需替换模板文件
  const files = ['package.json', 'docs/.vuepress/config.js']

  const cli = new cliManager([
    {
      type: 'input',
      message: '项目名称',
      name: 'name',
      default: name
    },
    {
      type: 'input',
      message: '项目描述',
      name: 'description',
      default: ''
    }
  ], downUrl, files)
  cli.resolve()
}
