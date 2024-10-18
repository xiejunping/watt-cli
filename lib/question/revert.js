'use strict';

module.exports = [
  {
    type: 'list',
    name: 'tag',
    message: '请选择备份名称，格式：最近备份线上资源时间',
    validate: (input) => {
      if (!input) {
        return '请选择备份目录';
      }
      return true;
    },
    choices: []
  }
]
