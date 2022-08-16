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
| -c | -cwd | 是否当前目录 |
| -d | -dir | 整个目录上传 |
| -f | -file | 单文件路径上传 |
| -p | -prefix | 上传到OSS，上传后文件前缀（文件夹名可叠加‘/’） |

#### 使用说明

- 查看当前版本
- 首次使用需注册
- 上传静态文件到CDN


1.  查看当前版本
这个没有什么好讲的，就是看看你当前环境使用的工具是否是最新版，可能更多高级功能须升级到对应的版本才能使用

2.  首次使用需注册
为什么？因为工具的使用情况需要验证你的身份，怕你做坏事不承认，同时后续会提供一些免费的功能，须进行身份绑定才能使用，如 免费图床，CDN静态文件

3.  上传静态文件到CDN
前端最基本的操作，为了首屏快出，能上CDN的都应该上，作为企业级应用，最开始就得把这个脚手架架好

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
