---
title: windows创建定时任务
icon: write
category:
    - Windows
tag:
    - Windows
sticky: false
star: false
article: true
timeline: true
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
