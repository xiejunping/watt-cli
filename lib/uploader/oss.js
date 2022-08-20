'use strict';
const qiniu = require('qiniu')
const fetch = require('node-fetch')
const CONFIG = require('../config/oss')
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

const upload = (option) => {
  return new Promise(async (resolve, reject) => {
    // 参数
    let { filePath, deviceId, prefix, key } = option
    if (!prefix.endsWith('/')) prefix = prefix + '/'
    const fileKey = prefix + key

    // 申请上传凭证
    const response = await fetch(CONFIG.ACTION, {
      method: 'POST',
      timeout: 6000,
      body: JSON.stringify({
        fileKey,
        deviceId: deviceId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response || response.status !== 200) {
      console.error('授权失败')
      process.exit(1)
    }

    const { data: uploadToken } = await response.json()

    // 上传模式
    formUploader.putFile(uploadToken, fileKey, filePath, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) reject(respErr)
      if (respInfo.statusCode == 200) resolve(`${CONFIG.HOST}/${prefix}/${respBody.key}`)
    })
  })
}

module.exports = upload
