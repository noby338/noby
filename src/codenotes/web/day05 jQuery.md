---
title: day05 jQuery
icon: write
category:
  - jQuery
tag:
  - jQuery
sticky: false
star: false
article: true
timeline: true
---
* 作用：js的第三方库，用于简化js的书写：

* js库的版本：

  * jquery-3.6.0.js            非压缩，开放环境使用，方便学习源码
  * jquery-3.6.0.min.js        压缩的，生产环境使用，去掉了多余的注释，空格，换行，简化变量名。文件小，项目上线服务器部署

* 第三方库的引入方式：

  * `本地引用`
    * `<script src="js/jquery-3.6.0.min.js"></script>`
  * `远程引用`
    * `<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>`

* js的onload和jQuery的ready：

  * `onload:`
    * `只能注册一次`
    * `onload:还要标签引用的资源加载完成以后才会执行`
  * `ready:`
    * `可以注册多个`
    * `ready执行比onload更早：`
    * `ready:页面的所有标签加载完成以后执行`

  