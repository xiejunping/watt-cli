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
        name: '静态网站或博客（nuxt2 + generate）',
        value: 'nuxt2-generate'
      },
      {
        name: 'H5活动单页（vue3 + ant-design + vuex）',
        value: 'vue-h5-multpage'
      },
      {
        name: '前端框架文档（vuepress）',
        value: 'vuepress'
      }
    ]
  }
]
