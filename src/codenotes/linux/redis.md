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

### redis 的安装

- 使用压缩包安装
  1. 解压到/usr/local/src/redis
  2. 根据已经存在的 makefile 执行安装命令: `make install PREFIX=/usr/local/redis`。安装到指定目录
- 可执行文件位置为 bin
- 配置文件位于 conf

  - 该配置文件来自于安装解压包中的 redis.conf 文件
  - 配置文件的配置

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

- log 日志与持久化文件(dump.rdb/appendonly.aof)位于 data

### redis 的启动

- ./bin/redis-server ./conf/redis-6379.conf

### redis 的持久化

- RDB（redis database）快照：将当前数据状态进行保存，快照形式，存储数据结果，存储格式简单，关注点在数据
  - 执行的时机
    - 持久化执行时机为使用持久化指令，或者关闭 redis 之前(正常关闭 redis，意外关机、宕机不可以)
    - 数据的恢复执行时机为启动 redis 时
  - 通过指令命令 redis 执行
    - 两种指令
      - save
        - save 指令的执行会阻塞当前 Redis 服务器，直到当前 RDB 过程完成为止，有可能会造成长时间阻塞，线上环境不建议使用。
      - bgsave
        - bgsave 命令是针对 save 阻塞问题做的优化。Redis 内部所有涉及到 RDB 操作都建议采用 bgsaeve 的方式，save 命令可以放弃使用。
    - 两种指令的区别

| 方式             | save 指令 | bgsave 指令(save 配置) |
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
- AOF(append only file)日志：将数据的操作过程进行保存，日志形式，存储操作过程，存储格式复杂，关注点在数据的操作过程
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
  - 存储速度：RDB 数据量小的时快，数据量变大将非常慢(每次都需要备份所有的数据)，AOF 存储速度相对较快(每次只需要追加新的指令)
  - 恢复速度：RDB 直接复制结果数据，相对较快，AOF 通过执行指令的方式恢复，相对较慢
  - 数据安全性：RDB 因存储的速度慢的原因，设置自动存储的时间间隔相对较长因此丢失的数据相对较多，AOF 因存储速度相对快，时间间隔短，因此丢失的数据相对较少
  - 资源消耗：RDB bgsave 指令执行 fork 操作创建子进程过程消耗资源相对较多，AOF 相对较少
  - 兼容性：RDB 有可能出现各 redis 版本服务之间数据格式无法兼容现象，AOF 则不存在
  - 启动优先级：RDB 优先级较低，AOF 优先级较高
