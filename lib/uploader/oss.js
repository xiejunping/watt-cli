'use strict';
const fs = require('fs')
const fetch = require('node-fetch')
const FormData = require('form-data')
const CONFIG = require('../config/oss')
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
console.log(config)
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

const upload = (option) => {
  return new Promise((resolve, reject) => {
    // 参数
    const { filePath, deviceId, prefix, key } = option

    const formdata = new FormData()
    formdata.append('deviceId', deviceId)
    formdata.append('prefix', prefix)
    formdata.append('name', key)
    formdata.append('file', fs.createReadStream(filePath))

    // 申请上传凭证
    const uploadToken = await fetch(CONFIG.ACTION, {
      method: 'POST',
      timeout: 6000,
      body: formdata,
      headers: formdata.getHeaders()
    })

    // 上传模式
    formUploader.putFile(uploadToken, key, filePath, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) reject(respErr)
      if (respInfo.statusCode == 200) resolve(respBody)
    })
  })
}

module.exports = upload
