---
# 当前页面内容标题
title: windows常用的系统变量
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
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
# 文档的时间
date: 2022-12-14
---

## 常用系统变量

| 变量名              | 变量值(默认值)                         | 变量描述                                                     |
| ------------------- | -------------------------------------- | ------------------------------------------------------------ |
| %UserName%          | Administrator                          | 用户名                                                       |
| %HomePath%          | \Users\Administrator                   | 用户主路径（此变量有时会替代%UserProfile%来定位到用户目录）  |
| %UserProfile%       | C:\Users\Administrator                 | 用户配置路径                                                 |
| %LocalAppData%      | C:\Users\UserFolder\AppData\Local      | 应用程序用户本地数据存储目录（如Chrome谷歌浏览器插件）       |
| %AppData%           | C:\Users\UserFolder\AppData\Roaming    | 应用程序配置及缓存存储目录（如Chrome谷歌浏览器保存的网站信息） |
| %HomePath%          | \Users\UserFolder                      | 用户目录路径                                                 |
| %SystemDrive%       | C:\                                    |                                                              |
| %ProgramFiles%      | C:\Program Files                       |                                                              |
| %ProgramFiles(x86)% | C:\Program Files (x86)                 |                                                              |
| %AllUsersProfile%   | C:\ProgramData                         |                                                              |
| %SystemRoot%        | C:\Windows                             |                                                              |
| %WinDir%            | C:\Windows                             |                                                              |
| %DriverData%        | C:\Windows\System32\Drivers\DriverData |                                                              |