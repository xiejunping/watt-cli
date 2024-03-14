'use strict';
const fetch = require('node-fetch')
const CONFIG = require('../config')

module.exports = {
  async run (cmd, id) {
    const { name, password, email } = cmd

    fetch(`${CONFIG.FETCH_HOST}/user-center/watt/regCli`, {
      method: 'POST',
      timeout: 60000,
      body: JSON.stringify({
        deviceId: id,
        username: name,
        password: password,
        email: email,
        dcloud_appid: ['__UNI__55B0695'], // 平台写死
        platform: 'NODE'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      if (response.status === 200) {
        const { code, msg, message, errMsg } = await response.json()
        if (code === 0) console.log(msg || '注册成功')
        else console.error(msg || message || errMsg)
      }
    }).catch(err => {
      console.error(err)
    })
  }
}
