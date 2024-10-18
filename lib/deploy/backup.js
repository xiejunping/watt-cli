'use strict';

const fs = require('fs')
const path = require('path')
const ora = require('ora')
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
        console.log(err || data);
      });
    }

    const spinner = ora('backup...').start()

    cos.getBucket({
      Bucket: Bucket,
      Region: Region,
      Prefix: publicPath.substr(1) + '/',
      MaxKeys: 1000
    }, 
      (listError, listResult) => {
        if (listError) {
          spinner.fail('backup fail')
          reject(listError)
        }
        // 定义相对备份分目录
        const realBackupPath = path.resolve(process.cwd(), './backup/' + formatDate(new Date(), 'yyyyMMddhhmm'))
        listResult.Contents.forEach(item => {
          const downloadPath = path.resolve(realBackupPath, item.Key)
          const pathParse = path.parse(item.Key)
          if (pathParse.dir) {
            // key a/b/1.txt,就创建a/b目录
            mkdirsSync(path.resolve(realBackupPath, pathParse.dir))
            downloadItem(item.Key, downloadPath)
          } else {
            downloadItem(item.Key, downloadPath)
          }
        })
        
        // 备份完成
        spinner.succeed('backup success')
        resolve()
      }
    )
  })
}

module.exports = backup
