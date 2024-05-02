---
title: day08 Seata分布式事务
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

## Seata 介绍

- 在单体应用中，可以使用传统的本地事务机制来管理事务，这种方式比较简单和直观。但是，在微服务架构下，由于每个服务都是独立的进程，它们通常使用不同的存储介质、部署在不同的物理机器。这样随着业务逻辑的增加，以及服务数量的增加，由原本的本地事务转变为分布式事务，通常会出现一些难以预料的问题，比如：并发事务执行导致数据不一致、网络异常导致数据丢失等。
- Seata（Simple Extensible Autonomous Transaction Architecture）是一个分布式事务解决方案，可以帮助解决微服务架构下，多个服务之间的事务一致性问题。Seata 提供了一个完整的事务解决方案，涵盖了分布式事务协调者、事务管理器和参与者三个组件。
- 以下是 Seata 的三个组件的简介：
    1. 事务协调者 Transaction Coordinator（TC）：维护全局和分支事务的状态，协调全局事务提交或回滚。
    2. 事务管理器 Transaction Manager（TM）：定义全局事务的范围、开始全局事务、提交或回滚全局事务。
    3. 资源管理器 Resource Manager（RM）：管理分支事务处理的资源，与 TC 交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。

## 分布式事务理论

### CAP 定理

在分布式系统中，CAP 定理指出，分布式系统无法同时满足一致性（Consistency）、可用性（Availability）和分区容错性（Partition Tolerance）这三个特性。也就是说，在发生网络分区时，系统只能实现其中的两个特性。

- 一致性（Consistency）：在分布式系统中，指当数据更新后，所有的访问者都能够读到最新的数据。
- 可用性（Availability）：在系统出现故障时，系统可以继续提供服务，而不会中断。
- 分区容错性（Partition Tolerance）：指网络出现分区后，系统仍能够继续工作。注意这里的分区指的是网络分区，不同节点之间出现通信故障的情况。
  常见的分布式系统会在 CAP 定理上作出不同的取舍，如：
- CP（Consistency, Partition Tolerance）：保证一致性和分区容错性，此时系统可能会失去可用性。比如，当网络发生故障时，系统会停止响应，直到网络恢复，数据更新后才可以继续提供服务。
- AP（Availability, Partition Tolerance）：保证可用性和分区容错性，此时系统可能会失去一致性。比如，当数据更新后不立即反应到所有节点上，此时读取操作可能会读到旧的数据，数据最终会在一定时间内保持一致。

### BASE 理论

BASE 理论是对分布式系统常见问题的一种哲学性的思考方式。BASE 全称是 Basically Available, Soft state, Eventually consistent，即基本可用、软状态、最终一致性。

- 基本可用（Basically Available）：系统能够基本正常地提供服务，不必保证系统在任何时刻都可用。
- 软状态（Soft state）：系统中的状态信息可能会出现短暂的不一致，但仍然能够保证系统最终一致性。
- 最终一致性（Eventually consistent）：在系统的一段时间后，所有数据最终都将达到一致状态，即通常情况下系统无法保证实时一致性，但是通过一定的机制保证数据在合理的时间内最终达到一致状态。
  BASE 理论是一种宽松的数据一致性要求，相比于强一致性，BASE 更适合在大规模分布式系统中使用，并且更加容错和灵活。

最终一致思想：各分支事务分别执行并提交，如果有不一致的情况，再想办法恢复数据

- seata 的 AT 模式
  强一致思想：各分支事务执行完业务不要提交，等待彼此结果。而后统一提交或回滚
- seata 的 XA 模式

## Seata 的配置

- seata 中的表
    - seata 库
        1. Branch Table（分支事务表）：存储所有分支事务的相关信息，包括其所属的全局事务 ID、分支事务 ID、分支事务状态、分支事务类型等等。Seata 通过这张表来跟踪每个分支事务的状态，协调分支事务的提交或回滚。
        2. Global Table（全局事务表）：存储所有全局事务的相关信息，包括全局事务 ID、全局事务状态、全局事务类型、参与事务的应用数量等等。Seata 使用这张表来管理全局事务的状态，以及全局 ID 和分支 ID 对应关系的映射。
        3. Lock Table（分布式锁表）：在 Seata 中，分布式锁用来保护全局事务的执行过程中的并发问题。Lock Table 存储了全局事务 ID 和锁的相关信息，同时支持乐观锁和悲观锁两种锁方式。
    - 各个微服务库
        1. Undo Log（回滚日志表）：Undo Log 是 Seata 中非常重要的一张表，用来记录每个分支事务执行的 SQL 操作，以支持执行回滚操作。当分支事务需要回滚时，Seata 会根据 Undo Log 的信息将修改的数据还原到事务执行前的状态。
- 修改配置文件
    - 修改 conf 目录下的 registry.conf 文件：

```properties
registry {
  # tc服务的注册中心类，这里选择nacos，也可以是eureka、zookeeper等
  type = "nacos"
 # seata tc 服务注册到 nacos的服务名称，可以自定义
  nacos {
    application = "seata-server"
    serverAddr = "127.0.0.1:8848"
    group = "DEFAULT_GROUP"
    namespace = ""
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }

}

config {
  # 读取tc服务端的配置文件的方式，这里是从nacos配置中心读取，这样如果tc是集群，可以共享配置
  type = "nacos"
  # 配置nacos地址等信息
  nacos {
    serverAddr = "127.0.0.1:8848"
    namespace = ""
    group = "SEATA_GROUP"
    username = "nacos"
    password = "nacos"
    dataId = "seataServer.properties"
  }
 
}
```

- 在 nacos 添加配置 seataServer.properties，DEFAULT_GROUP

```properties
# 数据存储方式，db代表数据库
store.mode=db
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&rewriteBatchedStatements=true
store.db.user=root
store.db.password=123
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000
# 事务、日志等配置
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.rollbackRetryTimeoutUnlockEnable=false
server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000

# 客户端与服务端传输方式
transport.serialization=seata
transport.compressor=none
# 关闭metrics功能，提高性能
metrics.enabled=false
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
```

## 执行的流程

- 在 Seata AT 模式中，全局事务由事务协调器（Transaction Coordinator）控制。资源管理器负责执行本地事务的提交和回滚操作。branch table、global table、lock table 和 undo log 则用于记录全局事务和分支事务的执行状态和信息，实现分布式事务的可靠性和一致性。具体的流程如下：
- AT 模式
    - 第一阶段
        1. 所有的分支事务 RM 注册分支事务到全局事务 TM
        2. 记录当前分支事务的 undo-log 记录
        3. 执行 sql 并提交
        4. 向 TC 报告事务的状态
    - 第二阶段
        1. 根据事务的状态回滚或提交
            1. 提交：删除 undo-log 对应分支记录
            2. 回滚：所有 RM 根据对应的 undo-log 记录回滚，删除 undo-log 对应分支记录
