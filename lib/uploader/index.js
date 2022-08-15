const glob = require('glob')
const qiniu = require('./qiniu')

module.exports = {
  async run (cmd) {
    let { prefix, dir, cwd, file } = this.getParams(cmd)

    // 单文件上传
    if (file) {
      return await qiniu({filePath: file, perfix})
    }

    // 当前目录
    if (cwd) {
      dir = process.cwd()
    }
    dir = dir.replace(/\\/g, '/')
    const files = glob.sync(`${dir}/**/*`, {nodir: true}).map(v => {
      return {
        key: v.replace(dir, ''),
        path: v
      }
    })
    const tasks = files.map(ret => {
      return qiniu({
        prefix,
        key: ret.key,
        filePath: ret.path
      })
    })
    await Promise.all(tasks)
    console.log('全部上传完成')
    process.exit(0)
  },

  // 获取参数
  getParams (cmd) {
    const { prefix, dir, cwd, file } = cmd

    if (!cwd && !dir && !file) {
      console.log('请指定需要上传文件的路径 [-d] | 当前目录[-c]，或单文件上传 [-f]')
      process.exit(1)
    }

    return {
      prefix,
      dir,
      cwd,
      file
    }
  }
}
