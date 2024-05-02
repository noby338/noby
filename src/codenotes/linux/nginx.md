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

## nginx 的安装和基本命令

### 第一种方式（使用 yum 安装）

- 安装
    - yum install -y nginx
- 启用 Nginx
    - systemctl start nginx
- 设置为在系统启动时自动启动
    - systemctl enable nginx
- 配置文件位置
    - cd /etc/nginx

### 第二种方式（使用 makefile 文件安装）

- 安装包及解压文件夹的位置为/usr/local/src/nginx/
    - 安装步骤
        - 前提
            - 安装 gcc 的环境 (c 和 c++ 的编译) yum install gcc-c++
            - 安装 PCRE perl 库 (nginx 的 http 模块中的正则表达式使用) yum install -y pcre pcre-devel
            - 安装 openssl 密码库 (用于 nginx 中 https 协议的加密) yum install -y openssl openssl-devel
    - 执行 ./configure 命令生成 makefile 文件
    - 执行 make install 命令安装 nginx
- 安装位置为/usr/local/nginx/
    - 命令目录为/usr/local/nginx/sbin/
    - 配置文件目录为/usr/local/nginx/conf/
- 命令
    - 启动
        - ./sbin/nginx
    - 关闭
        - ./sbin/nginx -s stop kill 杀死进程
        - ./sbin/nginx -s quit 正常结束退出
    - 重启
        - ./sbin/nginx -s reload

## nginx 的使用

- 配置文件路径 /usr/local/nginx/conf/nginx.conf

### 静态页面的部署

```json
 http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        # 访问的端口
        listen       80;
        # 访问的ip/域名
        server_name  localhost;
        location / {
            # 访问的目录
            root   noby;
            # 访问的目录中的文件
            index  index.html index.htm;
        }


        # 表示错误的页面跳转
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root  html;
        }
    }
}
```

### 虚拟主机的配置

#### 通过不同端口号实现虚拟主机的配置

```json
 http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;# 访问的端口
        server_name  localhost; # 访问的ip/域名

        # 访问的位置
        location / {
            root   noby;# 访问的目录
            index  index.html index.htm;# 访问的目录中的文件
        }

        # 表示错误的页面跳转
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root  html;
        }
    }
    server {
        listen       81;# 访问的端口
        server_name  localhost; # 访问的ip/域名

        # 访问的位置
        location / {
            root   noby2;# 访问的目录
            index  index.html index.htm;# 访问的目录中的文件
        }

        # 表示错误的页面跳转
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root  html;
        }
    }
}
```

#### 通过不同域名实现虚拟主机的配置

```json
 http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;# 访问的端口
        server_name  test.noby.site; # 访问的ip/域名

        # 访问的位置
        location / {
            root   noby;# 访问的目录
            index  index.html index.htm;# 访问的目录中的文件
        }

        # 表示错误的页面跳转
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root  html;
        }
    }
    server {
        listen       80;# 访问的端口
        server_name  test2.noby.site; # 访问的ip/域名

        # 访问的位置
        location / {
            root   noby2;# 访问的目录
            index  index.html index.htm;# 访问的目录中的文件
        }

        # 表示错误的页面跳转
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root  html;
        }
    }
}
```

### 反向代理的配置

```json
 http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    # 被代理服务器的ip和端口
    upstream tomcat-travel {
      server 192.168.122.128:8080;
    }

    server {
        # 访问的端口
        listen       80;
        # 访问的ip/域名
        server_name  localhost;
        location / {
            proxy_pass http://tomcat-travel;
            # 访问的目录中的文件
            index  index.html index.htm;
        }


        # 表示错误的页面跳转
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root  html;
        }
    }
}
```

### 负载均衡的配置

```json
 http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    # 被代理服务器的ip和端口
    upstream tomcat-travel {
      # 权重为2比1比1
      server 192.168.122.128:8080 weight = 2;
      server 192.168.122.128:8081 weight = 1;
      server 192.168.122.128:8082 weight = 1;
    }

    server {
        # 访问的端口
        listen       80;
        # 访问的ip/域名
        server_name  localhost;
        location / {
            proxy_pass http://tomcat-travel;
            # 访问的目录中的文件
            index  index.html index.htm;
        }


        # 表示错误的页面跳转
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root  html;
        }
    }
}
```
