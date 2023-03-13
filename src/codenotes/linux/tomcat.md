---
title: tomcat
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
### tomcat 的安装

* 使用压缩包安装

  1. 解压到/usr/local/src/tomcat/

  2. 开放端口

     1. 查看防火墙的状态: `firewall-cmd --zone=public --query-port=8080/tcp`
     2. 添加开放端口: `firewall-cmd --zone=public --add-port=8080/tcp --permanent` （–permanent永久生效，没有此参数重启后失效）
     3. 重启防火墙: `firewall-cmd --reload`

     

     