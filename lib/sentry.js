'use strict';
const fetch = require('node-fetch')

module.exports = async (id, type) => {
  await fetch(`https://api.jsvue.cn/com-api/petchcli?deviceId=${id}&type=${type}`)
}
