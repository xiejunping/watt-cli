#! /usr/bin/env node
'use strict';

const cmd = require('commander')
const inquirer = require('inquirer')
const machine = require('node-machine-id')
// const color = require('chalk')
const path = require('path')
// const fs = require('fs')
const { version } = require('../package.json')

const regQues = require('../question/reg')

cmd.version(version, '-V, --version')
  .command('upload')
  .action(async cmd => {
    const id = await machine.machineId()
    require('./lib/uploader').run(cmd)
  })


// 初次使用需注册
cmd.version(version, '-V, --version')
  .command('register')
  .action(async () => {
    const id = await machine.machineId()
    inquirer.prompt(regQues).then(answers => {

      console.log(answers.name, id)
    })
  })

cmd.parse(process.argv);
