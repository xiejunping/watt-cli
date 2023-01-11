'use strict';
const qiniu = require('qiniu')
const fetch = require('node-fetch')
const CONFIG = require('../config')
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

const upload = (option) => {
  return new Promise(async (resolve, reject) => {
    // 参数
    let { filePath, deviceId, prefix, key } = option
    if (!prefix.endsWith('/')) prefix = prefix + '/'

    // 申请上传凭证
    const response = await fetch(`${CONFIG.FETCH_HOST}/user-center/watt/getUploadToken`, {
      method: 'POST',
      timeout: 6000,
      body: JSON.stringify({
        fileKey: prefix + key,
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
        // 上传模式
        formUploader.putFile(token, fileKey, filePath, putExtra, (respErr, respBody, respInfo) => {
          if (respErr) reject(respErr)
          if (respInfo.statusCode == 200) resolve(`${CONFIG.HOST}/${fileKey}`)
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
