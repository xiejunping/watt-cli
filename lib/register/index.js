'use strict';
const fetch = require('node-fetch')
const CONFIG = require('../config')

module.exports = {
  async run (cmd, id) {
    const { name, password, email } = cmd

    fetch(`${CONFIG.FETCH_HOST}/openapi/watt/regCli`, {
      method: 'POST',
      timeout: 60000,
      body: JSON.stringify({
        deviceId: id,
        username: name,
        password: password,
        email: email,
        platform: 'NODE'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      if (response.status === 200) {
        const { code, msg, message, errMsg, data } = await response.json()
        if (code === 0) console.log(data || '注册成功')
        else console.error(msg || message || errMsg)
      }
    }).catch(err => {
      console.error(err)
    })
  }
}
