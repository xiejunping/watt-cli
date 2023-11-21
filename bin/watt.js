#! /usr/bin/env node
'use strict';

const cmd = require('commander')
const inquirer = require('inquirer')
const machine = require('node-machine-id')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const sentry = require('../lib/sentry')
const { version } = require('../package.json')

const initQues = require('../lib/question/init')
const regQues = require('../lib/question/reg')
const useQues = require('../lib/question/use')

// 静态资源工具
cmd.version(version, '-V, -v, --version')
  .command('upload')
  .description('上传静态文件到CDN，上传后地址 https://static.jsvue.cn/${prefix}/${dir/file}')
  .alias('u')
  .option('-p, --prefix <string> [prefix]', '上传后文件前缀（文件夹名可叠加‘/’）')
  .option('-c, --cwd [cwd]', '是否当前目录')
  .option('-f, --file <string> [file]', '单文件路径')
  .option('-d, --dir <string> [dir]', '目录路径')
  .action(async (cmd) => {
    const id = await machine.machineId()
    sentry(id, 'upload')
    require('../lib/uploader').run(cmd, id)
  })

// 静态资源刷新
cmd.version(version, '-V, -v, --version')
  .command('refresh')
  .description('刷新CDN上静态文件')
  .alias('r')
  .option('-f, --file <string> [file]', '单文件路径')
  .option('-d, --dir <string> [dir]', '目录路径')
  .action(async (cmd) => {
    const id = await machine.machineId()
    sentry(id, 'refresh')
    require('../lib/cdn').run(cmd, id)
  })

// 脚手架
cmd.version(version, '-V, -v, --version')
  .command('init <name>')
  .description('创建项目脚手架，快速生成项目模版')
  .action(async (name) => {
    const id = await machine.machineId()
    sentry(id, 'init')
    inquirer.prompt(initQues).then(answers => {
      require('../lib/cli/' + answers.type)(name)
    })
  })

// 初次使用需注册
cmd.version(version, '-V, -v, --version')
  .command('register')
  .description('初次使用需注册')
  .alias('reg')
  .action(async () => {
    const id = await machine.machineId()
    sentry(id, 'reg')
    inquirer.prompt(regQues).then(answers => {
      require('../lib/register').run(answers, id)
    })
  })

// 统计使用
cmd.version(version, '-V, -v, --version')
  .command('usage')
  .description('统计脚手架使用，需传入统计开始日期')
  .alias('use')
  .action(async () => {
    const id = await machine.machineId()
    sentry(id, 'use')
    inquirer.prompt(useQues).then(answers => {
      require('../lib/usage').run(answers, id)
    })
  })

// 部署项目
cmd.version(version, '-V, -v, --version')
  .command('deploy')
  .description('部署项目上线，需在项目中约定配置 deploy.config.js ')
  .alias('d')
  .action(async () => {
    const id = await machine.machineId()
    const isRoot = fs.existsSync(path.resolve(process.cwd(), 'package.json'))
    const hasDeployConfig = fs.existsSync(path.resolve(process.cwd(), 'deploy.config.js'))
    if (!isRoot) {
      console.log(chalk.red('请在项目根目录下执行部署命令'))
      process.exit(1)
    }
    if (!hasDeployConfig) {
      console.log(chalk.red('配置文件不存在, 请在项目根目录手动创建文件 deploy.config.js'))
      process.exit(1)
    }
    sentry(id, 'deploy')
    require('../lib/deploy/index').run(id)
  })

cmd.parse(process.argv);
