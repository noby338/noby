---
title: day03 约束、事务、索引、表的设计
icon: write
category:
  - SQL
tag:
  - SQL
sticky: false
star: false
article: true
timeline: true
---

## 约束

- 定义：限制表中的数据，保证添加到数据表中的数据准确和可靠性！凡是不符合约束的数据，插入时就会失败！
  - 如：性别字段只有男和女，年龄只有正整数；
- 约束条件在创建表时可以使用， 也可以修改表的时候添加约束条件
- MySQL 中的 6 大约束：
  - 默认值约束：可以给字段设置默认值，如果在插入数据时不给该字段赋值，那么就采用默认值
  - 非空约束：字段的值不能是 null(可以没值)
  - 唯一约束：字段的值是唯一的，该字段不能出现重复的数据
  - 主键约束：非空+唯一，一般一张表只有一个主键
  - 自增长约束：新插入的数据的值是在前一条数据的基础上自增而来的
  - 外键约束：B 表中的某个字段的值收到 A 表某个字段的值的约束

### 默认值约束

```mysql
-- 1、默认值约束：
create table `user`(
    id int,
    `name` varchar(20),
    gender varchar(20) default '女'
);
insert into `user` VALUES(1,'令狐冲','男');
insert into `user` (id,`name`)VALUE(2,'岳灵珊');-- 当未填写该字段时，该值使用默认值
insert into `user` VALUES(3,'林黛玉',default);-- 当该字段填写默认值时，使用默认值
select * from `user`;


alter table `user` modify hoby varchar(20) default 'nohoby';-- 给字段添加默认值约束
desc `user`;
alter table `user` modify hoby VARCHAR(20);-- 删除默认值约束
```

### 非空约束

```mysql
-- 2、非空约束
drop table if exists `user`;
create table `user`(
    id int,
    `name` varchar(20) not null, -- 非null
    gender varchar(20) default '女'
);
insert into `user` VALUES(1,null,'男'); -- 不可以为null
insert into `user` VALUES(2,'','男'); -- 可以为''

alter table `user` modify hoby varchar(20) not null; -- 添加not null的字段约束
alter table `user` modify hoby varchar(20);-- 删除约束
```

### 唯一约束

```mysql
-- 3、唯一约束
drop table if exists `user`;
create table `user`(
    id int unique, -- 唯一
    `name` varchar(20) not null,
    gender varchar(20) default '女'
);
insert into `user` VALUES(1,'令狐冲','男');
insert into `user` VALUES(1,'岳灵珊','女');-- 将不能添加已存在的id(该字段设置了唯一约束)
SELECT * from `user`;

alter table `user` modify id int unique; -- 添加unique的字段约束
alter table `user` drop index id;-- 删除唯一约束
desc `user`;
```

### 主键约束

- 主键约束 = 非空 + 唯一

```mysql
-- 4、主键约束：通常加在int类型的字段上(id)，一般表都有主键
drop table if exists `user`;
create table `user`(
    id int primary key, -- 主键
    `name` varchar(20) not null,
    gender varchar(20) default '女'
);
desc `user`;
insert into `user` VALUES(1,'令狐冲','男');
insert into `user` VALUES(1,'岳灵珊','女');-- 将不能添加已存在的id(该字段设置了主键约束)
insert into `user` VALUES(null,'岳不群','男');-- 将不能添加null值的id(该字段设置了主键约束)

alter table `user` modify id int primary key; -- 添加primary key的字段约束
alter table `user` drop primary key;-- 删除主键约束
alter table `user` modify id int;-- 删除null约束
```

- 联合主键

  ```sql
  -- 联合主键：将多个字段设置为一个主键
  create table teacher(-- 记录每位老师不同班级学科成绩
      tid INT, -- 工号
  	cid INT, -- 班级编号
  	grade INT,  -- 学科成绩
  	PRIMARY KEY(tid,cid)  -- 联合主键
  );

  insert into teacher values(1001,1,80);
  insert into teacher values(1001,2,90);
  insert into teacher values(1001,2,100);-- 不能插入相同的联合主键
  select * from teacher;
  ```

### 自增长约束

```mysql
-- 5、自增长约束
drop table if exists `user`;
create table `user`(
    id int primary key AUTO_INCREMENT, -- 主键约束、自增长约束
    `name` varchar(20) not null,
    gender varchar(20) default '女'
)AUTO_INCREMENT = 100;-- 设置自增长的起始值为100
desc `user`;
insert into `user` VALUES(1001,'令狐冲','男');
insert into `user` (`name`,gender) VALUE('岳灵珊','女');-- 自增长约束在插入字段值时可根据最大值记录自动增加1
insert into `user` VALUES(default,'岳不群','男');-- 可以填入default，如果第一条记录的di字段值设置为default，则id为默认起始值。
SELECT * FROM `user`;
```

### 外键约束

- 当表中的默认字段的值受到另外一张表中字段值限制时则可以使用外键约束避免数据问题。

```mysql
-- 6、外键约束
drop table if exists `user`;
create table `user`(-- 用户表
    id int primary key AUTO_INCREMENT, -- 主键约束、自增长约束
    `name` varchar(20) not null,
    gender varchar(20) default '女'
)AUTO_INCREMENT = 100;-- 设置自增长的起始值为100
desc `user`;
insert into `user` VALUES(default,'noyb','男');
insert into `user` VALUES(default,'kace','男');
insert into `user` VALUES(default,'july','男');
SELECT * FROM `user`;

drop table if exists house;
create table house(-- 房屋表
    id int primary key AUTO_INCREMENT, -- 主键约束、自增长约束
    `address` varchar(20) not null,
    `uid` int, -- 用户id，值必须为用户表中的id值
    foreign key(`uid`) REFERENCES `user`(id) on update cascade -- 给uid字段添加外键约束，它的值受到user表中的id的约束
    --  on update cascade 当更新父表时同时更新子表
);
desc house; -- mul 外键约束
insert into house VALUES(default,'chengdu',100);
insert into house VALUES(default,'beijing',101);
insert into house VALUES(default,'shanghai',102);
insert into house VALUES(default,'shengzheng',103);
select * from house;

-- 删除外键数据
-- 删除父表的数据前应该先删除掉子表的数据
DELETE from house where id = 1;
DELETE from `user` where id = 100;

-- 更新外键数据
update `user` set id = 2 where id = 102;

```

## 事务

- 事务的作用：事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行

* 存储引擎的概念：在 mysql 中的数据用各种不同的技术存储在文件（或内存）中。这些技术中的每一种技术都使用不同的存储机制，索引技巧，并且最终提供广泛的不同的功能和能力。可以通过选择不同的技术，可以获得额外的速度或功能，从而改善应用的整体功能。这些不同的技术以及配套的相关功能在 mysql 中被称为存储引擎（也称为表类型）。

* 常见引擎：在 mysql 中用的最多的存储引擎有：innodb，bdb，myisam ,memory 等。其中 innodb 和 bdb 支持事务而 myisam 等不支持事务。

  - 指定引擎创建表格：create table 表名(字段......) engine=innodb;

* 事务的 4 大特性(ACID)：

  - 原子性( Atomicity)：原子性是指事务是一个不可再分割的工作单位，事务中的操作要么都发生，要么都不发生
  - 一致性(Consistency)：一致性是指在事务开始之前和事务结束以后，数据库的完整性约束没有被破坏。这是说数据库事务不能破坏关系数据的完整性以及业务逻辑上的一致性。
  - 隔离性(Isolation)：隔离性是指并发的事务是相互隔离的。即一个事务内部的操作及正在操作的数据必须封锁起来，不被企图进行修改的事务看到 。
  - 持久性(Durability)：持久性是指在事务完成以后，该事务所对数据库所作的更改便持久的保存在数据库之中，并不会被回滚。 即使出现了任何事故比如断电等，事务一旦提交，则持久化保存在数据库中。

* 事务的控制语句：

| 语句              | 解释               |
| ----------------- | ------------------ |
| BEGIN             | 显式地开启一个事务 |
| START TRANSACTION | 显式地开启一个事务 |
| COMMIT            | 提交事务           |
| ROLLBACK          | 回滚事务           |

```sql
-- 事务：让执行的多条SQL语句同时失败或成功；

show engines;-- 显示引擎

SELECT * from boy;
delete from boy WHERE gid in(4,5,6,7);
insert into boy values(1004,'周杰伦',4);-- mysql 中如果不提交操作，对表的操作将不会起作用
set autocommit = 0;-- 设置自动提交关闭(可能会临时存在缓存中，但未提交到数据库中),该设置只设置本次数据库操作(下次打开MySQL自动提交会重新开启)
set autocommit = 1;-- 设置自动提交开启
insert into boy values(1006,'乔丹',6);
commit;-- 关闭自动提交后可手动提交


drop table if exists goods;
CREATE TABLE goods(
	id INT,
	`name` VARCHAR(20),
	num INT
);
INSERT INTO goods VALUES(1,'iphone13',10),(2,'mate40',15),(3,'宝马520',10);
drop table if exists `order`;
create table `order` (
    id int,
    gid int,
    num int
);

select * from goods;
select * from `order`;
-- 如果在执行某条SQL时出现问题，那就应该回滚 删除缓存数据，不让这些数据生效
-- 方式一：通过关闭自动提交后，两条语句执行完后，commit上传
set autocommit = 0;-- 关闭自动提交
-- 业务sql
insert into `order` values(1,1,3);-- 购买iphone13 买了3台
update goods set num = num - 3 where id = 1;
commit;-- 手动提交
set autocommit = 1;-- 开启自动提交


-- 方式二：
begin;-- 手动开启事务
-- 业务sql
insert into `order` values(1,1,3);-- 购买3台iphone13，写入一条订单记录
update goods set num = num - 3 where id = 1;-- 修改商品库存
commit;-- 如果业务sql不存在问题，则执行该语句(手动提交，写入sql)
rollback;-- 如果业务sql存在问题，则执行该语句(删除缓存数据，不写入sql)
```

## 索引

- 定义：是一种数据库对象，数据库对象是指能够通过 create 指令创建出来的(database、table、view、index)，索引可以加快搜索速度(增加了 b-tree 结构)
- 以下情况适合添加索引：
  - 字段值绝大多数都是不重复的，b-tree 结构的构成根据数据的区别排列
  - 该字段值基本上改动少，当添加新的节点时，b-tree 的结构就行需要重构
- 当一张表不要添加太多索引，索引会消耗大量资源，

```sql
-- 索引：是一种数据库对象，数据库对象是指能够通过create指令创建出来的(database、table、view、index)
-- 索引可以加快搜索速度



-- 创建表
DROP TABLE IF EXISTS book;
CREATE TABLE book (
   id INT NOT NULL,
   `name` VARCHAR(64) NOT NULL,
   author VARCHAR(32) NOT NULL,
   detail VARCHAR(32) NOT NULL,
   price DOUBLE,
   PRIMARY KEY (id)
)ENGINE = MYISAM ROW_FORMAT = DEFAULT;

-- 创建存储过程
DROP PROCEDURE IF EXISTS BatchInsertBook;
DELIMITER $
CREATE PROCEDURE BatchInsertBook(IN START INT,IN loop_time INT)
BEGIN
 DECLARE Var INT;
 DECLARE ID INT;
 DECLARE bname VARCHAR(20);
 SET Var = 0;
 SET ID= START;
      WHILE Var < loop_time DO
        SET bname = CONCAT('java基础入门',ID);
	INSERT INTO book(id,`name`,author,detail,price)
		VALUES(ID,bname,'zhangsan','这本书主要值针对没有Java基础人员的入门教程',1.23);
       SET ID= ID + 1;
       SET Var = Var + 1;
      END WHILE;
END $

-- 禁用索引，加快数据导入速度
ALTER  TABLE  book  DISABLE  KEYS;

-- 调用存储过程导入200W条数据
CALL BatchInsertBook(1,500000);

-- 添加索引
ALTER  TABLE  book  ENABLE  KEYS;

-- 修改表的引擎为InnoDB
ALTER TABLE book ENGINE INNODB;


```

## 表的设计三范式

- 定义：在对数据库进行设计时为了方便后期代码业务的实现，通常会在设计数据库时遵守一些规范，这些规范称之为范式。

### 第一范式

- 数据表的列不可再分。
- 例如：下表中的选课字段可以再分为对应的学科，所以不满足第一范式

| \*_学号_ | \*_姓名_ | **选课**         |
| -------- | -------- | ---------------- |
| 10001    | 张三     | 数学，语文，英语 |
| 10002    | 李四     | 语文，英语       |
| 10003    | 王五     | 语文，英语，历史 |

### 第二范式

- 满足第一范式的前提下，并且表中非主键列不存在对主键的部分依赖。
- 例如：下表中，学号和课程构成联合主键，成绩同时依赖于学号和课程，但课程学分只依赖于课程(课程是主键的一部分)

| 学号  | 课程 | 成绩 | 课程学分 |
| ----- | ---- | ---- | -------- |
| 10001 | 数学 | 100  | 6        |
| 10001 | 语文 | 90   | 2        |
| 10001 | 英语 | 85   | 3        |
| 10002 | 数学 | 90   | 6        |
| 10003 | 数学 | 99   | 6        |
| 10004 | 语文 | 89   | 2        |

如需满足第二范式，需将表拆分：

学生选课表：

| \*_学号_ | \*_课程_ | **成绩** |
| -------- | -------- | -------- |
| 10001    | 数学     | 100      |
| 10001    | 语文     | 90       |
| 10001    | 英语     | 85       |
| 10002    | 数学     | 90       |
| 10003    | 数学     | 99       |
| 10004    | 语文     | 89       |

课程信息表：

| \*_课程_ | **课程学分** |
| -------- | ------------ |
| 数学     | 6            |
| 语文     | 3            |
| 英语     | 2            |

### 第三范式

- 满足第二范式的同时，表中的列不存在对非主键列的传递依赖。
- 例如：下面的学生信息表，虽然满足第二范式，所有字段都依赖主键（学号），但是，表中存在一个传递依赖，(学号）->(班级）->（班主任）。也就是说，（班主任）这个非主键列依赖于另外一个非主键列 （班级）。所以不符号第三范式。

| \*_学号_ | \*_姓名_ | \*_性别_ | \*_班级_ | **班主任** |
| -------- | -------- | -------- | -------- | ---------- |
| 10001    | 张三     | 男       | 一班     | 小王       |
| 10002    | 李四     | 男       | 一班     | 小王       |
| 10003    | 王五     | 男       | 二班     | 小李       |
| 10004    | 张小三   | 男       | 二班     | 小李       |

如需满足第三范式，需将表拆分：

学生信息表：

| \*_学号_ | \*_姓名_ | \*_性别_ | **班级** |
| -------- | -------- | -------- | -------- |
| 10001    | 张三     | 男       | 一班     |
| 10002    | 李四     | 男       | 一班     |
| 10003    | 王五     | 男       | 二班     |
| 10004    | 张小三   | 男       | 二班     |

班级信息表：

| \*_班级_ | **班主任** |
| -------- | ---------- |
| 一班     | 小王       |
| 二班     | 小李       |
