---
# 当前页面内容标题
title: cmd脚本的书写
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

## bat 脚本

```bat
::Windows 系统命令行默认使用 GBK 编码（编号: 936），如果需要显示中文，编写的脚本可以使用 ANSI 或 GB2312 编码。
::第二个方法是文件头加上 chcp 65001，让终端显示为utf8编码

::echo off关闭该文件中命令回显，@关闭echo off命令的回显
@echo off
::设置命令行窗口的标题
TITLE nobytest
::当前文件，以及当前文件路径
echo Current script is: %0,Current script path is: %~dp0
::运行程序时输入的第一个参数，和第二个参数
echo First param is: %1,Second param is: %2
::if
if 1==1 (echo ok) else (echo fail)
::设置变量
set name=noby
::控制台输入参数
@REM set /p age=please input age for %name%:
::涉及计算时
set /a calculate=(1+2)*3
set /a sum=0
::for循环(起始值，累加，条件)
for /l %%i in (0,1,5) do (
    set /a sum=sum+%%i
)
::跳转的标签
:again
::跳转到again
@REM goto :again
::跳转到结尾
@REM goto :eof
::一些系统变量
echo random=%random%,time=%time%,date=%date%,JAVA_HOME=%JAVA_HOME%
::暂停执行
@REM pause
::输出空行
echo.
echo The name is %name%,The age is %age%,The calculate is %calculate%,The sum is %sum%
::打开其他软件
@REM start D:\application(GREEN)\SpaceSniffer.exe
@REM start C:\WINDOWS\System32\SndVol.exe
::调用其他 bat ，call 后填写路径
@REM call otherbat
::taskkill /f /t /im 进程名称
::                        /f 杀死所有进程及子进程
::                        /t 强制杀死
::                        /im 用镜像名称作为进程信息   
::                        /pid 用进程id作为进程信息
tasklist | findstr "uTools.exe"
if %errorlevel%==0 ( 
	echo "yes"
    taskkill /f /im "uTools.exe" /t
) else (
	echo "No" 
    start C:\Users\13269\AppData\Local\Programs\utools\uTools.exe
)

echo 运行成功，按任意键退出 && pause > nul

mshta vbscript:msgbox("内容",0,"标题")(window.close)


```

* 脚本文件：windows中当文件的后缀名为`.bat`或`.cmd`时，都是可执行的脚本文件
* 通过启动目录执行脚本：下的可执行文件在开机时都会执行。windows的启动目录位置：[C:\Users\用户名\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup]
