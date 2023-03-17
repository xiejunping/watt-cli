'use strict';

const { formatDate } = require('../../util/index')
const iDate = new Date()
const firstMon = formatDate(iDate, 'yyyy-MM-01')
const now = formatDate(iDate, 'yyyy-MM-dd')

module.exports = [
  {
    type: 'input',
    message: '请输入统计起始日期：',
    name: 'beginDate',
    default: firstMon,
    validate: val => {
      const regxp = /^(\d{4})-(\d{2})-(\d{2})$/
      if (!regxp.test(val)) return '请输入日期格式'
      return true
    }
  },
  {
    type: 'input',
    message: '请输入统计结束日期：',
    name: 'endDate',
    default: now,
    validate: val => {
      const regxp = /^(\d{4})-(\d{2})-(\d{2})$/
      if (!regxp.test(val)) return '请输入日期格式'
      return true
    }
  }
]
