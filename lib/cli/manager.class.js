'use strict';

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const rimraf = require('rimraf')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const downloadRepo = require('download-git-repo')
const overQues = require('../question/override')

module.exports = class cliManager {

  constructor(options, downUrl, files) {
    this.options = options || {}
    this.downUrl = downUrl
    this.files = files || []
  }

  download(url, dir, success, fail) {
    downloadRepo(`direct:${url}`, dir, { clone: true }, err => {
      if (err) fail(err)
      else success()
    })
  }

  // 模板变量替换
  modifyPackageContent(meta, fileKey) {
    const content = fs.readFileSync(fileKey).toString()
    const result = handlebars.compile(content)(meta)
    fs.writeFileSync(fileKey, result)
  }

  // 覆盖文件夹
  overrideDir(name) {
    // 下载到的目录
    const dir = path.join(process.cwd(), name)
    return new Promise((resolve, reject) => {
      // 是否覆盖
      if (fs.existsSync(dir)) {
        inquirer.prompt(overQues).then(answers => {
          if (answers.override) {
            rimraf.sync(dir, {})
            resolve(dir)
          } else {
            console.error(chalk.red('终止项目的创建！'))
            reject()
          }
        })
      } else resolve(dir)
    })
  }

  resolve(callback, name) {
    let downUrl = this.downUrl
    let files = this.files

    // 目录是否存在
    this.overrideDir(name).then(dir => {
      inquirer.prompt(this.options).then(answers => {
        let meta = answers
        // 处理回答
        if (typeof callback === 'function') {
          meta = callback(answers)
        }
        const spinner = ora('下载模板...')
        spinner.start()
        this.download(downUrl, dir, () => {
          spinner.succeed()

          files.forEach(v => {
            const fileName = `${meta.name}/${v}`
            this.modifyPackageContent(meta, fileName)
          })
          console.log(chalk.green('\n 项目初始化完成✅'))
          console.log('\n 开始使用：')
          console.log(chalk.blueBright(`\n   cd ${name}  `))
          console.log(chalk.blueBright('   npm install'))
        }, error => {
          spinner.fail()
          console.log(chalk.red('项目创建失败'), error)
        })
      })
    }).catch(err => {
      process.exit(0)
    })
  }
}
