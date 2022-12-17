---
# 当前页面内容标题
title: cmd的常用命令
# 当前页面图标
icon:  write
# 分类
category:
  - windows
# 标签
tag:
  - windows
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 10
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
# 文档的时间
date: 2022-12-14
---

## cmd 常用命令

| cmd命令                                                      | 作用                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `help`                                                       | 查看cmd命令帮助                                              |
| `help cd`<br />`cd /?`                                       | 参看指定命令的帮助                                           |
| `命令输入一部分时按下Tab键`                                  | 命令的自动补全                                               |
| `ctrl + c`                                                   | 停止目前正在执行的操作                                       |
| `上/下键`                                                    | 查看历史命令                                                 |
| `cls`                                                        | 清屏                                                         |
| `dir`                                                        | 显示文件列表                                                 |
| `d:`<br />`cd /d d:/test`<br />`cd /test`<br />`cd \` <br />`cd ..` | 切换到指定盘符<br />切换到指定盘符的指定路径<br />切换本盘符的指定路径<br />返回到本盘符的根目录<br />回到上级目录 |
| `md test`                                                    | 创建文件夹                                                   |
| `tree`<br />`tree d:/media`                                  | 查看当前路径的目录结构<br />查看指定路径的目录结构           |
| `ping ip地址/域名`                                           | 查看网络连接状态                                             |
| `ipconfig`                                                   | 查看看网络配置                                               |
| `net start`<br />`net start | findstr /i mysql`<br />`net start MySQL`<br />`net stop MySQL` | 参看正在运行的服务<br />管道命令通过字符串查看与mysql有关的服务(findstr命令的参数/i表示不分大小写)<br />开启指定服务<br />停止指定服务<br /> |
| `start notepad`<br />`notepad`<br />`notepad.exe`            | 启动应用程序（前提是存在windows用户存在该应用的环境变量）    |
| `tasklist`<br />`tasklist | findstr /i  msedge`<br />        | 查看正在运行的进程<br />管道命令通过字符串查看与msedge有关的进程<br /> |
| `taskkill /im notepad.exe`<br />`taskkill /pid 1234`<br />`taskkill /f /im msedge.exe` | 关闭notepad镜像生成的进程<br />根据进程id关闭指定进程<br />结束所有的msedge.exe进程 |
| `net user administrator /active:yes`                         | 启用管理员账户                                               |
| `shutdown /s`<br />`shutdown /s /t 3600`<br />`shutdown /r` <br />`shutdown /l`<br />`shutdown /h /f` | 关机<br />定时关机（秒）<br />重启<br />注销<br />休眠       |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |





