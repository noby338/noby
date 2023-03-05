import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as n,e as s}from"./app.4f29ddf5.js";const l={},d=s(`<h2 id="bat-脚本" tabindex="-1"><a class="header-anchor" href="#bat-脚本" aria-hidden="true">#</a> bat 脚本</h2><div class="language-bat line-numbers-mode" data-ext="bat"><pre class="language-bat"><code>::Windows 系统命令行默认使用 GBK 编码（编号: 936），如果需要显示中文，编写的脚本可以使用 ANSI 或 GB2312 编码。
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
@REM start D:\\application(GREEN)\\SpaceSniffer.exe
@REM start C:\\WINDOWS\\System32\\SndVol.exe
::调用其他 bat ，call 后填写路径
@REM call otherbat
::taskkill /f /t /im 进程名称
::                        /f 杀死所有进程及子进程
::                        /t 强制杀死
::                        /im 用镜像名称作为进程信息   
::                        /pid 用进程id作为进程信息
tasklist | findstr &quot;uTools.exe&quot;
if %errorlevel%==0 ( 
	echo &quot;yes&quot;
    taskkill /f /im &quot;uTools.exe&quot; /t
) else (
	echo &quot;No&quot; 
    start C:\\Users\\13269\\AppData\\Local\\Programs\\utools\\uTools.exe
)

echo 运行成功，按任意键退出 &amp;&amp; pause &gt; nul

mshta vbscript:msgbox(&quot;内容&quot;,0,&quot;标题&quot;)(window.close)


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>脚本文件：windows中当文件的后缀名为<code>.bat</code>或<code>.cmd</code>时，都是可执行的脚本文件</li><li>通过启动目录执行脚本：下的可执行文件在开机时都会执行。windows的启动目录位置：[C:\\Users\\用户名\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup]</li></ul>`,3),a=[d];function v(c,r){return e(),n("div",null,a)}const t=i(l,[["render",v],["__file","cmd脚本的书写.html.vue"]]);export{t as default};
