---
title: redis
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
### redis的安装

* 使用压缩包安装
  1. 解压到/usr/local/src/redis
  2. 根据已经存在的makefile执行安装命令: `make install PREFIX=/usr/local/redis`。安装到指定目录

* 可执行文件位置为bin

* 配置文件位于conf

  * 该配置文件来自于安装解压包中的redis.conf文件

  * 配置文件的配置

    ```conf
    #模块化配置，使用该处的公共配置文件(来自解压包的复制)，与该处不同的配置写入当前的个性文件
    include /usr/local/redis/conf/redis.conf
    #ip为所有的ip均可访问，默认配置文件中的bind 127.0.0.1 -::1表示只允许本机访问
    bind 0.0.0.0 -::1
    port 6379
    requirepass 123
    #使用后台守护式启动
    daemonize yes
    #日志名
    logfile "6379.log"
    #日志及数据持久化文件位置
    dir /usr/local/redis/data
    #启动redis以后存储当前进程进程编号的信息文件
    pidfile /var/run/redis_6379.pid
    
    #rdb数据持久化文件名
    dbfilename dump-6379.rdb
    #设置rdb持久化存储至本地数据库时是否压缩数据，默认为 yes，采用 LZF 压缩，
    rdbcompression yes
    #设置是否进行RDB文件格式校验，该校验过程在写文件和读文件过程均进行，默认为yes
    rdbchecksum yes
    #rdb持久化自动执行的条件，60秒之内有20个数据发生变化(增删改)将执行持久化
    save 60 20
    
    #开启AOF持久化
    appendonly yes
    #AOF持久化文件名
    appendfilename appendonly-6379.aof
    #设置AOF持久化的周期为每秒appendfsync always|everysec|no
    appendfsync everysec
    ```

* log日志与持久化文件(dump.rdb/appendonly.aof)位于data

### Redis的持久化

* RDB（redis database）快照：将当前数据状态进行保存，快照形式，存储数据结果，存储格式简单，关注点在数据

  * 执行的时机

    * 持久化执行时机为使用持久化指令，或者关闭redis之前(正常关闭redis，意外关机、宕机不可以)
    * 数据的恢复执行实际为启动redis时

  * 通过指令命令redis执行

    * 两种指令

      * save
        * save指令的执行会阻塞当前Redis服务器，直到当前RDB过程完成为止，有可能会造成长时间阻塞，线上环境不建议使用。
      * bgsave
        * bgsave命令是针对save阻塞问题做的优化。Redis内部所有涉及到RDB操作都建议采用bgsa
          ve的方式，save命令可以放弃使用。

    * 两种指令的区别

      | 方式             | save指令 | bgsave指令(save配置) |
      | ---------------- | -------- | -------------------- |
      | 读写             | 同步     | 异步                 |
      | 阻塞客户端的指令 | 是       | 否                   |
      | 额外的内存消耗   | 否       | 是                   |
      | 启动新进程       | 否       | 是                   |

  * 配置方式Redis自动执行

    * 在配置server的配置文件中指定 save second changes 即可使 redis 自动持久化，在second时间内改变changes次即自动执行bgsave操作

  * RDB的优缺点

    * RDB优点
      * RDB是一个紧凑压缩的二进制文件，存储效率较高
      * RDB内部存储的是rdis在某个时间点的数据快照，非常适合用于数据备份，全量复制等场景
      * RDB恢复数据的速度要比AOF快很多
    * Rdb缺点
      * RDB方式无论是执行指令还是利用配置，无法做到实时持久化，具有较大的可能性丢失数据
      * bgsave指令每次运行要执行fork操作创建子进程，要牺牲掉一些性能
      * Redis的众多版本中未进行RDB文件格式的版本统一，有可能出现各版本服务之间数据格式无法兼容现象

  * 应用：服务器中每X小时执行bgsave备份，并将RDB文件拷贝到远程机器中，用于灾难恢复。

* AOF(append only file)日志：将数据的操作过程进行保存，日志形式，存储操作过程，存储格式复杂，关注点在数据的操作过程

  * 配置方式Redis自动执行
    * 在配置server的配置文件中指定 appendonly yes|no 即可开启或关闭AOF，配置appendfsync always|everysec|no即可指定执行的周期
      * always：每次写入操作均同步到AOF文件中，数据零误差，性能较低，不建议使用。
      * everysec：每秒将缓冲区中的指令同步到AO「文件中，数据准确性较高，性能较高，建议使用，也是默认配置
      * no：由操作系统控制每次同步到AOF文件的周期，整体过程不可控
  * AOF的重写操作
    * 定义：AOF记录的为所有的操作流程，但是存在部分流程不需要记录的场景，例如：set name noby，set name kace，AOF其实只需记录最后一个set即可，简单说就是将对同一个数据的若干个条命令执行结果转化成最终结果数据对应的指令进行记录。这种方式叫做AOF的重写
    * 作用
      * 降低磁盘占用量，提高磁盘利用率
      * 提高持久化效率，降低持久化写时间，提高IO性能
      * 降低数据恢复用时，提高数据恢复效率
    * 重写的策略
      * 进程内已超时的数据不再写入文件
      * 忽略无效指令，重写时使用进程内数据直接生成，这样新的AOF文件只保留最终数据的写入命令
      * 对同一数据的多条写命令合并为一条命令
    * 重写的方式
      * 手动重写
        * 指令
          * bgrewriteaof
      * 自动重写
        * 指令
          * auto-aof-rewrite-min-size size
          * auto-aof-rewrite-percentage percentage
        * 自动重写触发条件设置
          * auto-aof-rewrite-min-size size
          * auto-aof-rewrite-percentage percent
        * 自动重写触发比对参数（运行指令info Persistence获取具体信息）
          * aof_current_size
          * aof_base_size
        * 自动重写触发条件
          * aof_current_size>auto-aof-rewrite-min-size
          * aof_current_size-aof_base_size/aof_base_size=auto-aof-rewrite-percentage

* 两种持久化方式的对比

  * 占用存储空间：RDB存储的是压缩后的数据，AOF存储的是重写后的命令，占用的存储空间AOF较多
  * 存储速度：RDB数据量小的时快，慢数据量变大将非常慢(每次都需要备份所有的数据)，AOF存储速度相对较快(每次只需要追加新的指令)
  * 恢复速度：RDB直接复制结果数据，相对较快，AOF通过执行指令的方式恢复，相对较慢
  * 数据安全性：RDB因存储的速度慢的原因，设置自动存储的时间间隔相对较长因此丢失的数据相对较多，AOF因存储速度相对快，时间间隔短，因此丢失的数据相对较少
  * 资源消耗：RDB bgsave指令执行fork操作创建子进程过程消耗资源相对较多，AOF相对较少
  * 兼容性：RDB 有可能出现各redis版本服务之间数据格式无法兼容现象，AOF则不存在
  * 启动优先级：RDB优先级较低，AOF优先级较高

### redis的事务

* 开启事务
  * multi
    * 设定事务的开启位置，此指令执行后，后续的所有指令均加入到事务中
* 执行事务
  * exec
    * 设定事务的结束位置，同时执行事务，执行完事务之后销毁掉事务队列。与multi成对使用
    * 注意：加入事务的命令暂时进入到任务队列中，并没有立即执行，只有执行exec命令才开始执行
* 取消事务
  * discard
    * 销毁掉事务队列，终止当前事务的定义，发生在multi之后，exec之前
* 事务锁
  * watch keyl [key2......]
    * watch指令在multi指令之前，对key添加监视锁，在执行exec前如果key发生了变化，终止事务执行
  * unwatch
    * 取消对所有key的监视
* 分布式事务
  * 步骤：
    1. setnx lock-key value 使用setnx设置一个公共锁
    2. pexpire lock-key milliseconds 使用 expire 为锁key添加时间限定，到时不释放，放弃锁(避免异常不释放锁)
    3. del lock-key 释放锁

### redis的主从复制

* 结构
  *  主机master:
    * 写数据
    * 执行写操作时，将出现变化的数据自动同步到slave
    * 读数据（可忽略）
  * 从机slave:
    * 读数据
    * 写数据（禁止）

* 优点
  * 读写分离：master写、slave读，提高服务器的读写负载能力
  * 负载均衡：基于主从结构，配合读写分离，由slave分担master负载，并根据需求的变化，改变slave的数量，通过多个从节点分担数据读取负载，大大提高Redis服务器并发量与数据吞吐量
  * 故障恢复：当master出现问题时，由slave提供服务，实现快速的故障恢复
  * 数据冗余：实现数据热备份，是持久化之外的一种数据冗余方式
  * 高可用基石：基于主从复制，构建哨兵模式与集群，实现Redis的高可用方案
* 主从复制的三个阶段
  * 建立连接阶段（即准备阶段）
    * 从机与主机建立连接的三种方式：执行完成后可在客户端使用info命令查看服务器的主从信息状态，建立连接的从机客户端可执行slaveof on one 使从机与主机断开连接
      * 第一种
        * 启动主机
          * 服务端：./bin/redis-server --port 6382
          * 客户端：./bin/redis-cli -p 6382
        * 启动从机 
          * 服务端：./bin/redis-server --port 6383
          * 客户端：./bin/redis-cli -p 6383
            * 发送连接命令 slaveof localhost 6382
      * 第二种
        * 启动主机
          * 服务端：./bin/redis-server --port 6382
          * 客户端：./bin/redis-cli -p 6382
        * 启动从机 
          * 服务端：./bin/redis-server --port 6383 --slaveof localhost 6382
          * 客户端：./bin/redis-cli -p 6383
      * 第三种
        * 启动主机
          * 服务端：./bin/redis-server --port 6382
          * 客户端：./bin/redis-cli -p 6382
        * 启动从机 
          * 服务端：./bin/redis-server --port 6383
            * 配置文件书写
              * slaveof localhost 6382
          * 客户端：./bin/redis-cli -p 6383
  * 数据同步阶段
    * 全量复制：master将所有数据通过生成RDB文件通过socket发送给slave
    * 部分复制(增量复制)：在全量复制阶段可能存在master写入数据，此时写入的数据存在复制缓冲区，在执行为全量复制后，master需要将此部分数据也传输给slave
  * 命令传播阶段
    * 通过心跳机制检查对方状态是否正常

### redis的哨兵机制

* 定义：Sentinel（哨兵）是Redis 对于主从环境的一种高可用性解决方案，由一个或多个Sentinel实例组成的Sentinel 系统可以监视多个主服务器，以及这些主服务器属下的所有从服务器，并且当检测到主服务器宕机时，通过哨兵的投票机制自动将某个从服务器升级为新的主服务器，从而达到集群的正常运转
* 作用
  * 监控
    * master存活检测、master与slave运行情况检测
  * 通知
    * 当被监控的服务器出现问题时，向其他（哨兵间，客户端）发送通知。
  * 自动故障转移
    * 当master宕机时，断开master与slave连接，选取一个slave作为master，将其他slave连接到新的master，并告知客户端新的服务器地址
* sentinel主从切换
   	1. 数量超过一半的sentinel检测到master宕机
   	2. 内部所有的sentinel通过投票机制推选出一个处理主从从切换sentinel
   	3. 该sentinel通过轮流与其他slave发送信息判断最适合作为master的slave
* 哨兵
  * 哨兵也是一台redis服务器，只是不提供数据服务
  * 通常哨兵配置数量为单数

### 缓存预热

* 解释：缓存预热就是系统启动前，提前将相关频度较高的热点数据直接加载到缓存系统。避免在用户请求的时候，先查询数据库，然后再将数据缓存的问题！用户直接查询事先被预热的缓存数据！

### 缓存雪崩

* 解释：缓存雪崩是指在同一时段大量的缓存key同时失效或者Redis服务宕机，导致大量请求到达数据库，带来巨大压力。
* 解决方式：
  * key同时失效
    * 将redis的删除策略由到期删除LRU改为命中次数删除LFU
    * 给不同的Key的TTL添加随机值
      * eg：缓存预热批量导入key时添加指定的失效时间+随机时间
    * 将key的过期时间根据业务添加分类，将过期时间错峰
    * 给业务添加多级缓存
      * eg：浏览器添加缓存，nginx缓存，jvm本地缓存
  * redis服务器宕机
    * 利用Redis集群提高服务的可用性
      * eg：redis的使用主从的redis服务器群，添加哨兵机制
    * 给缓存业务添加降级限流策略
      * eg：快速失败拒绝服务

### 缓存击穿

* 解释： 缓存击穿就是某个高热数据缓存过期的瞬间，过期后的第一个该数据的请求会执行缓存重建的过程，与此同时重建完成前其他请求也发起了大量对该数据的数据库访问，导致对数据库服务器造成压力。
* 解决方式：
  * 预先设定，对近期访问可能量大的数据延长过期时间
  * 监控访问量，对近期访问量大的数据延长过期时间
  * 启动定时任务，在高峰期来临前刷新数据有效期
  * 添加多级缓存，并设置不同的过期时间
  * 加分布式锁，使得缓存重建过程只能有一个线程执行，其他线程在某线程缓存重建过程中等待
    * 数据的一致性较好，但可能会出现死锁，性能较差
  * 使用逻辑过期，把key作为长期有效，单在key中加入一个过期字段，当过期时重建的线程会重新开启新的线程执行重建过程，此时的其他请求直接返回之前未更新的缓存
    * 效能较好，缓存重建过程无需等待，实现相对复杂

### 缓存穿透

* 解释：缓存穿透是指客户端请求的数据在缓存中和数据库中都不存在，数据库无法查出该请求的而结果所以就无法构建缓存，从而这些请求都会打到数据库。通常为黑客攻击服务器的手段。
* 解决方式：
  * 缓存空对象
    * 缺点：
      * 有额外的内存消耗(可设置ttl缓解)
      * 短期的数据不一致性，当该数据库添加该请求的结果到数据库，短期内缓存中的数据仍然为空(可通过新增数据后修改缓存解决)
  * 布隆过滤
    * 在执行redis查询之前添加布隆过滤器，该过滤器只将存在数据结果的请求放行，不存在数据结果的数据直接拒绝(布隆过滤器中存储的是数据库所有数据的二进制位)
      * 缺点：不一定百分百准确，且存在性能消耗

