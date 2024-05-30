'use strict';

module.exports = [
  {
    type: 'input',
    name: 'pathName',
    default: '',
    message: '请输入页面路径(/xx/xx):',
    validate: (value) => {
      if (!value) {
        return '路径不能为空';
      }
      if (!value.startsWith('/')) {
        return '路径必须以“/”开头';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'pageName',
    default: '',
    message: '请输入页面名称:',
    validate: (value) => {
      if (!value) {
        return '页面名称不能为空';
      }
      return true;
    }
  }
]
