'use strict';

const ora = require('ora')
const chalk = require('chalk')

const backup = () => {
  return new Promise((resolve, reject) => {
    const {
      SecretId,   // 账号ID (控制账号权限，只能用于上传文件，与刷新目录)
      SecretKey,  // 密钥
      Bucket,     // 存储桶名字
      Region,     // 存储桶所在区域
      outputDir,  // 产出物所在目录，必须相对路径 （相对于项目根目录）
      publicPath  // CDN 上的虚拟根目录
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

    const spinner = ora('backup...').start()


    setTimeout(() => {
      spinner.succeed('backup success')
      resolve()
    }, 1000)
  })
}

module.exports = backup
