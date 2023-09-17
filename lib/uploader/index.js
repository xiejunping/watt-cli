'use strict';

const fs = require('fs')
const glob = require('glob')
const mime = require('mime')
const ossUpload = require('./oss')

module.exports = {
  async run (cmd, id) {
    let { prefix, dir, cwd, file } = this.getParams(cmd)

    // 单文件上传
    if (file) {
      if (!fs.existsSync(file)) {
        console.error(`文件不存在 -> ${file}`)
        process.exit(1)
      }
      const fileInfo = await this.getFile(file)
      await ossUpload({
        deviceId: id,
        filePath: file,
        key: fileInfo.name,
        prefix
      })
      process.exit(0)
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
    // promise.all
    await Promise.all(files.map(ret => ossUpload({ deviceId: id, prefix, key: ret.key, filePath: ret.path })))
    console.info('全部上传完成')
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
  },

  getFile (path) {
    const mimetype = mime.getType(path)
    return new Promise ((resolve, reject) => {
      fs.stat(path, function(err, file) {
        if (err) reject(err)
        else {
          const index = path.lastIndexOf('/')
          const len = path.length
          const filename = index != -1 ? path.substring(index + 1, len) : path
          resolve({ size: file.size, name: filename, path, type: mimetype })
        }
      })
    })
  }
}
