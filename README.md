# watt-cli

#### 介绍
来吧，大家一起重复造轮子--“企业级前端脚手架”。有没有想过当公司要求你进步，你是否知道为什么要产生一个脚手架，`vue-cli`他不香吗...

不是代码不能外泄，也不是怕别人抄，主要是真正能减少工作量，提高效率

那么一个优秀的企业脚手架，需要提供什么功能：

- （1）快速创建项目的框架，并集成开发功能
- （2）批量处理静态文件，加速业务开发
- （3）快速在项目中创建路由页面
- （4）...



#### 安装教程

全局安装命令
```js
npm i watt-cli -g
```

查看当前版本
```js
watt -V

watt --version
```

注册
```js
watt register
```
> 此操作会提示输入用户名

上传文件
```js
watt upload -h  #可以查看帮助

watt upload -f test.js -p demo #上传当前目录文件 ./test.js 到 /demo

watt upload -d test/ -p demo  # 上传当前目录下的 test 文件夹内所有文件到 /demo

watt upload -c -p test #上传当前目录下所有文件 到 /test
```
参数说明

| 参数名 | 全称参数 | 说明 |
| :--- | --- | --- |
| -c | -cwd | 是否当前目录 |
| -d | -dir | 整个目录上传 |
| -f | -file | 单文件路径上传 |
| -p | -prefix | 上传到OSS，上传后文件前缀（文件夹名可叠加‘/’） |

创建模板项目
```js
watt init name  #项目名, 只能是英文，规则跟目录的命名规则一致，因为就是生成好的项目目录

# 提示覆盖

# package里的一些动态命名

-$> watt init ms
? 请选择您要创建的项目类型： 中台系统（vue3 + ant-design + vuex + router）
? 是否覆盖原有的文件夹 是
? 项目名称 ms
? 项目title
? 项目描述
✔ 下载模板...
项目初始化完成✅

cd name

npm install

npm run serve

```

模板列表
- 旧版中台系统（vue + iview + vuex + router）
- 中台系统（vue3 + ant-design + vuex + router）
- H5活动单页（vue3 + ant-design + vuex）
...
更多待添加

#### 使用说明

- 查看当前版本
- 首次使用需注册
- 上传静态文件到CDN
- 创建模板项目


1.  查看当前版本
这个没有什么好讲的，就是看看你当前环境使用的工具是否是最新版，可能更多高级功能须升级到对应的版本才能使用

2.  首次使用需注册
为什么？因为工具的使用情况需要验证你的身份，怕你做坏事不承认，同时后续会提供一些免费的功能，须进行身份绑定才能使用，如 免费图床，CDN静态文件

3.  上传静态文件到CDN
前端最基本的操作，为了首屏快出，能上CDN的都应该上，作为企业级应用，最开始就得把这个脚手架架好

4.  创建模板项目
前端脚手架基本操作，但是要使用好，就要备好模板项目的目录，文件，以及使用需使用的包，包括请求的封装等，做到很好还需要自己去想哦

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)


#### 示例

`watt u -f ./lib/uploader/banner_bg.jpg -p demo`

```js
mac@MACdeMacBook-Air watt-cli % watt u -f ./lib/uploader/banner_bg.jpg -p demo
Config {
  useHttpsDomain: false,
  useCdnDomain: false,
  zone: {
    srcUpHosts: [ 'up-z2.qiniup.com', 'up-gz.qiniup.com', 'up-fs.qiniup.com' ],
    cdnUpHosts: [
      'upload-z2.qiniup.com',
      'upload-gz.qiniup.com',
      'upload-fs.qiniup.com'
    ],
    ioHost: 'iovip-z2.qbox.me',
    rsHost: 'rs-z2.qbox.me',
    rsfHost: 'rsf-z2.qbox.me',
    apiHost: 'api-z2.qiniu.com'
  },
  zoneExpire: -1
}
{
  token: 'Ab4xf9sEO68T3oDUM-lNkktl1IvpCsQPY2ukQhQ0:T4T2bsuVdq35l_E99tOL2b62ihY=:eyJzY29wZSI6InN0YXRpYy1qc3Z1ZSIsImRlYWRsaW5lIjoxNjYxMDA2OTk1fQ==',
  filePath: './lib/uploader/banner_bg.jpg',
  key: 'banner_bg.jpg',
  prefix: 'demo'
}
{ hash: 'Fh4i3pgrQSJWUYjD9vUfWMWU2lWa', key: 'banner_bg.jpg' } {
  status: 200,
  statusCode: 200,
  statusMessage: 'OK',
  headers: {
    server: 'openresty',
    date: 'Sat, 20 Aug 2022 12:49:55 GMT',
    'content-type': 'application/json',
    'content-length': '61',
    connection: 'keep-alive',
    'access-control-allow-headers': 'X-File-Name, X-File-Type, X-File-Size',
    'access-control-allow-methods': 'OPTIONS, HEAD, POST',
    'access-control-allow-origin': '*',
    'access-control-expose-headers': 'X-Log, X-Reqid',
    'access-control-max-age': '2592000',
    'cache-control': 'no-store, no-cache, must-revalidate',
    pragma: 'no-cache',
    'x-content-type-options': 'nosniff',
    'x-reqid': '92UAAAA_6HmDDg0X',
    'x-svr': 'UP',
    'x-log': 'X-Log'
  },
  size: 61,
  aborted: false,
  rt: 210,
  keepAliveSocket: false,
  data: { hash: 'Fh4i3pgrQSJWUYjD9vUfWMWU2lWa', key: 'banner_bg.jpg' },
  requestUrls: [ 'http://up-z2.qiniup.com/' ],
  timing: null,
  remoteAddress: '14.29.110.9',
  remotePort: 80,
  socketHandledRequests: 1,
  socketHandledResponses: 1
}
```