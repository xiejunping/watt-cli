'use strict';

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = reqiure('ora')
const rimraf = reqiure('rimraf')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const downloadRepo = require('download-git-repo')

module.exports = class cliManager {

  constructor(options, downUrl, files) {
    this.options = options || {}
    this.downUrl = downUrl
    this.files = files || []
  }

  download(url, name, success, fail) {
    // 下载到的目录
    const dir = path.join(process.cwd(), name)
    if (fs.existsSync(dir)) { // 是否覆盖
      inquirer.prompt([
        {
          type: 'list',
          message: '是否覆盖原有的文件夹',
          name: 'override',
          choices: [
            {
              name: '是',
              value: true
            },
            {
              name: '否',
              value: false
            }
          ]
        }
      ]).then(answers => {
        if (answers) {
          rimraf.sync(dir, {})
          downloadRepo(`direct:${url}`, dir, { clone: true }, err => {
            if (err) fail(err)
            else success()
          })
        }
        else process.exit(1)
      })
    } else {
      downloadRepo(`direct:${url}`, dir, { clone: true }, err => {
        if (err) fail(err)
        else success()
      })
    }
  }

  modifyPackageContent(meta, fileKey) {
    const content = fs.readFileSync(fileKey).toString()
    const result = handlebars.compile(content)(meta)
    fs.writeFileSync(fileKey, result)
  }

  resolve(callback) {
    let downUrl = this.downUrl
    let files = this.files
    inquirer.prompt().then(answers => {
      const spinner = ora('下载模板...')
      spinner.start()
      this.downloadRepo(downUrl, answers.name, res => {
        spinner.success()
        let meta = answers
        // 处理回答
        if (typeof callback === 'function') {
          meta = callback(answers)
        }
        files.forEach(v => {
          const fileName = `${meta.name}/${v}`
          this.modifyPackageContent(meta, fileName)
        })
        console.log(chalk.green('项目初始化完成✅'))
      }, error => {
        spinner.fail()
        console.log(chalk.supportsColorStderr('项目创建失败'), error)
      })
    })
  }
}
