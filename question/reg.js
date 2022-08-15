'use strict';

module.exports = [
  {
    type: 'input',
    message: '请你输入注册名称？',
    name: 'name',
    validate: val => {
      if (!val) return '请输入1-20个字符'
      return true
    }
  }
]
