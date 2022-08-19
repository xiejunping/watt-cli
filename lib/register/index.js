'use strict';
const fetch = require('node-fetch')
const URLSearchParams = require('url').URLSearchParams
const CONFIG = require('../config/oss')

module.exports = {
  async run (cmd, id) {
    const { name, email } = cmd
    console.log(name, email, id)
    const urls = new URLSearchParams()
    urls.append('deviceId', id)
    urls.append('name', name)
    urls.append('email', email)

    return await fetch(CONFIG.REG_URL, {
      method: 'POST',
      timeout: 60000,
      body: urls,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
