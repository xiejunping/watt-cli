'use strict';
const fetch = require('node-fetch')
const CONFIG = require('../config/oss')

module.exports = {
  async run (cmd, id) {
    const { name, email } = cmd

    fetch(CONFIG.FETCH_HOST+CONFIG.REG_URL, {
      method: 'POST',
      timeout: 60000,
      body: JSON.stringify({
        deviceId: id,
        username: name,
        email: email,
        dcloud_appid: ['__UNI__55B0695'], // 平台写死
        platform: 'NODE',
        password: '123456' // 默认密码
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      if (response.status === 200) {
        const { code, msg, message, errMsg } = await response.json()
        if (code === 0) console.log('注册成功')
        else console.error(msg || message || errMsg)
      }
    }).catch(err => {
      console.error(err)
    })
  }
}
