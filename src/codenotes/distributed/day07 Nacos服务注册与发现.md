---
title: day07 Nacos服务注册与发现
icon: write
category:
    - Distributed
tag:
    - Distributed
sticky: false
star: false
article: true
timeline: true
---

## 介绍

Nacos 是阿里巴巴开源的一款面向云原生应用的服务发现、配置管理和动态 DNS 服务。它包括两个核心模块：Service Discovery 和 Config Service。它使用分级存储模型：Namespace>Group>Service>Clustrer>Instance

## 配置

解压即可
启动端口配置位于 config 目录下的 application.properties，默认为 8848

## 启动

```cmd
startup.cmd -m standalone
```

可通过修改 cmd，set MODE="standalone"，设置默认的启动方式为单机模式，此时双击运行即可

启动后请求 http://127.0.0.1:8848/nacos 可访问管控台

## 微服务使用 nacos 管理

- 微服务中导入坐标

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

- application.yml 中添加 nacos 地址：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
```

- 重启微服务后，登录 nacos 管理页面，可以看到微服务信息：

![image.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20230410192138.png)

## Nacos 和 Eureka

- Nacos 与 eureka 的共同点
    - 都支持服务注册和服务拉取
    - 都支持服务提供者心跳方式做健康检测
- Nacos 与 Eureka 的区别
    - Nacos 支持服务端主动检测提供者状态：临时实例采用心跳模式，非临时实例采用主动检测模式
    - 临时实例心跳不正常会被剔除，非临时实例则不会被剔除
    - Nacos 支持服务列表变更的消息推送模式，服务列表更新更及时
    - Nacos 集群默认采用 AP 方式，当集群中存在非临时实例时，采用 CP 模式；Eureka 采用 AP 方式
