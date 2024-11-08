'use strict';

const util = require('../../../util')
const cliManager = require('../manager.class')

const downUrl = 'https://gitee.com/ChuPiJiang/library_vue2_admin.git#master'

module.exports = function (name) {
  // 需替换模板的文件
  const files = ['package.json', 'vue.config.js', 'public/index.html']

  const cli = new cliManager([
    {
      type: 'input',
      message: '项目名称',
      name: 'name',
      default: name
    },
    {
      type: 'input',
      message: '项目标题(使用中文字)',
      name: 'title',
      default: '中台管理',
      validate: val => {
        const length = util.getByteLen(val)
        if (length > 12 || length < 2) return '请输入1-6个汉字'
        return true
      }
    },
    {
      type: 'input',
      message: '项目描述',
      name: 'description',
      default: ''
    },
    {
      type: 'input',
      message: '本地调式域名(需本机绑定hosts)',
      name: 'domain',
      default: 'test.jsvue.cn',
    }
  ], downUrl, files)
  cli.resolve(answers => {
    return Object.assign({}, answers, {dir: name})
  }, name)
}
