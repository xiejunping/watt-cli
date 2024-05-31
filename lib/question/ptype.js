'use strict';

module.exports = [
  {
    type: 'list',
    name: 'type',
    message: '请选择项目类型',
    validate: (input) => {
      if (!input) {
        return '请选择项目类型';
      }
      return true;
    },
    choices: [
      {
        name: '中台项目',
        value: 'vuecli'
      },
      {
        name: 'Nuxt2',
        value: 'nuxt'
      },
      {
        name: 'Nuxt3',
        value: 'nuxt3'
      },
      {
        name: '其他',
        value: 'other'
      }
    ]
  }
]
