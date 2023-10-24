/**
 * 时间戳转化成时间
 * @param date new Date()
 * @param fmt 'yyyy-MM-dd'
 * @return {string|string}
 */
function formatDate(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      let val
      if (RegExp.$1.length === 1) val = o[k]
      else if (RegExp.$1.length === 2) val = ('00' + o[k]).substr(('' + o[k]).length)
      else if (RegExp.$1.length === 3) val = ('00' + o[k]).substr(-3)
      fmt = fmt.replace(RegExp.$1, val)
    }
  }
  return fmt
}

/**
 * 枚举转换对象数据
 * @param {*} arr  枚举列表
 * @param {*} fmtLabel
 * @param {*} fmtValue
 * @returns
 */
function dataProvider (arr, fmtLabel = 'label', fmtValue = 'value') {
  let obj = {}
  arr.forEach(r => {
    obj[r[fmtValue]] = r[fmtLabel]
  })
  return obj
}

/**
 * 读取文本长度
 * @param {*} val 字符串
 * @param {*} num 一个汉字占2个字节（默认）
 * @returns
 */
export function getByteLen (val, num) {
  const charLen = num || 2
  let len = 0
  for (let i = 0; i < val.length; i++) {
    const a = val.charAt(i)
    if (a.match(/[^\x00-\xff]/ig) !== null) {
      len += charLen
    } else {
      len += 1
    }
  }
  return len
}

module.exports = {
  formatDate,
  dataProvider,
  getByteLen
}
