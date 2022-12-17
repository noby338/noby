---
# 当前页面内容标题
title: windows创建定时任务
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

## schtasks 函数

```bat
rem 查找任务名为noby的任务
SCHTASKS /Query /TN notepad
schtasks /query | findstr note*

rem 创建一个名字叫notepad的计划任务，每天从8点50开始，每隔2小时执行notepad.exe文件
SCHTASKS /Create /TN notepad /TR c:\windows\system32\notepad.exe /ST 08:50 /SC HOURLY /MO 2

schtasks /create /tn "SHUTDOWN" /tr "shutdown /s"  /sc once /st 22:30
schtasks /create /tn NobyAlert /tr "mshta vbscript:msgbox('schtask',0,'test')(window.close)" /st 20:47 /sc once

rem 删除任务
SCHTASKS /Delete /TN notepad


```

