'use strict';

const { formatDate, dataProvider } = require('../util/index')
const HttpClient = require('./fetch')

module.exports = {
  async run (cmd, id) {
    let { beginDate, endDate } = cmd

    !beginDate && (beginDate = formatDate(new Date(), 'yyyy-MM-dd'))
    !endDate && (endDate = formatDate(new Date(), 'yyyy-MM-dd 23:59:59.999'))

    // 转成时间缀查询
    // beginDate = new Date(beginDate).getTime()
    // endDate = new Date(`${endDate} 23:59:59.999`).getTime()

    beginDate = formatDate(new Date(beginDate), 'yyyy-MM-dd')
    endDate = formatDate(new Date(endDate), 'yyyy-MM-dd 23:59:59.999')

    const info = await HttpClient.post('/openapi/watt/countCli', {
      data: {
        deviceId: id,
        beginDate: beginDate,
        endDate: endDate
      }
    })

    if (info && info.code === 0 && info.data) {
      console.info(info.data)
      // console.info(dataProvider(info.data, 'total', '_id'))
    } else {
      console.info(info)
    }
  }
}
