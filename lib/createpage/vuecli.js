'use strict'

const chalk = require('chalk')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const { getFiles } = require('../../util/file')

module.exports = {
  async run ({ pathName, pageName, __dirname }) {
    const temp = 'module.exports = {{{routs}}}\n'

    const entryPath = path.resolve(__dirname, `src/views/${pathName.replace(/:/g, '_')}`)
    const entryCnPath = path.resolve(__dirname, `src/views/${pathName.replace(/:/g, '_')}/${pageName}`)
    const routePageName = pathName.split('/').filter(ret => ret && !ret.startsWith(':')).map(ret => ret.charAt(0).toUpperCase() + ret.slice(1)).join('')

    if (!fs.existsSync(entryPath)) {
      fs.mkdirSync(entryPath, { recursive: true })
      fs.writeFileSync(entryCnPath, '') // 创建空文件标记页面

      // 写vue文件
      const contentVue = fs.readFileSync(path.resolve(__dirname, 'src/router/pagetem.vue')).toString()
      const resContentVue = handlebars.compile(contentVue)({ pageName: routePageName })
      fs.writeFileSync(path.resolve(entryPath, 'index.vue'), resContentVue)
      // 写路由文件
      let routes = getFiles(path.resolve(__dirname, 'src/views'))
      routes = JSON.stringify(routes, null, 2)
      routes = routes.replace(/"/g, "'")
      const tmpRoutes = handlebars.compile(temp)({ routs: routes })
      fs.writeFileSync(path.resolve(__dirname, 'src/router/pages.js'), tmpRoutes)
      console.log(chalk.green('路由页面创建成功'))
      process.exit(1)
    } else {
      console.log(chalk.red('此目录已存在,请更换目录名'))
    }
  }
}
