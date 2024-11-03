'use strict';

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const COS = require('cos-nodejs-sdk-v5')
const { formatDate } = require('../../util/index')

const backup = (config) => {
  return new Promise((resolve, reject) => {
    const {
      SecretId,   // 账号ID (控制账号权限，只能用于上传文件，与刷新目录)
      SecretKey,  // 密钥
      Bucket,     // 存储桶名字
      Region,     // 存储桶所在区域
      publicPath,  // CDN 上的虚拟根目录
    } = config

    const cos = new COS({
      SecretId: SecretId,
      SecretKey: SecretKey,
      FileParallelLimit: 2,
      UploadQueueSize: 1000,
      KeepAlive: true,
      ChunkParallelLimit: 10,
      ChunkRetryTimes: 2,
      SliceSize: 1024 * 1024 * 2, // 上传单文件大小m
      Timeout: 25000
    })

    const hasBackup = fs.existsSync(path.resolve(process.cwd(), 'backup'))
    if (!hasBackup) {
      console.log(chalk.red('没有找到备份文件, 正在创建备份文件夹'))
      fs.mkdirSync(path.resolve(process.cwd(), 'backup'))
    }

    if (!publicPath || typeof publicPath !== 'string') {
      console.log(chalk.red('根目录 deploy.config.js 文件中 publicPath 不能为空'))
      process.exit(1)
    }
    // 递归创建目录举例，可自行实现
    function mkdirsSync(dirname) {
      if(fs.existsSync(dirname)) {
        return true;
      }else{
        if(mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
      }
    }

    // 下载单个文件
    function downloadItem(Key, downloadPath) {
      cos.getObject({
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        Output: fs.createWriteStream(downloadPath),
      },
      function(err, data) {
        // err && console.log(err);
      });
    }

    const spinner = ora('backup...').start()

    const prefix = publicPath.substr(1) + '/'
    cos.getBucket({
      Bucket: Bucket,
      Region: Region,
      Prefix: prefix,
      MaxKeys: 1000
    },
      (listError, listResult) => {
        if (listError) {
          spinner.fail('backup fail')
          reject(listError)
        }
        // 定义相对备份分目录
        const realBackupPath = path.resolve(process.cwd(), './backup/' + formatDate(new Date(), 'yyyyMMddhhmm'))
        if (listResult.Contents && listResult.Contents.length) {
          listResult.Contents.forEach(item => {
            const downloadPath = path.resolve(realBackupPath, item.Key.replace(prefix, ''))
            const pathParse = path.parse(item.Key.replace(prefix, ''))
            if (pathParse.dir) {
              // key a/b/1.txt,就创建a/b目录
              mkdirsSync(path.resolve(realBackupPath, pathParse.dir))
              downloadItem(item.Key, downloadPath)
            } else {
              downloadItem(item.Key, downloadPath)
            }
          })
        }

        // 备份完成
        spinner.succeed('backup success')
        resolve()
      }
    )
  })
}

module.exports = backup
