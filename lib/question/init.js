'use strict';

module.exports = [
  {
    type: 'list',
    message: '请选择您要创建的项目类型：',
    name: 'type',
    choices: [
      {
        name: '旧版中台系统（vue2 + ant-design + vuex + router）',
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
        name: 'CMS网站开发模版（nuxt3 + generate）',
        value: 'nuxt3-generate'
      },
      {
        name: 'H5活动单页（nuxt3 + vant4 + h5',
        value: 'nuxt3-h5'
      },
      {
        name: '前端框架文档（vuepress + vue2）',
        value: 'vuepress'
      },
      {
        name: 'vue3前端框架文档（vuepress2 + vue3）',
        value: 'vuepress2'
      }
    ]
  }
]
