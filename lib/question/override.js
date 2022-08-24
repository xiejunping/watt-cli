'use strict';

module.exports = [
  {
    type: 'list',
    message: '是否覆盖原有的文件夹',
    name: 'override',
    choices: [
      {
        name: '是',
        value: true
      },
      {
        name: '否',
        value: false
      }
    ]
  }
]
