---
title: day06 微服务常用组件
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
![image.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20230331212505.png)

- springCloud
    1. Eureka：Eureka 是 Netflix 开发的一套基于 REST 的服务注册和服务发现组件，主要用于实现微服务架构中的服务管理和服务治理。不需要启动应用程序
    2. Ribbon：Ribbon 是 Netflix 开发的一个底层的负载均衡组件，可以实现客户端的负载均衡和容错。
    3. OpenFeign：OpenFeign 是一个声明式的 HTTP 客户端框架，可以简化远程服务调用的编码工作，同时还提供了负载均衡和容错等特性。
    4. SpringCloudConfig：Config 是 Spring Cloud 提供的一个配置中心，可以将配置文件集中管理，并在应用程序启动时进行加载和解析。
    5. Zuul：Zuul 是 Netflix 开发的一个反向代理和路由网关，主要用于实现微服务架构中的服务路由和负载均衡。
    6. Bus：Bus 是 Spring Cloud 的消息总线框架，可以实现应用程序之间的消息通信，进而实现配置信息的动态更新和推送。
    7. Hystrix：是 Netflix 开源的一个用于处理分布式系统的延迟和容错的库，它能够保护分布式系统，防止出现级联故障，同时提供实时的监控、指标收集和配置管理等功能，可以使系统更加健壮和可靠。
    8. Gateway：Gateway 是 Spring Cloud 推出的新一代服务网关，可以实现跨语言和协议的路由、监控和安全控制等功能。
- SpringCloudAlibaba
    1. Nacos：是阿里巴巴开源的一款面向云原生应用的服务发现、配置管理和动态 DNS 服务。它包括两个核心模块：Service Discovery 和 Config Service。
    2. Seata：Seata 是阿里巴巴开源的一款分布式事务解决方案，可以在微服务架构下实现分布式事务控制。
    3. Sentinel：Sentinel 是阿里巴巴开源的一款面向分布式架构的流量控制、熔断降级和系统保护框架，具有高效、灵活和可扩展性等特点。

- 服务注册和发现：
    - Eureka：已学，不需要启动应用程序，打开管控台
    - Nacos：已学，需要启动应用程序，需要用到注册表（配置到 mysql）
- 配置管理：
    - SpringCloudConfig
    - NacosConfig：已学
- 服务路由和网关：
    - Zuul
    - Gateway：已学
- 客户端负载均衡：
    - Ribbon：已学
- 远程服务调用：
    - OpenFeign：已学
- 消息总线：
    - Bus
- 分布式事务：
    - Seata：已学
- 流量控制和熔断降级：
    - Sentinel：已学，需要启动应用程序，打开管控台
    - Hystrix：停止维护，功能欠缺
