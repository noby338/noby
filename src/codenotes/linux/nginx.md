---
title: nginx
icon: write
category:
  - Linux
tag:
  - Linux
sticky: false
star: false
article: true
timeline: true
---
### nginx的安装和基本命令

#### 第一种方式（使用yum安装）

- 安装
  - yum install -y nginx
- 启用 Nginx
  - systemctl start nginx
- 设置为在系统启动时自动启动
  - systemctl enable nginx
- 配置文件位置
  - cd /etc/nginx
  

#### 第二种方式（使用makefile文件安装）

* 安装包及解压文件夹的位置为/usr/local/src/nginx/
  * 安装步骤
    * 前提
      * 安装gcc的环境(c和c++的编译) yum install gcc-c++
      * 安装PCRE perl库(nginx的http模块中的正则表达式使用) yum install -y pcre pcre-devel
      * 安装openssl密码库(用于nginx中https协议的加密) yum install -y openssl openssl-devel
  * 执行 ./configure 命令生成 makefile 文件
  * 执行 make install 命令安装nginx
* 安装位置为/usr/local/nginx/
  * 命令目录为/usr/local/nginx/sbin/
  * 配置文件目录为/usr/local/nginx/conf/
* 命令
  * 启动 
    * ./sbin/nginx
  * 关闭
    * ./sbin/nginx -s stop   kill杀死进程
    * ./sbin/nginx -s quit	正常结束退出
  * 重启
    * ./sbin/nginx -s reload

### nginx 的使用

* 配置文件路径 /usr/local/nginx/conf/nginx.conf

* 虚拟主机

  * 通过端口区分

    ```
      server {
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
      ```

      

  * 通过域名区分

    * 在 hosts 中配置域名

    ```
      server {
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
      ```

* 反向代理(通过 nginx 访问 tomcat)

  ```
    server {
            listen       80;
            server_name  www.nobytom.com;
    
            location / {
                proxy_pass http://192.168.32.128:8080;
            }
    
        }
    ```

* 负载均衡(ngnix 同时反向代理多个 tomcat)

  ```
    upstream myweb{//一个请求交给两个 tomcat 处理，(默认轮流调用，设置 weight指定权重)
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
        	
    ```

    