import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as l,e}from"./app.b62a36f4.js";const s={},d=e(`<h3 id="nginx的安装和基本命令" tabindex="-1"><a class="header-anchor" href="#nginx的安装和基本命令" aria-hidden="true">#</a> nginx的安装和基本命令</h3><h4 id="第一种方式-使用yum安装" tabindex="-1"><a class="header-anchor" href="#第一种方式-使用yum安装" aria-hidden="true">#</a> 第一种方式（使用yum安装）</h4><ul><li>安装 <ul><li>yum install -y nginx</li></ul></li><li>启用 Nginx <ul><li>systemctl start nginx</li></ul></li><li>设置为在系统启动时自动启动 <ul><li>systemctl enable nginx</li></ul></li><li>配置文件位置 <ul><li>cd /etc/nginx</li></ul></li></ul><h4 id="第二种方式-使用makefile文件安装" tabindex="-1"><a class="header-anchor" href="#第二种方式-使用makefile文件安装" aria-hidden="true">#</a> 第二种方式（使用makefile文件安装）</h4><ul><li>安装包及解压文件夹的位置为/usr/local/src/nginx/ <ul><li>安装步骤 <ul><li>前提 <ul><li>安装gcc的环境(c和c++的编译) yum install gcc-c++</li><li>安装PCRE perl库(nginx的http模块中的正则表达式使用) yum install -y pcre pcre-devel</li><li>安装openssl密码库(用于nginx中https协议的加密) yum install -y openssl openssl-devel</li></ul></li></ul></li><li>执行 ./configure 命令生成 makefile 文件</li><li>执行 make install 命令安装nginx</li></ul></li><li>安装位置为/usr/local/nginx/ <ul><li>命令目录为/usr/local/nginx/sbin/</li><li>配置文件目录为/usr/local/nginx/conf/</li></ul></li><li>命令 <ul><li>启动 <ul><li>./sbin/nginx</li></ul></li><li>关闭 <ul><li>./sbin/nginx -s stop kill杀死进程</li><li>./sbin/nginx -s quit 正常结束退出</li></ul></li><li>重启 <ul><li>./sbin/nginx -s reload</li></ul></li></ul></li></ul><h3 id="nginx-的使用" tabindex="-1"><a class="header-anchor" href="#nginx-的使用" aria-hidden="true">#</a> nginx 的使用</h3><ul><li><p>配置文件路径 /usr/local/nginx/conf/nginx.conf</p></li><li><p>虚拟主机</p><ul><li><p>通过端口区分</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  server {
          listen       80;
          server_name  http://192.168.32.128/;
  
          location / {
              root   web1;
              index  index.html index.htm;
          }
      }
  server {
          listen       81;
          server_name  http://192.168.32.128/;
  
          location / {
              root   web1;
              index  index.html index.htm;
          }
      }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>通过域名区分</p><ul><li>在 hosts 中配置域名</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  server {
          listen       80;
          server_name  www.noby.com;
  
          #charset koi8-r;
  
          #access_log  logs/host.access.log  main;
  
          location / {
              root   html;
              index  index.html index.htm;
          }
          error_page   500 502 503 504  /50x.html;
          location = /50x.html {
              root   html;
          }
  
      
      }
  
      server {
          listen       80;
          server_name  www.noby1.com;
  
          #charset koi8-r;
  
          #access_log  logs/host.access.log  main;
  
          location / {
              root   html;
              index  index.html index.htm;
          }
          error_page   500 502 503 504  /50x.html;
          location = /50x.html {
              root   html;
          }
  
      
      }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>反向代理(通过 nginx 访问 tomcat)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  server {
          listen       80;
          server_name  www.nobytom.com;
  
          location / {
              proxy_pass http://192.168.32.128:8080;
          }
  
      }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>负载均衡(ngnix 同时反向代理多个 tomcat)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  upstream myweb{//一个请求交给两个 tomcat 处理，(默认轮流调用，设置 weight指定权重)
      server 192.168.150.129:8080;
      server 192.168.150.129:8081 weight=2;
  }
  
  server {
      listen 80;
      server name localhost;
      
      location/{
      	proxy_pass http://myweb;
      }
  }
      	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,7),a=[d];function r(v,c){return n(),l("div",null,a)}const t=i(s,[["render",r],["__file","nginx.html.vue"]]);export{t as default};
