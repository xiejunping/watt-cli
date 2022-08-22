'use strict';

const cliManager = require('../manager.class')

const downUrl = 'https://gitee.com/ChuPiJiang/watt-admin.git#master'
// const downUrl = 'https://gitee.com/ChuPiJiang/watt-admin/repository/archive/master.zip'

module.exports = function (name) {
  // 需替换模板的文件
  const files = ['package.json', 'public/index.html']

  const cli = new cliManager([
    {
      type: 'input',
      message: '项目名称',
      name: 'name',
      default: name
    },
    {
      type: 'input',
      message: '项目title',
      name: 'title',
      default: ''
    },
    {
      type: 'input',
      message: '项目描述',
      name: 'description',
      default: ''
    }
  ], downUrl, files)
  cli.resolve(answers => {
    return answers
  }, name)
}
