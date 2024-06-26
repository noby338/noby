---
title: day09 Sentinel服务保护
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

## 微服务雪崩的解决方案

雪崩的原因主要是微服务 A 访问微服务 B 时，如果微服务 B 出现宕机，访问 B 的 A 的线程会一直处于阻塞状态得不到资源的释放。当 A 的资源被耗尽时，微服务 A 也会宕机。
解决微服务的雪崩问题主要分类两种思路，一种是服务器故障前的预防，一种是服务器故障时的补救。

- 预防措施主要是对请求的限流处理，通过提前测试微服务的最高 qps，来限制微服务的 qps。预防高并发带来的服务故障。
- 补救措施主要有超时处理、线程隔离和熔断降级。
    - 超时处理是对长时间为做出响应的请求做出处理，而非一直等待。线程隔离分为线程池隔离和信号量隔离。
    - 线程隔离分为线程池隔离和信号量隔离
        - 线程池隔离主要是根据业务隔离微服务 A 中的线程池，当访问 B 的线程耗尽时，拒绝处理该请求，因为线程池中的线程有限，因而不会耗尽服务 A 中的资源。因线程池隔离会因创建过多的线程而消耗大量资源。
        - 信号量隔离和线程池隔离的原理类似，通过计数器的设置限制线程的创建，当线程创建的数量超过计数器则无法继续创建线程，从而拒绝处理请求，不会造成线程的阻塞。
    - 熔断降级是断路器通过统计异常请求的比例，对已经确定出现问题的微服务进行熔断，其他微服务对该服务的请求都会被直接拒绝，降级，就是在拒绝的基础上给一个其他兜底的响应。当断路器检测到过多的请求失败时进入 open 状态，过一段实现自动恢复到 half-open 状态，放行一部分请求测试服务器是否修复，当该请求通过时，切换到 closed 状态放行一切请求，当该请求不通过时，继续切换为 open 状态

## 运行

通过运行 jar 包，通过命令指定端口运行：`java -jar sentinel-dashboard-1.8.1.jar -Dserver.port=8090`，可在需要监控的服务中的 Spring 配置文件中配置

限流模式

- 直接
    - 统计与当前资源的请求，触发阈值时，对当前资源限流。
        - 在管控台配置某个请求的流量即可
- 关联
    - 统计与当前资源相关的另一个资源，触发阈值时，对当前资源限流
- 链路
    - 统计从指定链路访问到本资源的请求，触发阈值时，对指定链路限流
