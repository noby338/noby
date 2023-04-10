---
title: rabbitmq
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
## 安装

### 基础部分

- `rpm -ivh erlang-22.3-1.el7.x86_64.rpm`
  - erlang 语言包
  - rabbitmq 的版本要和 erlang 的版本搭配:https://rabbitmq.com/which-erlang.html
- `rpm -ivh socat-1.7.3.2-5.el7.lux.x86_64.rpm`
  - rabbitmq 依赖包
- `rpm -ivh rabbitmq-server-3.7.16-1.el7.noarch.rpm`
  - rabbitmq

### 安装延迟插件

- `unzip rabbitmq_delayed_message_exchange-20171201-3.7.x.zip -d /usr/lib/rabbitmq/lib/rabbitmq_server-3.7.16/plugins/`
  - 解压到指定目录
- `rabbitmq-plugins enable rabbitmq_delayed_message_exchange`
  - 开启插件
- `systemctl restart rabbitmq-server-service`
  - 重启服务

## 配置

- web 界面管控台

  - 插件的安装
    - 查看已安装插件
      - `rabbitmq-plugins list`
    - 安装管控台插件
      - `rabbitmq-plugins enable rabbitmq_management`
  - 默认的账号和密码都是 guest。这个默认的账号只对本机开放，Windows 无法访问，开启对外访问。修改配置文件
    - `vim /usr/lib/rabbitmq/lib/rabbitmq_server-3.7.16/ebin/rabbit.app`
      - `{loopback_users, [guest]},`
  - 管控台界面
    - http://192.168.122.128:15672

- rabbitmq 对外通信两个端口
  - 接受消息的核心端口：5672
  - 管控台界面 web 项目端口：15672

## 启动

- `systemctl start rabbitmq-server`
