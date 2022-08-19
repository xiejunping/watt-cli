'use strict';
const fs = require('fs')
const fetch = require('node-fetch')
const FormData = require('form-data')
const CONFIG = require('../config/oss')

const upload = (option) => {
  return new Promise((resolve, reject) => {
    // 参数
    const { filePath, deviceId, prefix, key } = option

    const formdata = new FormData()
    formdata.append('deviceId', deviceId)
    formdata.append('prefix', prefix)
    formdata.append('name', key)
    formdata.append('file', fs.createReadStream(filePath))
    console.log(formdata)
    // api 上传模式
    fetch(CONFIG.ACTION, {
      method: 'POST',
      timeout: 60000,
      body: formdata,
      headers: formdata.getHeaders()
    }).then(response => {
      console.log(response)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = upload
