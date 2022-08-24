'use strict';

module.exports = [
  {
    type: 'list',
    message: '请选择您要创建的项目类型：',
    name: 'type',
    choices: [
      {
        name: '旧版中台系统（vue + iview + vuex + router）',
        value: 'vue2-admin'
      },
      {
        name: '中台系统（vue3 + ant-design + vuex + router）',
        value: 'vue3-admin'
      },
      {
        name: '',
        value: 'vue-h5-multpage'
      }
    ]
  }
]