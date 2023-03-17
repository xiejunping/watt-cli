#! /usr/bin/env node
'use strict';

const cmd = require('commander')
const inquirer = require('inquirer')
const machine = require('node-machine-id')
// const color = require('chalk')
const path = require('path')
// const fs = require('fs')
const { formatDate, dataProvider } = require('../util/index')
const sentry = require('../lib/sentry')
const HttpClient = require('../lib/fetch')
const { version } = require('../package.json')

const initQues = require('../lib/question/init')
const regQues = require('../lib/question/reg')

// 静态资源工具
cmd.version(version, '-V, --version')
  .command('upload')
  .description('上传静态文件到CDN，上传后地址 https://static.jsvue.cn/${prefix}/${dir/file}')
  .alias('u')
  .option('-p, --prefix <string> [prefix]', '上传后文件前缀（文件夹名可叠加‘/’）')
  .option('-c, --cwd [cwd]', '是否当前目录')
  .option('-f, --file <string> [file]', '单文件路径')
  .option('-d, --dir <string> [dir]', '目录路径')
  .action(async (cmd) => {
    const id = await machine.machineId()
    await sentry(id, 'upload')
    require('../lib/uploader').run(cmd, id)
  })

// 脚手架
cmd.version(version, '-V, --version')
  .command('init <name>')
  .description('创建项目脚手架，快速生成项目模版')
  .action(async (name) => {
    const id = await machine.machineId()
    await sentry(id, 'init')
    inquirer.prompt(initQues).then(answers => {
      require('../lib/cli/' + answers.type)(name)
    })
  })

// 初次使用需注册
cmd.version(version, '-V, --version')
  .command('register')
  .alias('reg')
  .action(async () => {
    const id = await machine.machineId()
    await sentry(id, 'reg')
    inquirer.prompt(regQues).then(answers => {
      require('../lib/register').run(answers, id)
    })
  })

// 统计使用
cmd.version(version, '-V, --version')
  .command('usage')
  .alias('use')
  .action(async (beginDate) => {
    const id = await machine.machineId
    if (!beginDate) beginDate = formatDate(new Date(), 'yyyy/MM/dd')
    const info = await HttpClient.get(`/user-center/watt/countCli?deviceId=${id}&beginDate=${beginDate}`)
    if (info && info.code === 0 && info.data) {
      console.info(dataProvider(info.data, 'type', 'total'))
    } else {
      console.info(info)
    }
  })

cmd.parse(process.argv);
