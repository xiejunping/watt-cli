'use strict';

const glob = require('glob')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const COS = require('cos-nodejs-sdk-v5')

const upload = (config) => {
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
      SliceSize: 1048576,
      Timeout: 25000
    })

    const dir = path.resolve(process.cwd(), outputDir).replace(/\\/g, '/')

    const files = glob.sync(`${dir}/**/*`, {nodir: true}).map(v => {
      return {
        Bucket: Bucket,
        Region: Region,
        Key: v.replace(/\\/g, '/').replace(dir, (!publicPath || publicPath === '/') ? '' : publicPath).replace(/\//, ''),
        FilePath: v
      }
    })

    if (files.length === 0) {
      console.log(chalk.yellow('暂无文件需要上传'))
      process.exit(1)
    }

    const spinner = ora('uploading...').start()

    let failKeys = []
    let current = 0
    cos.uploadFiles({
      files,
      onFileFinish: (err, data, options) => {
        let completeTxt = chalk.green('上传完成')
        if (err) {
          completeTxt = chalk.red('上传失败')
          failKeys.push(options.Key)
        }
        spinner.text = `${++current}/${files.length}\t${options.Key}\t${completeTxt}`
      }
    }, function(err) {
      if (err) {
        spinner.fail()
        reject(err)
      } else {
        if (failKeys.length) {
          spinner.fail()
          spinner.text = `错误率:${failKeys.length}/${files.length}\n${failKeys.join('\n')}`
        }
        spinner.succeed()
      }
      current = null
      failKeys = null
      resolve()
    })
  })
}

module.exports = upload
