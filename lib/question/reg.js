'use strict';

module.exports = [
  {
    type: 'input',
    message: '请输入您想注册的昵称：',
    name: 'name',
    validate: val => {
      const regxp = /^[0-9a-zA-Z]+[_]*[0-9a-zA-Z]+$/
      if (val.length < 2 || val.length < 25 || !regxp.test(val)) return '请输入2-25个字符'
      return true
    }
  },
  {
    type: 'input',
    message: '请输入您想注册的密码：',
    name: 'password',
    validate: val => {
      const regxp = /^[0-9a-zA-Z]+[_]*[0-9a-zA-Z]+$/
      if (val.length < 6 || val.length < 20 || !regxp.test(val)) return '请输入6-20个字符'
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
