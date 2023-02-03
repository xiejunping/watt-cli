# watt-cli

### 介绍
来吧，大家一起重复造轮子--“企业级前端脚手架”。有没有想过当公司要求你进步，你是否知道为什么要产生一个脚手架，`vue-cli`他不香吗...

不是代码不能外泄，也不是怕别人抄，主要是真正能减少工作量，提高效率

那么一个优秀的企业脚手架，需要提供什么功能：

- （1）快速创建项目的框架，并集成开发功能
- （2）批量处理静态文件，加速业务开发
- （3）快速在项目中创建路由页面
- （4）创建模板项目
- （5）还有更多...



### 安装教程

全局安装命令
```js
npm i watt-cli -g
```

### 使用方法

- 查看当前版本
- 首次使用需注册
- 上传静态文件到CDN
- 根据模板创建项目

```
1.  查看当前版本
这个没有什么好讲的，就是看看你当前环境使用的工具是否是最新版，可能更多高级功能须升级到对应的版本才能使用

2.  首次使用需注册
为什么？因为工具的使用情况需要验证你的身份，怕你做坏事不承认，同时后续会提供一些免费的功能，须进行身份绑定才能使用，如 免费图床，CDN静态文件

3.  上传静态文件到CDN
前端最基本的操作，为了首屏快出，能上CDN的都应该上，作为企业级应用，最开始就得把这个脚手架架好

4.  创建模板项目
前端脚手架基本操作，但是要使用好，就要备好模板项目的目录，文件，以及使用需使用的包，包括请求的封装等，做到很好还需要自己去想哦

5.  还有更多...
```

以下命令在命令行工具中执行命令

- 查看当前版本

```js
watt -V

watt --version
```

- 注册

```js
watt register
```
> 此操作会提示输入用户名
为什么要先注册，因为这个脚手架集成了cdn文件上传，为了后面管理CDN文件，需要统计文件上传的作者是谁，也防止恶意上传过多文件不利于对象存储桶的管理。

- 上传文件

```js
watt upload -h  #可以查看帮助

watt upload -f test.js -p demo #上传当前目录文件 ./test.js 到 /demo

watt upload -d test/ -p demo  # 上传当前目录下的 test 文件夹内所有文件到 /demo

watt upload -c -p test #上传当前目录下所有文件 到 /test

watt u -f ./lib/uploader/banner_bg.jpg -p demo  # 假使这个目录的文件存在 ./lib/uploader/banner_bg.jpg


```
上传成功后，会在命令行返回这个路径`https://static.jsvue.cn/demo/banner_bg.jpg`，复制到项目中直接使用即可，（使用了回源，流量费用，请先 tinyPng 网站里压缩一下，钱包扛不住）

~~图片上传过程中自动转成webp的格式，上传两种模式，在浏览器判断是否支持`webp` 使用不同的链接地址~~ 

七牛自动转换，环境不支持兜底：
如果图片使用webp模式，加速加载可以使用参数 `?imageView2/0/format/webp`

参数说明

| 参数名 | 全称参数 | 说明 |
| :--- | --- | --- |
| -c | -cwd | 是否当前目录 |
| -d | -dir | 整个目录上传 |
| -f | -file | 单文件路径上传 |
| -p | -prefix | 上传到OSS，上传后文件前缀（文件夹名可叠加‘/’） |

- 创建模板项目

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

### 模板说明
会在命令行提示显示
模板列表
- 旧版中台系统（vue + iview + vuex + router）
- 中台系统（vue3 + ant-design + vuex + router）
- H5活动单页（vue3 + ant-design + vuex）
- 前端框架文档（vue + vuepress）
- 静态网站或博客（nuxt2 + generate）
...

#### 旧版中台系统（vue + iview + vuex + router）

#### 中台系统（vue3 + ant-design + vuex + router）

[开源板模](https://gitee.com/ChuPiJiang/library_vue3_admin.git)

2022年更新 `vue3` 版本，使用 ant-design 2.0 (暂不维护) 
此模板主要是快速搭建中台管理系统
集成了  自已研发的  中台组件库，当然你可以在项目中去掉，如果方便可以移步[文档](https://doc.jsvue.cn) 


### 示例

=====

#### 上传单图片

`watt u -f ./lib/uploader/banner_bg.jpg -p demo`

- 上传单图片到 xx 项目下

如果想分来管理好源上的图片，而且便于维护，我们想  A 项目的静态文件夹  A\assets\images  这种，那要怎么上传呢

`watt upload -f ./oss_upload/banner.jpg -p a/assets/images`

- 上传当前目录下的所有图片到 xx 项目下

`watt upload -d -c -p a/assets`

=======

#### 创建模板

`watt init ms`

ms 为项目的名称，也是当前目录下新建的文件夹，创建完成后 进入项目，安装依赖

` cd ms && npm i`  npm install 可以简写成 npm i ,如果没有错误的话，使用命令启动项目

` npm run serve `  还记原创建项目配置的启动域名吗，默认  `test.jsvue.cn` ,为什么要使用域名调式，在采用统一登录系统里，会对登录会话增加
用户凭证的所在域名，如果是ip不好写凭证，所以建议使用域名，当然也可以使用IP,但需要手动改回，

【注意】 使用域名，请在本地hosts文件指向中增加， 本地域名解析。不然启动时会报错




### 特别注意

- v0.0.6  因服务接口更改升级，不能兼容以前版本，请使用最新版本

### 更版说明

#### v0.0.7 
接口管理规范化，更改上传接口

#### v0.0.9
- 增加 vue2 中台模板，
- 文件上传时增加用户ID，并根据用户区分目录
- 中台可管理用户的文件 ![https://admin.jsvue.cn/qw/index.html](https://admin.jsvue.cn/qw/index.html)

### 参与贡献