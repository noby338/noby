---
title: cmd的常用命令
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

## cmd 常用命令

### 基础操作

- `help`：查看 CMD 命令帮助。
- `help cd` 或 `cd /?`：查看指定命令的帮助信息。
- `命令 + Tab键`：自动补全命令。
- `Ctrl + C`：中断当前运行的命令或程序。
- `上/下箭头`：浏览命令历史记录。
- `cls`：清空命令提示符窗口内容。
- `dir`：显示当前目录下的文件及文件夹列表。

### 导航与目录操作

- `d:`：切换到 D 盘。
- `cd /d d:\test`：直接切换到 D 盘的 test 目录。
- `cd \test` 或 `cd test`：切换到当前盘符下的 test 目录。
- `cd \`：返回到当前盘符的根目录。
- `cd ..`：返回到上级目录。
- `md test` 或 `mkdir test`：创建名为 test 的新目录。

### 查看与管理

- `tree`：显示当前目录结构。
- `tree d:\media`：显示指定路径（如 D:\media）的目录结构。
- `ping IP地址/域名`：测试与指定 IP 地址或域名的网络连接。
- `ipconfig`：显示网络配置信息，包括 IP 地址、子网掩码等。
- `net start`：列出正在运行的服务。
- `net start | findstr /i mysql`：查找包含 mysql 的服务（不分大小写）。
- `net start MySQL`：启动名为 MySQL 的服务。
- `net stop MySQL`：停止名为 MySQL 的服务。

### 应用程序与进程管理

- `start notepad`：启动记事本应用。
- `tasklist`：显示当前所有运行的任务和进程。
- `tasklist | findstr /i msedge`：查找与 msedge 相关的进程。
- `taskkill /im notepad.exe`：结束 notepad.exe 进程。
- `taskkill /pid 1234`：根据进程 ID 结束进程。
- `taskkill /f /im msedge.exe`：强制结束所有 msedge.exe 进程。

### 系统操作

- `net user administrator /active:yes`：激活管理员账户。
- `shutdown /s`：立即关机。
- `shutdown /s /t 3600`：一小时后自动关机（3600 秒）。
- `shutdown /r`：重启计算机。
- `shutdown /l`：注销当前用户。
- `shutdown /h /f`：强制休眠计算机。

## bat 脚本

- 脚本文件：windows 中当文件的后缀名为 `.bat` 或 `.cmd` 时，都是可执行的脚本文件
- 通过启动目录执行脚本：下的可执行文件在开机时都会执行。windows 的启动目录位置：[C:\Users\用户名\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup]

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

mshta vbscript:msgbox("内容","标题")(window.close)

```
