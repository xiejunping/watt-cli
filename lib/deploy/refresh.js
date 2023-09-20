'use strict';

const tencentcloud = require("tencentcloud-sdk-nodejs")
const CdnClient = tencentcloud.cdn.v20180606.Client

const refresh = (config) => {
  return new Promise((resolve, reject) => {
    const {
      SecretId,   // 账号ID (控制账号权限，只能用于上传文件，与刷新目录)
      SecretKey,  // 密钥
      homeUrl     // 网站线上地址
    } = config
    const client = new CdnClient({
      credential: {
        secretId: SecretId,
        secretKey: SecretKey
      }
    })

    client.PurgePathCache({
      Paths: [homeUrl],
      FlushType: 'flush'
    }).then(data => {
      // console.log(JSON.stringify(data))
      if (data.TaskId) resolve(data)
      else reject(data)
    }, err => {
      reject(err)
    })
  })
}

module.exports = refresh
