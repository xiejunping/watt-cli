'use strict';
const fs = require('fs')
const FileType = require('file-type')
const qiniu = require('qiniu')
const fetch = require('node-fetch')
const tinify = require('tinify')
const CONFIG = require('../config')
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

tinify.key = '8Ly5vLDfghcP8WlqXYgR477BXyZHrRLL'

const tinifyCompress = (fileBody) => {
  return new Promise((resolve, reject) => {
    tinify.fromBuffer(fileBody).toBuffer((err, resultData) => {
      if (err) reject(err)
      resolve(resultData)
    })
  })
}

// 文件读流
const readFileStream = (filePath) => {
  return new Promise((resolve, reject) => {
    const sourceData = fs.readFileSync(filePath)
    FileType.fromBuffer(sourceData).then(res => {
      resolve({ ...res, fileBody: sourceData })
    }).catch(err => {
      reject(err)
    })
  })
}

const upload = (option) => {
  return new Promise(async (resolve, reject) => {
    // 参数
    let { filePath, deviceId, prefix, key } = option
    if (key.startsWith('/')) key = key.replace(/\//, '')
    if (!prefix.endsWith('/')) prefix = prefix + '/'

    // 申请上传凭证
    const response = await fetch(`${CONFIG.FETCH_HOST}/openapi/qiniu/getUploadToken`, {
      method: 'POST',
      timeout: 6000,
      body: JSON.stringify({
        fileKey: prefix + key,
        businessType: 1,
        deviceId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response || response.status !== 200) {
      console.error('授权失败')
      process.exit(1)
    }
    try {
      const res = await response.json()
      if (res && res.data) {
        const { token, key: fileKey, uid } = res.data
        // 扩展参数
        putExtra.params = {
          'x:type': 1,
          'x:uid': uid,
          'x:deviceId': deviceId
        }

        readFileStream(filePath).then(({ mime = '', fileBody }) => {
          // 返回接果
          const successUploader = (respErr, respBody, respInfo) => {
            if (respErr) reject(respErr)
            if (respInfo.statusCode == 200) {
              console.info(`${CONFIG.HOST}/${fileKey}`)
              resolve(`${CONFIG.HOST}/${fileKey}`)
            }
          }
          // 上传模式
          if (fileBody && mime.startsWith('image')) {
            // 图片压缩
            tinifyCompress(fileBody).then(resultData => {
              fileBody = resultData
            }).finally(() => {
              formUploader.put(token, fileKey, fileBody, putExtra, successUploader)
            })
          } else {
            formUploader.putFile(token, fileKey, filePath, putExtra, successUploader)
          }
        })
      } else {
        console.error(res)
        process.exit(1)
      }
    } catch (error) {
      console.log('授权结果有误', error)
    }
  })
}

module.exports = upload
