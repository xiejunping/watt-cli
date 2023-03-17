'use strict';

const { formatDate, dataProvider } = require('../util/index')
const HttpClient = require('./fetch')

module.exports = {
  async run (cmd, id) {
    const { beginDate, endDate } = cmd

    !beginDate && (beginDate = formatDate(new Date(), 'yyyy/MM/dd'))
    !endDate && (endDate = formatDate(new Date(), 'yyyy/MM/dd'))

    const info = await HttpClient.get(`/user-center/watt/countCli?deviceId=${id}&beginDate=${beginDate}&endDate=${endDate}`)

    if (info && info.code === 0 && info.data) {
      console.info(dataProvider(info.data, 'total', '_id'))
    } else {
      console.info(info)
    }
  }
}
