'use strict';

const util = require('../../../util')
const cliManager = require('../manager.class')

const downUrl = 'https://gitee.com/ChuPiJiang/library_nuxt2_generate.git#master'

module.exports = function (name) {
  // 需替换模板的文件
  const files = ['package.json', 'nuxt.config.js']

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
      default: '企业网站',
      validate: val => {
        const length = util.getByteLen(val)
        if (length > 20 || length < 2) return '请输入1-10个汉字'
        return true
      }
    },
  ], downUrl, files)
  cli.resolve(answers => {
    return Object.assign({}, answers, {dir: name})
  }, name)
}
