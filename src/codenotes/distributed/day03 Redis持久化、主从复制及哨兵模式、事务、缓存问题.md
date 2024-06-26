---
title: day03 Redis持久化、主从复制及哨兵模式、事务、缓存问题
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

## redis 的持久化

- RDB（redis database）快照：将当前数据状态进行保存，快照形式，存储数据结果，存储格式简单，关注点在数据
    - 执行的时机
        - 持久化执行时机为使用持久化指令，或者关闭 redis 之前 (正常关闭 redis，意外关机、宕机不可以)
        - 数据的恢复执行时机为启动 redis 时
    - 通过指令命令 redis 执行
        - 两种指令
            - save
                - save 指令的执行会阻塞当前 Redis 服务器，直到当前 RDB 过程完成为止，有可能会造成长时间阻塞，线上环境不建议使用。
            - bgsave
                - bgsave 命令是针对 save 阻塞问题做的优化。Redis 内部所有涉及到 RDB 操作都建议采用 bgsaeve 的方式，save 命令可以放弃使用。
        - 两种指令的区别

| 方式             | save 指令 | bgsave 指令 (save 配置) |
| ---------------- | --------- | ---------------------- |
| 读写             | 同步      | 异步                   |
| 阻塞客户端的指令 | 是        | 否                     |
| 额外的内存消耗   | 否        | 是                     |
| 启动新进程       | 否        | 是                     |

- 配置方式 Redis 自动执行
    - 在配置 server 的配置文件中指定 save second changes 即可使 redis 自动持久化，在 second 时间内改变 changes 次即自动执行 bgsave 操作
- RDB 的优缺点
    - RDB 优点
        - RDB 是一个紧凑压缩的二进制文件，存储效率较高
        - RDB 内部存储的是 redis 在某个时间点的数据快照，非常适合用于数据备份，全量复制等场景
        - RDB 恢复数据的速度要比 AOF 快很多
    - RDB 缺点
        - RDB 方式无论是执行指令还是利用配置，无法做到实时持久化，具有较大的可能性丢失数据
        - bgsave 指令每次运行要执行 fork 操作创建子进程，要牺牲掉一些性能
        - Redis 的众多版本中未进行 RDB 文件格式的版本统一，有可能出现各版本服务之间数据格式无法兼容现象
- 应用：服务器中每 X 小时执行 bgsave 备份，并将 RDB 文件拷贝到远程机器中，用于灾难恢复。
- AOF(append only file) 日志：将数据的操作过程进行保存，日志形式，存储操作过程，存储格式复杂，关注点在数据的操作过程
    - 配置方式 Redis 自动执行
        - 在配置 server 的配置文件中指定 appendonly yes|no 即可开启或关闭 AOF，配置 appendfsync always|everysec|no 即可指定执行的周期
            - always：每次写入操作均同步到 AOF 文件中，数据零误差，性能较低，不建议使用。
            - everysec：每秒将缓冲区中的指令同步到 AO「文件中，数据准确性较高，性能较高，建议使用，也是默认配置
            - no：由操作系统控制每次同步到 AOF 文件的周期，整体过程不可控
    - AOF 的重写操作
        - 定义：AOF 记录的为所有的操作流程，但是存在部分流程不需要记录的场景，例如：set name noby，set name kace，AOF 其实只需记录最后一个 set 即可，简单说就是将对同一个数据的若干个条命令执行结果转化成最终结果数据对应的指令进行记录。这种方式叫做 AOF 的重写
        - 作用
            - 降低磁盘占用量，提高磁盘利用率
            - 提高持久化效率，降低持久化写时间，提高 IO 性能
            - 降低数据恢复用时，提高数据恢复效率
        - 重写的策略
            - 进程内已超时的数据不再写入文件
            - 忽略无效指令，重写时使用进程内数据直接生成，这样新的 AOF 文件只保留最终数据的写入命令
            - 对同一数据的多条写命令合并为一条命令
        - 重写的方式
            - 手动重写
                - 指令
                    - bgrewriteaof
            - 自动重写
                - 指令
                    - auto-aof-rewrite-min-size size
                    - auto-aof-rewrite-percentage percentage
                - 自动重写触发条件设置
                    - auto-aof-rewrite-min-size size
                    - auto-aof-rewrite-percentage percent
                - 自动重写触发比对参数（运行指令 info Persistence 获取具体信息）
                    - aof_current_size
                    - aof_base_size
                - 自动重写触发条件
                    - aof_current_size>auto-aof-rewrite-min-size
                    - aof_current_size-aof_base_size/aof_base_size=auto-aof-rewrite-percentage
- 两种持久化方式的对比
    - 占用存储空间：RDB 存储的是压缩后的数据，AOF 存储的是重写后的命令，占用的存储空间 AOF 较多
    - 存储速度：RDB 数据量小的时快，数据量变大将非常慢 (每次都需要备份所有的数据)，AOF 存储速度相对较快 (每次只需要追加新的指令)
    - 恢复速度：RDB 直接复制结果数据，相对较快，AOF 通过执行指令的方式恢复，相对较慢
    - 数据安全性：RDB 因存储的速度慢的原因，设置自动存储的时间间隔相对较长因此丢失的数据相对较多，AOF 因存储速度相对快，时间间隔短，因此丢失的数据相对较少
    - 资源消耗：RDB bgsave 指令执行 fork 操作创建子进程过程消耗资源相对较多，AOF 相对较少
    - 兼容性：RDB 有可能出现各 redis 版本服务之间数据格式无法兼容现象，AOF 则不存在
    - 启动优先级：RDB 优先级较低，AOF 优先级较高

## redis 的事务

- 在 Redis 中，事务（Transaction）指的是一组命令的集合，这些命令将被一次性、按顺序地执行，不会被其他客户端的命令所打断。Redis 事务的实现原理是将一组命令存放到队列中，然后在客户端发起执行时，Redis 将依次执行这些命令。如果在执行过程 中出现错误，则会回滚整个事务。
- 开启事务
    - multi
        - 设定事务的开启位置，此指令执行后，后续的所有指令均加入到事务中
- 执行事务
    - exec
        - 设定事务的结束位置，同时执行事务，执行完事务之后销毁掉事务队列。与 multi 成对使用
        - 注意：加入事务的命令暂时进入到任务队列中，并没有立即执行，只有执行 exec 命令才开始执行
- 取消事务
    - discard
        - 销毁掉事务队列，终止当前事务的定义，发生在 multi 之后，exec 之前
- 事务锁
    - watch keyl [key2……]
        - watch 指令在 multi 指令之前，对 key 添加监视锁，在执行 exec 前如果 key 发生了变化，终止事务执行
    - unwatch
        - 取消对所有 key 的监视
- 分布式事务
    - 步骤：
        1. setnx lock-key value 使用 setnx 设置一个公共锁
        2. pexpire lock-key milliseconds 使用 expire 为锁 key 添加时间限定，到时不释放，放弃锁 (避免异常不释放锁)
        3. del lock-key 释放锁

## redis 的主从复制

- Redis 主从复制（Master-Slave Replication）指的是在 Redis 集群中，一个节点（称为主节点或者 Master）将自己的数据复制到其他节点（称为从节点或者 Slave）的过程。主从复制使得 Redis 能够在多个节点之间同步数据，提高了系统的可靠性和可扩展性。
- 在 Redis 主从复制中，主节点负责接收和处理客户端的请求，并将数据更新到自己的数据集中。同时，主节点还会将自己的数据集发送给从节点，从节点接收到数据后，将其存储在自己的数据集中。当主节点的数据集发生变化时，主节点会将变化的数据同步给从节点，从节点接收到数据后进行更新。
- 结构
    - 主机 master:
    - 写数据
    - 执行写操作时，将出现变化的数据自动同步到 slave
    - 读数据（可忽略）
    - 从机 slave:
        - 读数据
        - 写数据（禁止）
- 优点
    - 读写分离：master 写、slave 读，提高服务器的读写负载能力
    - 负载均衡：基于主从结构，配合读写分离，由 slave 分担 master 负载，并根据需求的变化，改变 slave 的数量，通过多个从节点分担数据读取负载，大大提高 Redis 服务器并发量与数据吞吐量
    - 故障恢复：当 master 出现问题时，由 slave 提供服务，实现快速的故障恢复
    - 数据冗余：实现数据热备份，是持久化之外的一种数据冗余方式
    - 高可用基石：基于主从复制，构建哨兵模式与集群，实现 Redis 的高可用方案
- 主从复制的过程分为三个阶段
    - 建立连接阶段（即准备阶段）：在这个阶段中，从节点会连接到主节点，并进行身份验证。一旦连接建立并验证完成，就会进入下一个阶段。
        - 从机与主机建立连接的三种方式：执行完成后可在客户端使用 info 命令查看服务器的主从信息状态，建立连接的从机客户端可执行 slaveof on one 使从机与主机断开连接
            - 第一种
                - 启动主机
                    - 服务端：./bin/redis-server --port 6382
                    - 客户端：./bin/redis-cli -p 6382
                - 启动从机
                    - 服务端：./bin/redis-server --port 6383
                    - 客户端：./bin/redis-cli -p 6383
                        - 发送连接命令 slaveof localhost 6382
            - 第二种
                - 启动主机
                    - 服务端：./bin/redis-server --port 6382
                    - 客户端：./bin/redis-cli -p 6382
                - 启动从机
                    - 服务端：./bin/redis-server --port 6383 --slaveof localhost 6382
                    - 客户端：./bin/redis-cli -p 6383
            - 第三种
                - 启动主机
                    - 服务端：./bin/redis-server --port 6382
                    - 客户端：./bin/redis-cli -p 6382
                - 启动从机
                    - 服务端：./bin/redis-server --port 6383
                        - 配置文件书写
                            - slaveof localhost 6382
                    - 客户端：./bin/redis-cli -p 6383
    - 数据同步阶段：在这个阶段中，主节点会将自己的数据库状态同步给从节点。从节点会接收主节点发送的快照文件（如果使用的是 RDB 持久化方式）或者增量数据（如果使用 AOF 持久化方式）。当从节点接收到快照文件或者增量数据时，它会将这些数据应用到自己的数据库中。当从节点完成同步后，就会进入下一个阶段。数据同步阶段分为以下两个阶段。
        - 全量复制：master 将所有数据通过生成 RDB 文件通过 socket 发送给 slave
        - 部分复制 (增量复制)：在全量复制阶段可能存在 master 写入数据，此时写入的数据存在复制缓冲区，在执行为全量复制后，master 需要将此部分数据也传输给 slave
    - 命令传播阶段：主节点会将自己接收到的写命令同步给从节点，从节点执行这些命令（增量复制），以保证主节点和从节点的数据一致性。从节点会定期向主节点发送心跳消息，以便主节点检测从节点是否在线。
        - 通过心跳机制检查对方状态是否正常：Redis 的心跳机制是一种保持主从节点之间连接的机制，它通过定期发送 PING 命令并等待 PONG 命令的响应来检测连接的健康状态。在 Redis 的主从复制中，主节点定期向从节点发送 PING 命令。从节点收到 PING 命令后，立即向主节点发送 PONG 命令作为响应。如果主节点收到从节点的 PONG 响应，则认为从节点是健康的，否则主节点认为从节点已下线。

### 主从复制的哨兵机制

- 定义：Sentinel（哨兵）是 Redis 基于主从复制的一种高可用的解决方案（建立在主从复制基础之上的容错方案），由一个或多个 Sentinel 实例组成的 Sentinel 系统可以监视多个主服务器，以及这些主服务器属下的所有从服务器，并且当检测到主服务器宕机时，通过哨兵的投票机制自动将某个从服务器升级为新的主服务器，从而达到集群的正常运转
- 作用
    - 监控
        - master 存活检测、master 与 slave 运行情况检测
    - 通知
        - 当被监控的服务器出现问题时，向其他（哨兵间，客户端）发送通知。
    - 自动故障转移
        - 当 master 宕机时，断开 master 与 slave 连接，选取一个 slave 作为 master，将其他 slave 连接到新的 master，并告知客户端新的服务器地址
- sentinel 主从切换
    1. 在 Redis 集群中，部署一个或多个哨兵进程，每个哨兵进程都会周期性地向 Redis 服务器发送心跳包来检测 Redis 服务器的运行状况。
    2. 当哨兵检测到 Redis 主节点宕机时，它会向其他哨兵发送通知，其他哨兵也会进行检测，当有一定数量的哨兵都检测到主节点宕机时，它们会通过协商选举出一个哨兵来负责执行自动故障转移。
    3. 负责执行自动故障转移的哨兵会将从节点中（该 sentinel 通过轮流与其他 slave 发送信息判断最适合作为 master 的 slave）最优的节点升级为主节点，并通知其他从节点切换到新的主节点上，从而实现高可用性。
- 哨兵
    - 哨兵也是一台 redis 服务器，只是不提供数据服务
    - 通常哨兵配置数量为单数

## 缓存问题

### 缓存雪崩

- 解释：缓存雪崩是指在同一时段大量的缓存 key 同时失效或者 Redis 服务宕机，导致大量请求到达数据库，带来巨大压力。
- 解决方式：
    - key 同时失效
        - 将 redis 的删除策略由到期删除 LRU 改为命中次数删除 LFU
        - 给不同的 Key 的 TTL 添加随机值
            - eg：缓存预热批量导入 key 时添加指定的失效时间 + 随机时间
        - 将 key 的过期时间根据业务添加分类，将过期时间错峰
        - 给业务添加多级缓存
            - eg：浏览器添加缓存，nginx 缓存，jvm 本地缓存
    - redis 服务器宕机
        - 利用 Redis 集群提高服务的可用性
            - eg：redis 的使用主从的 redis 服务器群，添加哨兵机制
        - 给缓存业务添加降级限流策略
            - eg：快速失败拒绝服务

### 缓存击穿

- 解释： 缓存击穿就是某个高热数据缓存过期的瞬间，过期后的第一个该数据的请求会执行缓存重建的过程，与此同时重建完成前其他请求也发起了大量对该数据的数据库访问，导致对数据库服务器造成压力。
- 解决方式：
    - 预先设定，对近期访问可能量大的数据延长过期时间
    - 监控访问量，对近期访问量大的数据延长过期时间
    - 启动定时任务，在高峰期来临前刷新数据有效期
    - 添加多级缓存，并设置不同的过期时间
    - 加分布式锁，使得缓存重建过程只能有一个线程执行，其他线程在某线程缓存重建过程中等待
        - 数据的一致性较好，但可能会出现死锁，性能较差
    - 使用逻辑过期，把 key 作为长期有效，单在 key 中加入一个过期字段，当过期时重建的线程会重新开启新的线程执行重建过程，此时的其他请求直接返回之前未更新的缓存
        - 效能较好，缓存重建过程无需等待，实现相对复杂

### 缓存穿透

- 解释：缓存穿透是指客户端请求的数据在缓存中和数据库中都不存在，数据库无法查出该请求的而结果所以就无法构建缓存，从而这些请求都会打到数据库。通常为黑客攻击服务器的手段。
- 解决方式：
    - 缓存空对象
        - 缺点：
            - 有额外的内存消耗 (可设置 ttl 缓解)
            - 短期的数据不一致性，当该数据库添加该请求的结果到数据库，短期内缓存中的数据仍然为空 (可通过新增数据后修改缓存解决)
    - 布隆过滤
        - 在执行 redis 查询之前添加布隆过滤器，该过滤器只将存在数据结果的请求放行，不存在数据结果的数据直接拒绝 (布隆过滤器中存储的是数据库所有数据的二进制位)
            - 缺点：不一定百分百准确，且存在性能消耗

### 缓存预热

- 解释：缓存预热就是系统启动前，提前将相关频度较高的热点数据直接加载到缓存系统。避免在用户请求的时候，先查询数据库，然后再将数据缓存的问题。
