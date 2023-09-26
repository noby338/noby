---
title: day05 RabbitMQ消息的可靠性、延迟消息、消息堆积
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

### 消息的可靠性

![image.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20230330184622.png)

其中的每一步都可能导致消息丢失，常见的丢失原因包括：

- 生产者确认机制：解决消息发送时丢失，包括未发送到交换机和未发送到队列两种情况
  - 生产者发送的消息未送达 exchange，到达 publisher-confirm 回调函数（配置在具体的消息发送中）
  - 消息到达 exchange 后未到达 queue， 到达 publisher-return 回调函数（所有消息配置在统一的配置类中）
- mq 持久化：默认情况下的 rabbitmq 的交换机、队列、消息都不是持久化的，而是存储在内存中，一旦 MQ 宕机。交换机、队列、消息都会消失
  - 交换机、队列、消息SpringAMQP 默认是持久化的，RabbitMQ 默认不是持久化的
- 消费者确认机制(acknowledge-mode)：确保消费者不把处理失败的消息丢失，
  - 消费者确认机制一共有三种：
    - none：消费者获得消息后，mq 则删除队列中的消息
    - auto：消费者中Listener中出现异常时返回 nack，mq保留消息；没有出现异常，则返回 ack，mq删除消息
      - 配置auto模式时，且未配置失败重试机制时，默认当发生异常时，在消息在队列和消费者中无限循环
    - manual：自己根据业务情况，判断什么时候该返回 ack和nack
  - 失败重试机制(retry)(SpringAMQP提供)：开启后，消费者失败后会在本地重试，当重试次数完了之后还是失败会根据配置类中的MessageRecoverer规则处理消息发往哪个队列（默认为舍弃消息），同时向mq发送Reject，mq收到会删除消息

### 延迟消息

- 实现的两种方式

  - 使用死信交换机(相比较RepublishMessageRecoverer，死信交换机是Rabbitmq原生支持的)
    - 通过延时(ttl)交换机路由消息到一个没有消费者的延时队列，该队列设置过期时间，并且绑定一个死信(dl)交换机。当延时队列中的消息过期时将发送至死信交换机路由到死信队列
    - 设置消费者监听死信队列，处理消息
  - 使用 rabbitmq 自带的延迟插件
    - 将信息投递到延迟交换机，延迟交换机延迟后自动投递到队列，消费者监听该队列。插件的延迟交换机 x-delayed-message 是三种基本交换机之外的另一种特殊交换机，可以将消息存储在内存中，当时间结束则投递给队列

- 哪些消息是死信
  - 消费者使用 basic.reject 或 basic.nack 声明消费失败，并且消息的 requeue 参数设置为 false(不重新入队)
  - 消息是一个过期消息，超时无人消费（可以实现延迟消息）
  - 要投递的队列消息满了，无法投递

### 消息堆积

- 解决消息堆积有两种思路：
  - 增加更多消费者，提高消费速度。也就是我们之前说的 work queue 模式
  - 扩大队列容积，提高堆积上限
    - 使用惰性队列
      - 接收到消息后直接存入磁盘而非内存
      - 消费者要消费消息时才会从磁盘中读取并加载到内存
      - 支持数百万条的消息存储
