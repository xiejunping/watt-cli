'use strict';
const path = require('path')
const chalk = require('chalk')
const upload = require('./upload')
const refresh = require('./refresh')

module.exports = {
  async run (id) {
    const deployConfig = require(path.resolve(process.cwd(), './deploy.config.js'))

    if (!deployConfig) {
      console.error('配置项不存在，请检查')
      process.exit(1)
    }

    // 发布前备份
    await backup(deployConfig)

    // 上传静态文件到对象存储桶
    await upload(deployConfig)

    // 刷新线上地址
    await refresh(deployConfig).then(() => {
      console.log('项目部署成功，请访问线上地址  ' + chalk.blueBright(deployConfig.homeUrl))
    })
  }
}
