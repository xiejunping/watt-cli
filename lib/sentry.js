'use strict';
const fetch = require('node-fetch')
const CONFIG = require('./config')

module.exports = async (id, type) => {
  await fetch(`${CONFIG.FETCH_HOST}/com-api/petchcli?deviceId=${id}&type=${type}`)
}
