'use strict';

module.exports = [
  {
    type: 'input',
    message: '请输入您想注册的昵称：',
    name: 'name',
    validate: val => {
      if (!val) return '请输入1-20个字符'
      return true
    }
  },
  {
    type: 'input',
    message: '请输入能接收激活邮件的邮箱：',
    name: 'email',
    validate: val => {
      const regxp = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      if (!regxp.test(val)) return '请输入正确的邮件格式'
      return true
    }
  }
]
