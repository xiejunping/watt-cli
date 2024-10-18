'use strict';

const path = require('path')
const chalk = require('chalk')
const upload = require('../deploy/upload')
const refresh = require('../deploy/refresh')

module.exports = {
  async run (tag) {
    const deployConfig = require(path.resolve(process.cwd(), './deploy.config.js'))

    if (!deployConfig) {
      console.error('配置项不存在，请检查')
      process.exit(1)
    }

    try {
      deployConfig.outputDir = './backup/' + tag

      // 上传静态文件到对象存储桶
      await upload(deployConfig)

      // 刷新线上地址
      await refresh(deployConfig).then(() => {
        console.log('项目回滚成功，请访问线上地址  ' + chalk.blueBright(deployConfig.homeUrl))
      })
    } catch (error) {
      const errTxt = chalk.red(error)
      console.error('回滚失败，', errTxt)
      process.exit(1)
    }
  }
}
