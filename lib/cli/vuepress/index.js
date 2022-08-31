'use strict';

const cliManager = require('../manager.class')

const downUrl = 'https://gitee.com/ChuPiJiang/library_vuepress_doc.git#master'

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
      message: '项目标题(使用中文字)',
      name: 'title',
      default: '企业前端技术文档',
      validate: val => {
        if (val.length > 10 || val.length < 2) return '请输入2-10个汉字'
        return true
      }
    },
    {
      type: 'input',
      message: '项目描述',
      name: 'description',
      default: ''
    }
  ], downUrl, files)
  cli.resolve(null, name)
}
