---
title: day03 MongoDB 数据库
icon: write
category:
    - SQL
tag:
    - SQL
    - MongoDB
sticky: false
star: false
article: true
timeline: true
---

## 数据库结构

- 库
    - 集合
        - 文档
- 默认的库
    - admin
        - 用户和权限
    - local
        - 在集群模式下，该库的集合不会复制
    - config
        - 分片设置
- 默认端口号 27017

## 命令

### 库

```json
// 使用数据库，如果不存在立即创建并切换，存储机制分为内存和磁盘，使用use存放在内存中，还没有在磁盘中，当库中存在集合时，才会自动持久化到磁盘
use articledb
// 显示当前使用的数据库
db
// 查看当前的所有库
show dbs
// 删除当前数据库
db.dropDatabase()

```

### 集合

```json
// 显式创建集合
db.createClollection("comment")
// 显示集合
show collections
// 删除指定集合
db.user.drop()
```

### 文档

```json
// 文档的插入，隐式创建集合 comment
db.comment.insert({"articleid":"100000","content":"今天天气真好，阳光明媚","userid":"1001","nickname":"Rose","createdatetime":new Date(),"likenum":NumberInt(10),"state":null})

// 多条文档的插入
db.comment.insertMany([{"_id":"1","articleid":"100001","content":"我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我他。","userid":"1002","nickname":"相忘于江湖","createdatetime":new Date("2019-08- 05T22:08:15.522Z"),"likenum":NumberInt(1000),"state":"1"},{"_id":"2","articleid":"100002","content":"我夏天空腹喝凉开水，冬天喝温开水","userid":"1005","nickname":"伊人憔悴","createdatetime":new Date("2019-08-05T23:58:51.485Z"),"likenum":NumberInt(888),"state":"1"},{"_id":"3","articleid":"100003","content":"我一直喝凉开水，冬天夏天都喝。","userid":"1004","nickname":"杰克船长","createdatetime":new Date("2019-08-06T01:05:06.321Z"),"likenum":NumberInt(666),"state":"1"},{"_id":"4","articleid":"100004","content":"专家说不能空腹吃饭，影响健康。","userid":"1003","nickname":"凯撒","createdatetime":new Date("2019-08-06T08:18:35.288Z"),"likenum":NumberInt(2000),"state":"1"},{"_id":"5","articleid":"100005","content":"研究表明，刚烧开的水千万不能喝，因为烫嘴。","userid":"1003","nickname":"凯撒","createdatetime":new Date("2019-08- 06T11:01:02.521Z"),"likenum":NumberInt(3000),"state":"1"}]);


// try-catch(当插入多条数据中有一条失败时，其他成功的文档不会回滚，使用try-catch可以回滚)(这里的"_id":"2"这条数据重复，会插入失败)
try{
db.comment.insertMany([{"_id":"6","articleid":"100001","content":"我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我他。","userid":"1002","nickname":"相忘于江湖","createdatetime":new Date("2019-08- 05T22:08:15.522Z"),"likenum":NumberInt(1000),"state":"1"},{"_id":"2","articleid":"100002","content":"我夏天空腹喝凉开水，冬天喝温开水","userid":"1005","nickname":"伊人憔悴","createdatetime":new Date("2019-08-05T23:58:51.485Z"),"likenum":NumberInt(888),"state":"1"},{"_id":"7","articleid":"100003","content":"我一直喝凉开水，冬天夏天都喝。","userid":"1004","nickname":"杰克船长","createdatetime":new Date("2019-08-06T01:05:06.321Z"),"likenum":NumberInt(666),"state":"1"}])
} catch(e) { 
print(e);
}
// 覆盖修改更新一条数据
db.comment.update({_id:"1"},{likenum:NumberInt(1001)})

// 局部修改
db.comment.update({_id:"2"},{$set:{likenum:NumberInt(889)}})

// 修改多条数据
db.comment.update({"userid":"1003"},{$set:{"nickname":"凯斯"}},{multi:true})

// 自增长修改
db.comment.update({_id:"1"},{$inc:{likenum:NumberInt(1)}})

// 删除多条数据
db.comment.remove({"nickname":"凯斯"})

// 查询
// 统计符合条件的文档数量
db.comment.count({_id:"1"})

// 文档的多查询
db.comment.find({})
db.comment.find({"articleid":"100005"})

// 文档的单查询
db.comment.findOne({"nickname":"凯撒"})

// 投影查询，显示部分指定的字段(默认显示_id字段)
db.comment.find({},{"articleid":1})v
// 分页查询，每页2条，跳过前4条
db.comment.find().limit(2).skip(4)

// 查询结果排序，1为升序，-1为降序
db.comment.find().sort({userid:1})

// 正则表达式查询
db.comment.find({content:/^专家/})

// 比较查询，$gt,$lt,$gte,$lte
db.comment.find({likenum:{$gt:NumberInt(700)}})

// 包含查询，不包含 $nin
db.comment.find({userid:{$in:["1003","1004"]}})

// 条件查询，$and,$or
db.comment.find({$and:[{likenum:{$gte:NumberInt(700)}},{likenum:{$lt:NumberInt(2000)}}]})
```

### 索引

```json
// 查询某集合的所有索引，_id是所有集合的默认的索引
db.comment.getIndexes()

// 索引的创建，1表示升序索引，-1表示倒序索引
// 单字段索引
db.comment.createIndex({userid:1})
// 复合索引
db.comment.createIndex({userid:1,nickname:-1})

// 删除索引
// 删除指定索引
db.comment.dropIndex({userid:1})
// 删除全部索引
db.comment.dropIndexes()

// 查看执行计划(是否用上了索引，使用索引为"stage":"collscan"，不使用索引为"stage":"fetch")
db.comment.find({userid:"1003"}).explain()

// 

// 

```
