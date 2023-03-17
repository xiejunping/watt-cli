const fetch = require('node-fetch')
const CONFIG = require('./config')

const HttpClient = {
  get: async (url, params) => {
    const response = await fetch(`${CONFIG.FETCH_HOST}${url}`, params)
    const data = await response.json()
    return data
  },
  post: async (url, params) => {
    const response = await fetch(`${CONFIG.FETCH_HOST}${url}`, params)
    const data = await response.json()
    return data
  }
}

module.exports = HttpClient
