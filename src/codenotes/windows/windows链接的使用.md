---
# 当前页面内容标题
title: 链接的使用
# 当前页面图标
icon:  write
# 分类
category:
  - windows
# 标签
tag:
  - windows
  - 符号链接
  - 软链接
  - 硬链接

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

## 链接的使用

* dir：查看路径下的目录、文件、链接

* hard link（硬链接）：不可跨分区，只可作用于文件

  * eg: `mklink /h "D:\null\text4.txt" "D:\null\text3.txt"`

    * 新建文件text4.txt为文件text3.txt的硬链接

* junction point（directory hard link）（软链接）：可跨分区，只可作用于目录，只能使用绝对路径。即使创建junction point时使用了相对路径，保存到NTFS中时将隐式转换成绝对路径。（linux中没有该类链接）

  * eg: `mklink /j "D:\null\B" "D:\null\A" `

    * 新建目录B为为目录A的软链接

* symbolic link（符号链接）：可跨分区，可作用于目录和文件，可使用相对路径和绝对路径

  * eg: `mklink /d "D:\null\D" "D:\null\C" `

    * 新建目录D为为目录C的符号链接

  * eg: `mklink "D:\null\C\text2.txt" "D:\null\A\text.txt" `

    * 新建文件text2.txt为文件text.txt的符号链接

