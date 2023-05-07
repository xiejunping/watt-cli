'use strict';
const fetch = require('node-fetch')
const CONFIG = require('../config')

module.exports = {
  async run (cmd, id) {
    let { dir, file } = this.getParams(cmd)

    // 单文件刷新
    const response = await fetch(`${CONFIG.FETCH_HOST}/user-center/watt/`, {
      method: 'POST',
      timeout: 6000,
      body: JSON.stringify({
        type: file ? 'url' : 'dir', // dir目录刷新
        url: file || dir,
        deviceId: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response || response.status !== 200) {
      console.error('请求刷新失败')
      process.exit(1)
    }
    try {
      const res = await response.json()
      if (res && res.code === 0) {
        console.info('刷新成功')
      } else {
        console.error(res)
        process.exit(1)
      }
    } catch (error) {
      console.log('刷新失败', error)
    }
  },

  // 获取参数
  getParams (cmd) {
    const { dir, file } = cmd

    if (!dir && !file) {
      console.log(`请指定需要上传文件的路径[-d] | CDN目录->"https://if-pbl.qiniudn.com/images/"，
      或单文件上传[-f] | CDN文件->"https://if-pbl.qiniudn.com/qiniu.jpg"`)
      process.exit(1)
    }

    return {
      dir,
      file
    }
  },
}
