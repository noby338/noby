import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as n,e as i}from"./app.e0f236de.js";const t={},a=i(`<h2 id="schtasks-函数" tabindex="-1"><a class="header-anchor" href="#schtasks-函数" aria-hidden="true">#</a> schtasks 函数</h2><div class="language-bat line-numbers-mode" data-ext="bat"><pre class="language-bat"><code>rem 查找任务名为noby的任务
SCHTASKS /Query /TN notepad
schtasks /query | findstr note*

rem 创建一个名字叫notepad的计划任务，每天从8点50开始，每隔2小时执行notepad.exe文件
SCHTASKS /Create /TN notepad /TR c:\\windows\\system32\\notepad.exe /ST 08:50 /SC HOURLY /MO 2

schtasks /create /tn &quot;SHUTDOWN&quot; /tr &quot;shutdown /s&quot;  /sc once /st 22:30
schtasks /create /tn NobyAlert /tr &quot;mshta vbscript:msgbox(&#39;schtask&#39;,0,&#39;test&#39;)(window.close)&quot; /st 20:47 /sc once

rem 删除任务
SCHTASKS /Delete /TN notepad


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),d=[a];function c(r,l){return s(),n("div",null,d)}const u=e(t,[["render",c],["__file","windows创建定时任务.html.vue"]]);export{u as default};
