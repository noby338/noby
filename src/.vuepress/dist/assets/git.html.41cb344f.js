import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e}from"./app.7ab44a57.js";const i={},t=e(`<h3 id="git在linux中的安装" tabindex="-1"><a class="header-anchor" href="#git在linux中的安装" aria-hidden="true">#</a> git在linux中的安装</h3><ul><li>yum install git</li></ul><h3 id="将服务器设置为git的远程库" tabindex="-1"><a class="header-anchor" href="#将服务器设置为git的远程库" aria-hidden="true">#</a> 将服务器设置为git的远程库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  <span class="token comment"># 添加一个名为 git 的用户</span>
  adduser <span class="token function">git</span>
  <span class="token comment"># 设置 git 用户的密码</span>
  <span class="token function">passwd</span> <span class="token function">git</span>
  <span class="token comment"># 提权</span>
  <span class="token function">sudo</span> visudo
  <span class="token comment"># 在文件里写入</span>
  <span class="token function">git</span> <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL:ALL<span class="token punctuation">)</span> ALL
  <span class="token comment"># 保存提出，然后切换到 git 用户</span>
  <span class="token function">su</span> - <span class="token function">git</span>
  
  <span class="token comment"># 创建并进入代码仓库目录</span>
  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /home/www/website <span class="token builtin class-name">cd</span> <span class="token variable">$_</span>
  <span class="token comment"># 赋予 git 用户权限</span>
  <span class="token function">sudo</span> <span class="token function">chown</span> git:git /home/www/website
  <span class="token comment"># 创建代码目录并进入</span>
  <span class="token function">mkdir</span> ts.git <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> <span class="token variable">$_</span>
  <span class="token comment"># 专门用来创建远程仓库的初始化，git仓库通常以*.git命名。这种仓库只包括 git 版本控制相关的文件，不含工作区（不设置hooks即为不能在远程库修改工作区）</span>
  <span class="token function">git</span> <span class="token parameter variable">--bare</span> init
  <span class="token comment"># 所以我们需要借助一个 hooks，在有代码提交到该仓库的时候，将提交的代码迁移到其他目录，这里我们在 ts.git 同级目录下创建了一个 ts 文件夹，用于存放提交的源代码文件：</span>
  <span class="token comment"># 进入 hooks 目录</span>
  <span class="token builtin class-name">cd</span> hooks
  <span class="token comment"># 创建并编辑 post-receive 文件</span>
  <span class="token function">vim</span> post-receive
  <span class="token comment"># 这里是 post-receive 写入的内容</span>
  <span class="token comment">#!/bin/bash</span>
  <span class="token function">git</span> --work-tree<span class="token operator">=</span>/home/www/website/ts checkout <span class="token parameter variable">-f</span>
  <span class="token comment"># 赋予执行权限</span>
  <span class="token function">chmod</span> +x post-receive
  <span class="token comment"># 退出目录到 ts.git 同级目录并创建文件</span>
  <span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/<span class="token punctuation">..</span>/ <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> ts
  
  <span class="token comment"># 推送到该远程库</span>
  <span class="token function">git</span> push <span class="token parameter variable">-f</span> <span class="token parameter variable">-u</span> git@192.168.122.128:/home/www/website/ts.git master
  
  <span class="token comment"># 设置远程库的公钥</span>
  <span class="token comment"># 进入主目录</span>
  <span class="token builtin class-name">cd</span> /home/git
  <span class="token comment"># 进入 .ssh 目录</span>
  <span class="token builtin class-name">cd</span> .ssh
  <span class="token comment"># 创建 authorized_keys 文件，写入公钥（本地位于~/.ssh/id_rsa.pub）</span>
  <span class="token function">vim</span> authorized_keys
  <span class="token comment"># 给相关文件添加执行权限</span>
  <span class="token function">chmod</span> <span class="token number">600</span> /home/git/.ssh/authorized_keys
  <span class="token function">chmod</span> <span class="token number">700</span> /home/git/.ssh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),c=[t];function l(o,p){return s(),a("div",null,c)}const r=n(i,[["render",l],["__file","git.html.vue"]]);export{r as default};
