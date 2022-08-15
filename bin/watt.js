#! /usr/bin/env node
"use strict";

const cmd = require('commander')
const task = require('inquirer')
const color = require('chalk')
const path = require('path')
const fs = require('fs')
const { version } = require('../package.json')

cmd.version(version, '-V, --version')
  .command('upload')
  .action(async cmd => {
    require('./lib/uploader').run(cmd)
  })

