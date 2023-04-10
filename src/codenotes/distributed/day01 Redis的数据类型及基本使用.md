---
title: day01 Redis的数据类型及基本使用
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

- Redis（全称：Remote Dictionary Server，即远程字典服务器）是一种开源的、高性能的非关系型（NoSQL）内存数据存储系统，也被称为数据结构服务器。Redis 支持多种数据结构，包括字符串（String）、哈希表（Hash）、列表（List）、集合（Set）、有序集合（Sorted Set）等，可以用于缓存、消息队列、实时统计分析、排行榜、计数器等各种场景。
- Redis 的特点包括：

- 内存存储：Redis 将数据存储在内存中，读写速度非常快。同时，Redis 还提供了数据持久化的机制，可以将内存中的数据保存到磁盘上，以保证数据的安全性和可靠性。
- 多种数据结构：Redis 支持多种数据结构，如字符串、哈希表、列表、集合、有序集合等，这些数据结构在不同的场景下都有各自的优势和应用。
- 多种应用场景：由于 Redis 的高性能、丰富的数据结构和灵活的应用方式，它可以应用于缓存、消息队列、实时统计分析、排行榜、计数器等各种场景。
- 支持分布式：Redis 提供了分布式锁、分布式集群等机制，可以方便地实现高可用、高可靠的分布式系统。
- 总的来说，Redis 是一种高性能、可扩展、多功能的数据存储系统，被广泛应用于各种互联网应用和企业系统中。

### 特征

- 数据间没有必然的关联关系
- 内部采用单线程机制进行工作
- 高性能。官方提供测试数据，50 个并发执行 100000 个请求,读的速度是 110000 次/s,写的速度是 81000 次/s。
- 多数据类型支持
  - 字符串类型 string
  - 列表类型 list
  - 散列类型 hash
  - 集合类型 set
  - 有序集合类型 sorted_set
- 持久化支持。可以进行数据灾难恢复

### 应用场景

- 为热点数据加速查询（主要场景），如热点商品、热点新闻、热点资讯、推广类等高访问量信息等
- 任务队列，如秒杀、抢购、购票排队等
- 即时信息查询，如各位排行榜、各类网站访问统计、公交到站信息、在线人数信息（聊天室、网站）、设备信号等
- 时效性信息控制，如验证码控制、投票控制等
- 分布式数据共享，如分布式集群架构中的 session 分离
- 消息队列
- 分布式锁

## 数据类型及使用

- 5 中常用的数据类型
  - string String
  - hash HashMap
  - list LinkedList
  - set HashSet
  - sorted_set TreeSet

### key 的通用操作

- 基本操作
  - 删除指定 key
    - del key
  - 获取 key 是否存在
    - exists key
  - 获取 key 的类型
    - type key
- 时效性操作
  - 为指定 key 设置有效期
    - expire key seconds
    - pexpire key milliseconds
    - expireat key timestamp
    - pexpireat key milliseconds-timestamp
  - 获取 key 的有效时间
    - ttl key(获取的为秒，若为永久有效返回-1，已过期返回-2)
    - pttl key(获取的为毫秒)
  - 切换 key 从时效性转换为永久性
    - persist key
- 查询符合条件的 key
  - keys pattern(pattern 为通配符，\*表示任意个数任意字符，?表示一个任意字符，`[]`表示其中的一个字符)
- 其他操作
  - 为 key 改名
    - rename key newkey(若新的名称已存在，使用 newkey 的老 key 将会被使用 newkey 的新 key 代替)
    - renamenx key newkey(若新的名称不存在才可更改)
  - 对所 key 排序`[逆序]`(只可排序 list、set、zset 返回的结果为排序的结果，并不会影响原列表)
    - sort key `[desc]`
  - 其他 key 通用操作
    - help @generic
- db 的操作
  - 切换数据库(redis 一共有 0~15 个库)
    - select index
- 其他操作
  - quit 退出客户端
  - ping 测试客户端和服务端的通信(正常返回 pong)
  - echo message 日志输出 message
- 数据移动到指定库
  - move key db
- 数据清除
  - dbsize 查看当前库的大小
  - flushdb 清除当前库的所有数据
  - flushall 清除所有库的所有数据

### string

- 添加/修改数据(返回值为 ok)
  - set key value
- 获取数据
  - get key
- 删除数据(返回值为 0 或 1)
  - del key
- 添加/修改多个数据(返回值为 ok)：对于多数据操作而言，一次性操作的数据过少，指令传输过程消耗的时间将增加。一次性操作的数据过多，redis 的单线程机制会使指令执行过程会容易造成阻塞。
  - mset key1 valuel key2 value2
- 获取多个数据(返回值为数组)
  - mget key1 key2
- 获取字符串长度
  - strlen key
- 追加信息到原始信息后部(返回值为添加后的长度)
  - append key value
- 设置数值数据增加指定范围的值：执行的过程为，将 String 转换为 int，增加 increment，再返回
  - incr key
  - incrby key increment
  - incrbyfloat key increment
- 设置数值数据减少指定范围的值
  - decr key
  - decrby key increment
- 设置数据具有指定的生命周期
  - setex key seconds value
  - psetex key milliseconds value
- 数据库中的热点数据 key 的命名惯例方式
  - 方式 1：属性值
    - 表名：主键名：主键值：字段名
    - `eg1: student:id:101:name noby`
    - `eg2: student:id:101:age 20`
  - 方式 2：json
    - 表名：主键名：主键值
    - `eg1: student:id:101 {name:noby,age:20}`

### hash

- 添加/修改数据
  - hset key field value
- 获取数据
  - hget key field
  - hgetall key
- 删除数据
  - hdel key field1
- 添加/修改多个数据
  - hmset key field1 valuel field2 value2 ..
- 获取多个数据
  - hmget key field1 field2 ..
- 获取哈希表中字段的数量
  - hlen key
- 获取哈希表中是否存在指定的字段
  - hexists key field
- 获取哈希表中所有的字段名或字段值
  - hkeys key
  - hvals key
- 设置指定字段的数值数据增加指定范围的值
  - hincrby key field increment
  - hincrbyfloat key field increment
- 不存在时添加数据，存在时不执行操作
  - hsetnx key field value
- 注意事项：
- hash 类型下的 value 只能存储字符串，不允许存储其他数据类型，不存在嵌套现象。如果数据未获取到，对应的值为（nil）
- 每个 hash 可以存储 2 32 - 1 个键值对
- hash 类型十分贴近对象的数据存储形式，并且可以灵活添加删除对象属性。但 hash 设计初衷不是为了存储大量对象而设计的，切记不可滥用，更不可以将 hash 作为对象列表使用
- hgetall 操作可以获取全部属性，如果内部 field 过多，遍历整体数据效率就很会低，有可能成为数据访问瓶颈

### list

- 添加/修改数据(l 代表 left，r 代表 right)
  - lpush key valuel `[value2]`...
  - rpush key valuel `[value2]`...
- 获取数据(l 代表 lish，-1 索引可代表最后一个，-2 代表倒数第二个)
  - lrange key start stop
  - lindex key index
  - llen key
- 获取并移除数据(当 push 和 pop 都为同一方向时为队列结构，不同为栈结构)
  - 1pop key
  - rpop key
- 规定时间内获取并移除数据
  - blpop key1 `[key2]`... timeout
  - brpop key1 `[key2]`... timeout
- 移除指定数据(count 表示数量，value 表示左边起第一个该 value 值为起始的位置)
  - lrem key count value
- 注意
- list 中保存的数据都是 string 类型的，数据总容量是有限的，最多 2 32 - 1 个元素 (4294967295)。
- list 具有索引的概念，但是操作数据时通常以队列的形式进行入队出队操作，或以栈的形式进行入栈出栈操作
- 获取全部数据操作结束索引设置为-1
- list 可以对数据进行分页操作，通常第一页的信息来自于 list，第 2 页及更多的信息通过数据库的形式加载

### set

- 添加数据
  - sadd key member1 `[member2]`...
- 获取全部数据
  - smembers key
- 删除数据
  - srem key memberl `[member2]`...
- 获取集合数据总量
  - scard key
- 判断集合中是否包含指定数据
  - sismember key member
- 随机获取集合中指定数量的数据
  - srandmember key `[count]`
- 随机获取集合中指定数量的数据，并将该数据移出集合
  - spop key `[count]`
- 求两个集合的交、并、差集
  - sinter key1 `[key2]`
  - sunion key1 `[key2]`
  - sdiff key1 `[key2]`
- 求两个集合的交、并、差集并存储到指定集合中
  - sinterstore destination key1 `[key2]`
  - sunionstore destination key1 `[key2]`
  - sdiffstore destination keyl `[key2]`
- 将指定数据从原始集合中移动到目标集合中
  - smove source destination member
- 注意
- set 类型不允许数据重复，如果添加的数据在 set 中已经存在，将只保留一份
- set 虽然与 hash 的存储结构相同，但是无法启用 hash 中存储值的空间

### sorted_set

- 添加数据
  - zadd key scorel memberl `[score2 member2]`
- 获取全部数据
  - zrange key start stop `[WITHSCORES]`
  - zrevrange key start stop `[WITHSCORES]`
- 删除数据
  - zrem key member `[member ..]`
- 按条件获取数据
  - zrangebyscore key min max `[WITHSCORES]` `[LIMIT]`
  - zrevrangebyscore key max min `[WITHSCORES]`
- 条件删除数据
  - zremrangebyrank key start stop
  - zremrangebyscore key min max
- 获取集合数据总量
  - zcard key
  - zcount key min max
- 集合交、并操作
  - zinterstore destination numkeys key `[key ..]`
  - zunionstore destination numkeys key `[key ..]`
- 获取数据对应的索引（排名）
  - zrank key member
  - zrevrank key member
- score 值获取与修改
  - zscore key member
  - zincrby key increment member
- 注意
- min 与 max 用于限定搜索查询的条件
- start 与 stop 用于限定查询范围，作用于索引，表示开始和结束索引
- offset 与 count 用于限定查询范围，作用于查询结果，表示开始位置和数据总量
- score 保存的数据存储空间是 64 位，如果是整数范围是-9007199254740992~9007199254740992
- score 保存的数据也可以是一个双精度的 double 值，基于双精度浮点数的特征，可能会丢失精度，使用时候要慎重
- sorted_set 底层存储还是基于 set 结构的，因此数据不能重复，如果重复添加相同的数据，score 值将被反复覆盖，保留最后一次修改的结果



