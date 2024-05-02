---
title: day02 MySql语法
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

## MySQL 概念

- Structured Query Language 结构化查询语言
- MySQL 默认库

| 数据库名           | 解释                                       |
| ------------------ | ------------------------------------------ |
| information schema | 数据库元数据，基础数据                     |
| mysql              | 配置数据库，其中包含用户信息（账户、密码） |
| performance schema | 运行数据，日志文件，运行情况               |
| test               | 测试数据库                                 |

- SQL 工业化标准：使用 SQL 工业化标准做出来的 sql 语句，可以操作任何数据库，通用
- 常见的数据类型
    - 字符串：
        - char 类型的字段在数据存储时，会被预先分配固定长度的空间，每个 char 类型的字段的长度都是固定的，查询时效率较高。但如果存储的数据长度小于字段长度，则会使用空格等字符来填充多余的空间，可能会浪费一些存储空间。
        - varchar 类型的字段不会预先分配固定长度的空间，而是根据存储的数据长度动态分配存储空间，如果存储的数据长度变化，它也能动态调整存储空间，因此可以更有效地使用存储空间。但是，由于 varchar 类型的字段需要在查询时动态计算长度，因此在某些情况下会影响查询效率。
        - 因此，在选择使用 char 还是 varchar 类型时，应该根据存储数据的特点和查询的需求来选择。如果需要存储的数据长度相对固定，且查询时需要高效率，应该选择 char 类型；如果需要存储的数据长度较为灵活，且存储空间的使用需要更加灵活，应该选择 varchar 类型。

  ```sql
  char ： 定长字符串。
  	优点：存储性能高
  	缺点：浪费空间
  	eg ： name char(10)  如果存储的数据字符个数不足10个，也会占10个的空间，可以不定义长度（默认为1），最多 255 个字符，超过10会报错。
  varchar ： 变长字符串。
  	优点：节约空间
  	缺点：存储性能底
  	eg ： name varchar(10) 如果存储的数据字符个数不足10个，那就数据字符个数是几就占几个的空间，不能不定义长度，最多 65535 个字符，超过10会报错。
  ```

| 类型         | 解释                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| float        | 浮点型                                                                                                  |
| double       | 双精度类型                                                                                              |
| decimal(5,2) | 小数类型                                                                                                |
| tinytext     | 存放最大长度为 255 个字符的字符串                                                                       |
| text         | 存放最大长度为 65,535 个字符的字符串                                                                    |
| mediumtext   | 存放最大长度为 16,777,215 个字符的字符串                                                                |
| longtext     | 存放最大长度为 4,294,967,295 个字符的字符串                                                             |
| date         | 日期，格式：%Y-%m-%d                                                                                    |
| datetime     | 日期时间组合，日期和时间的组合。格式：%Y-%m-%d hh:mm:ss                                                 |
| timestamp     | 时间戳，timestamp 值使用 Unix 纪元 ('1970-01-01 00:00:00' UTC) 至今的描述来存储。格式：%Y-%m-%d hh:mm:ss |
| time         | 时间 int : 整数                                                                                          |

- 注意：SQL 语句除了登录和退出指令，其他指令都要在指令末位加上 ";"
- 注释为：
    - 单行注释: -- 注释内容 或 `#注释内容`(MySQL 特有)

    > 注意：使用 -- 添加单行注释时，-- 后面一定要加空格，而#没有要求。

    - 多行注释: `/_ 注释 _/`
- \`\` 为转义字符
- 分类：
    - DDL(Data Definition Language, 数据定义语言)：用于创建、修改、删除数据库、表、视图、索引、触发器的结构
        - create 创建
        - alter 修改表的结构
        - drop 删除
    - *DML*(Data Manipulation Language, 数据操作语言)： 可以操作数据库中表中记录的 增、删、改
        - insert 插入
        - update 更新
        - delete 删除
        - 事务控制
            - start transaction
            - commit
            - rollback
    - *DQL*(Data Query Language, 数据查询语言)：可以操作数据库中表中记录的 查
        - select <字段名表> from <表或视图名> where <查询条件>
    - DCL(Data Control Language, 数据控制语言)：用于控制访问数据库的权限、角色等，包括授权、回收权限，而且只有特定的用户才有权限使用这些语句
        - grant
        - revoke

## DDL：数据定义语言

| 代码                                                | 解释                             |
| --------------------------------------------------- | -------------------------------- |
| show databases；                                    | 查询数据库                       |
| create database if not exists 数据库名称;           | 数据库的增加判断                 |
| create database 数据库名 default character set utf8 | 创建数据库的同时指定该数据库编码 |
| show create database 数据库名                       | 显示数据库创建信息               |
| drop database 数据库名                              | 删除数据库                       |
| alter database 数据库名 default character set utf8  | 修改数据库默认编码               |
| set names gbk                                       | 临时设置 MySQL 编码              |
| use 数据库名                                        | 选中数据库                       |

| 代码                                                                 | 解释                                                                                   |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| show tables;                                                         | 查看当前数据库的表                                                                     |
| create table 表名 (<br />字段名 字段类型,<br />字段名 字段类型<br />) | 创建表                                                                                 |
| alter table 表名 change 被修改字段名 新字段名 字段类型               | 修改字段名、类型 (注意：当有字段值存在时，不能修改字段类型)                             |
| alter table 表名 add (column) 字段名 字段类型 (after 字段名)         | 添加字段 (在某个字段之后)                                                               |
| alter table 表名 modify (column) 字段名 新字段类型;                  | 修改字段类型                                                                           |
| alter table 表名 drop (column) 字段名                                | 删除字段                                                                               |
| alter table 旧表名 rename (to) 新表名                                | 重命名                                                                                 |
| rename table 旧表名 to 新表名                                        | 重命名                                                                                 |
| show create table 表名                                               | 显示表的创建信息                                                                       |
| desc 表名                                                            | 查看表的结构                                                                           |
| truncate 表名                                                        | 保留字段，删除所有记录。(删除原表，创建一张字段相同的无记录空表，属于 DDL 的 sql 语句) |
| drop table 表名                                                      | 删除表                                                                                 |
| drop table if exists 表名;                                           | 删除表，该语法可以避免报错                                                             |

```sql
-- 库的操作
# 显示所有库
show databases;
# 使用指定库
use stage1;
# 创建库
create database if not exists noby_database;
# 查看库的创建信息
show create database noby_database;
# 删除库
drop database if exists noby_database;

-- 表的操作
# 显示当前库的所有表
show tables;
# 删除存在的表
drop table if exists student;
# 创建表
create table student(
    id       int,-- 整型，四个字节
    name     varchar(10),-- 可变长字符串（字符串宽度小于等于10即可）
    gender   char(1),-- 不可变长字符串
    birthday date,-- date表示日期，tatetime表示日期和时间
    score    double(5, 2),-- 5表示数据的总长度，2表示小数点后面的位数
    email    varchar(64),
    tel      varchar(15),
    status   tinyint-- 小整型，1个字节
);
# 查看表的结构
desc student;
# 查看表的创建信息
show create table student;
# 修改字段名
alter table student rename person;
# 修改字段名
alter table person rename to student;
# 添加字段
alter table student add address varchar(20) after tel;
# 修改字段类型
alter table student modify address varchar(30);
# 修改字段名和字段类型
alter table student change address addr varchar(50);
# 删除字段
alter table student drop addr;
# 删除原表，创建一张字段相同的无记录空表
truncate student;
# 删除表
drop table student;
```

### 约束

- 定义：限制表中的数据，保证添加到数据表中的数据准确和可靠性！凡是不符合约束的数据，插入时就会失败！
    - 如：性别字段只有男和女，年龄只有正整数；
- 约束条件在创建表时可以使用， 也可以修改表的时候添加约束条件
- MySQL 中的 6 大约束：
    - 默认值约束：可以给字段设置默认值，如果在插入数据时不给该字段赋值，那么就采用默认值
    - 非空约束：字段的值不能是 null(可以没值)
    - 唯一约束：字段的值是唯一的，该字段不能出现重复的数据
    - 主键约束：非空 + 唯一，一般一张表只有一个主键
    - 自增长约束：新插入的数据的值是在前一条数据的基础上自增而来的
    - 外键约束：B 表中的某个字段的值受到 A 表某个字段的值的约束

```sql
-- 数据库定义语言，约束
-- 1、默认值约束：
drop table if exists `user`;# 这里的反引号表示会和系统的标识符冲突，使用自定义标识符
create table `user`
(
    id     int,
    `name` varchar(20),
    gender varchar(20) default '女'
);
# 当填写该字段时，使用该值
insert into `user` value (1, '令狐冲', '男');
# 当未填写该字段时，该值使用默认值
insert into `user` (id, `name`) value (2, '岳灵珊');
# 当该字段填写默认值时，使用默认值
insert into `user` value (3, '林黛玉', default);

# 添加字段，同时给字段添加默认值约束
alter table `user`
    add hobby varchar(20) default '没有兴趣爱好';
# 修改字段默认值约束，不会修改记录中已经填入的默认值，是新的默认值会变为新设置的默认值
alter table `user`
    modify hobby varchar(20) default 'nohobby';
# 删除默认值约束，不会删除记录中已经填入的默认值，是新的默认值会为null
alter table `user`
    modify hobby varchar(20);
desc `user`;

-- 2、非空约束
drop table if exists `user`;
create table `user`
(
    id     int,
    `name` varchar(20) not null, # 非null
    gender varchar(20) default '女'
);

# 不可以为null
insert into `user` value (1, null, '男');
# 可以为''
insert into `user` value (2, '', '男');
# 添加字段，同时给字段添加非空约束
alter table `user`
    add hobby varchar(20) not null;
# 添加not null的字段约束
alter table `user`
    modify hobby varchar(20) not null;
# 删除约束
alter table `user`
    modify hobby varchar(20);
desc `user`;

-- 3、唯一约束
drop table if exists `user`;
create table `user`
(
    id     int unique, # 唯一
    `name` varchar(20) not null,
    gender varchar(20) default '女'
);
insert into `user` value (1, '令狐冲', '男');
# 将不能添加已存在的id(该字段设置了唯一约束)
insert into `user` value (1, '岳灵珊', '女');
# 添加unique的字段约束
alter table `user`
    modify id int unique;
# 删除唯一约束
alter table `user`
    drop index id;
desc `user`;

-- 4、主键约束(非空+唯一)：通常加在int类型的字段上(id)，一般表都有主键
drop table if exists `user`;
create table `user`
(
    id     int primary key, # 主键
    `name` varchar(20) not null,
    gender varchar(20) default '女'
);
insert into `user` value (1, '令狐冲', '男');
# 将不能添加已存在的id(该字段设置了主键约束)
insert into `user` value (1, '岳灵珊', '女');
# 将不能添加null值的id(该字段设置了主键约束)
insert into `user` value (null, '岳不群', '男');
# 添加primary key的字段约束
alter table `user`
    modify id int primary key;
# 删除主键约束
alter table `user`
    drop primary key;
desc `user`;


-- 联合主键：将多个字段设置为一个主键
drop table if exists teacher;
create table teacher
(# 记录每位老师不同班级学科成绩
    tid   int, # 工号
    cid   int, # 班级编号
    grade int, # 学科成绩
    primary key (tid, cid) # 联合主键
);

insert into teacher value (1001, 1, 80);
insert into teacher value (1001, 2, 90);
insert into teacher value (1001, 2, 100);# 不能插入相同的联合主键
desc teacher;


-- 5、自增长约束
drop table if exists `user`;
create table `user`
(
    id     int primary key auto_increment, # 主键约束、自增长约束
    `name` varchar(20) not null,
    gender varchar(20) default '女'
) auto_increment = 100;# 设置自增长的起始值为100
insert into `user` value (1001, '令狐冲', '男');
# 自增长约束在插入字段值时可根据最大值记录自动增加1
insert into `user` (`name`, gender) value ('岳灵珊', '女');
# 可以填入default，如果第一条记录的di字段值设置为default，则id为默认起始值。
insert into `user` value (default, '岳不群', '男');
# 设置自增长值
alter table `user`
    auto_increment = 10;
desc `user`;


-- 6、外键约束
drop table if exists `user`;
create table `user`
(# 用户表(父表)
    id     int primary key auto_increment, # 主键约束、自增长约束
    `name` varchar(20) not null,
    gender varchar(20) default '女'
) auto_increment = 100;# 设置自增长的起始值为100
insert into `user` value (default, 'noby', '男');
insert into `user` value (default, 'kace', '男');
insert into `user` value (default, 'july', '男');
desc `user`;

drop table if exists house;
create table house
(# 房屋表（子表）
    id        int primary key auto_increment, # 主键约束、自增长约束
    `address` varchar(20) not null,
    `user_id` int, # 用户id，值必须为用户表中的id值
    foreign key (`user_id`) references `user` (id) on update cascade # 给user_id字段添加外键约束，它的值受到user表中的id的约束
#  on update cascade 当更新父表时同时更新子表
);
insert into house value (default, 'chengdu', 100);
insert into house value (default, 'beijing', 101);
insert into house value (default, 'shanghai', 102);
# 没有103主键的user，添加失败
insert into house value (default, 'shengzheng', 103);
desc house;

# 父表更新主键，子表自动更新外键（定义子表时所设置）
update `user`
set id = 2
where id = 102;
# 删除父表的数据前应该先删除掉子表的数据
delete
from house
where id = 1;
# 直接执行此步报错
delete
from `user`
where id = 100;
```

### 表之间的对应关系

```sql
-- 数据库定义语言，表之间的关系

-- 表与表之间的一对多关系
# 部门表（主表）
drop table if exists department;
create table department
(
    id       int primary key auto_increment,
    dep_name varchar(20),
    address  varchar(20)
);
insert into department(dep_name, address)
values ('研发部', '广州'),
       ('销售部', '深圳');

# 员工表(从表)，创建从表前应该先创建主表
drop table if exists employee;
create table employee
(
    id            int primary key auto_increment,                                 # 员工id，主键（非空和唯一），且自增长
    name          varchar(50)  not null unique,                                   # 员工姓名，非空并且唯一
    join_date     date         not null,                                          # 入职日期，非空
    salary        double(7, 2) not null,                                          # 工资，非空
    bonus         double(7, 2) default 0,                                         # 奖金，如果没有奖金默认为0
    department_id int,

    # 添加外键 department_id,关联 department 表的id主键
    constraint fk_emp_dept foreign key (department_id) references department (id) # fk_emp_dept为外键名称，constraint fk_emp_dept表示声明这个外键的名称
);
insert into employee (name, join_date, salary, bonus, department_id)
values ('张三', '1999-11-11', 8800, 5000, 1),
       ('李四', '1999-11-11', 8800, 5000, 2),
       ('王五', '1999-11-11', 8800, 5000, 1),
       ('赵六', '1999-11-11', 8800, 5000, 2);


-- 表的多对多关系
/*
   多对多：
      * 如：订单 和 商品
      * 一个商品对应多个订单，一个订单包含多个商品

   实现方式：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键
*/
# 订单表
drop table if exists `order`;
create table `order`
(
    id           int primary key auto_increment,
    payment      double(10, 2),
    payment_type tinyint,
    status       tinyint
);
insert into `order` (id, payment, payment_type, status)
values (1,17998,1,1),
       (2,60,1,1);
# 商品表
drop table if exists good;
create table good
(
    id        int primary key auto_increment,
    title     varchar(100),
    price     double(10, 2),
    inventory int #库存
);
insert into good(id, title, price, inventory)
values (default, 'iphone13', 8999, 100),
       (default, 'pencil', 2, 200),
       (default, 'bag', 30, 400);
# 订单商品中间表
drop table if exists order_good_item;
create table order_good_item
(
    id       int primary key auto_increment,
    order_id int,
    goods_id int,
    count    int,
    foreign key (`order_id`) references `order` (id) on update cascade,
    foreign key (`goods_id`) references good (id) on update cascade
);
insert into order_good_item(id, order_id, goods_id, count)
values (default,1,1,2),
       (default,2,3,1);
```

## DML：数据操作语言

| 代码                                                                                        | 解释                                                                                  |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| select @@identity;                                                                          | @@identity 会记录上一条 insert 语句添加数据的自增主键值 (数据库中@@开头的是系统变量 ) |
| insert into 表名 values(字段值 1，字段值 2，字段值 3)，<br />(字段值 1，字段值 2，字段值 3) | 插入数据 (所有字段)                                                                    |
| insert into 表名 (字段名 1，字段名 2) value(字段值 1，字段值 2)                              | 插入数据 (部分字段)                                                                    |
| update 表名 set 字段名 = 字段值,字段名 = 字段值 where 条件                                  | 通过指定条件修改字段值                                                                |
| delete from 表名 (where 条件)                                                               | 保留字段，删除所有记录。(删除满足条件的记录)                                          |

```sql
-- 数据库操作语言
# 插入记录部分字段（value和values无区别）
insert into student(id, name) value (null, 'noby');
# 插入记录的简写，插入全部字段
insert into student
values (2, '张三', '男', '1999-11-12', 88.88, 'lisi@qq.com', '13888888888', 1);
# 同时插入多条记录
insert into student
values (3, '李四', '男', '1999-11-11', 88.88, 'lisi@qq.com', '13888888888', 1),
       (4, '王五', '男', '1999-11-11', 88.88, 'lisi@qq.com', '13888888888', 1),
       (5, '赵六', '男', '1999-11-11', 88.88, 'lisi@qq.com', '13888888888', 1);
# 删除记录
delete
from student
where name = '李四';
# 修改记录
update student
set name = '王二麻子'
where id = 4;
```

## DQL：数据查询语言

DQL 的完整语法：

```sql
SELECT
    字段列表
FROM
    表名列表
WHERE
    条件列表
GROUP BY
    分组字段
HAVING
    分组后条件
ORDER BY
    排序字段
LIMIT
    分页限定
```

### 条件判断

| 语句                                                    | 解释                                                                |
| ------------------------------------------------------- | ------------------------------------------------------------------- |
| `&lt;,&lt;=,&gt;,&gt;=,&amp;`                           | 小于，小于等于，大于，大于等于，& 和                                |
| =,>,<,>=,<=,!=,<>                                       |                                                                     |
| (not) between…and…                                  | (不) 在……和……之间                                                    |
| (not) in(a，b，c)                                       | (不) 在 (a，b，c) 之中                                                 |
| and,&&                                                  | 并且                                                                |
| or,ll                                                   | 或者                                                                |
| is (not) null                                           | (不) 是 null 值 (判断 null 值不能用 = 或者 !=)                       |
| distinct                                                | 去除重复                                                            |
| as                                                      | 作为                                                                |
| select 字段 from 表名 where 字段 like '% 字符 1*字符 2*' | 模糊查询，% 表示多个字符，\_ 表示一个字符，这两个字符之间可以任意组合 |

### 单表查询

| 代码                                                                                                                                                | 解释                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| select \* form 表名                                                                                                                                 | 查询表的所有字段                                                                                                                                                                                                              |
| select distinct 字段 1，字段 2 from 表名                                                                                                            | 当查询的结果中的字段 1 和字段 2 都相同时，只显示一项                                                                                                                                                                          |
| select 字段 1，字段 2…… from 表名                                                                                                               | 查询指定字段                                                                                                                                                                                                                  |
| select 字段 1 as 别名，字段 2 as 别名                                                                                                               | 给查询的结果起别名（as 可以省略）                                                                                                                                                                                             |
| select 字段名，字段名….. from 表名 where 条件;                                                                                                    | 条件查询                                                                                                                                                                                                                      |
| select 字段名，字段名….. from 表名 字段 like 通配符;                                                                                              | 模糊查询 \_ 表示一个字符 % 表示多个字符                                                                                                                                                                                         |
| select 字段… from 表名 order by 字段 1 排序方式，字段 2 排序方式;                                                                                 | 按照某个排序方式对某个字段进行排序查询，desc（降序），asc（升序，默认值），当字段 1 的排序相同时再进行字段 2 的排序                                                                                                           |
| select 字段… from 表名 limit 起始索引，页大小                                                                                                     | 分页查询                                                                                                                                                                                                                      |
| count (字段) 统计非空数据的条数 (相同数据也计数)<br />avg (字段) 计算结果的平均值<br />sum (字段) 求和<br />max (字段) 最大值<br />min (字段) 最小值 | 聚合查询：对查询出来数据做统计操作<br />如：select max(sal),min(sal), avg(sal),sum(sal) from emp;                                                                                                                             |
| group by 字段<br />如：select avg(sal) from emp group by deptno;                                                                                    | 分组查询：将结果集按照指定的字段值一样的记录看作同一组，配合聚合函数使用可以对每组的数据进行统计并得出结果                                                                                                                    |
| group by 字段 having 聚合函数条件判断语句<br />如：select max(sal),deptno from emp group by deptno having avg(sal)>2000;                            | 如果想要将聚合函数作为查询条件，不能直接跟在 where 后面，需要将聚合函数写在 having 子句中；having 必须跟在 group by 子句之后,作用是添加过滤条件将不满足的分组去除；<br />查看部门平均工资高于 2000 的这些部门的最高工资是多少 |

```sql
-- 数据库查询语言
/*
 DQL完整语法：
select
    字段列表
from
    表名列表
where
    条件列表
group by
    分组字段
having
    分组后条件
order by
    排序字段
limit
    分页限定
 */-- 数据准备
use stage1;
drop table if exists stu;
create table stu (
                     id int, # 编号
                     name varchar(20), # 姓名
                     age int, # 年龄
                     sex varchar(5), # 性别
                     address varchar(100), # 地址
                     math double(5,2), # 数学成绩
                     english double(5,2), # 英语成绩
                     hire_date date # 入学时间
);
insert into stu(id,name,age,sex,address,math,english,hire_date)
values
    (1,'马运',55,'男','杭州',66,78,'1995-09-01'),
    (2,'马花疼',45,'女','深圳',98,87,'1998-09-01'),
    (3,'马斯克',55,'男','香港',56,77,'1999-09-02'),
    (4,'马斯克',55,'男','香港',56,77,'1999-09-02'),
    (5,'柳白',20,'女','湖南',76,65,'1997-09-05'),
    (6,'柳青',20,'男','湖南',86,null,'1998-09-01'),
    (7,'刘德花',57,'男','香港',99,99,'1998-09-01'),
    (8,'张学右',22,'女','香港',99,99,'1998-09-01'),
    (9,'德玛西亚',18,'男','南京',56,65,'1994-09-02');


-- 基础查询
# 查询所有字段，开发中尽量不用
select * from stu;
# 给查询的结果起别名
select name 名字,age as 年龄,sex from stu ;
# 条件查询
select name,age from stu where age > 20;
# 范围（包含两头）
select * from stu where hire_date between '1998-1-1' and '1998-12-31';
# 范围，指定个数
select name,age from stu where age in(20,18,22);
# 等于空的查询方法（不能使用=）
select name,english from stu where english is null;
# 模糊查询，_表示单个字符
select name from stu where name like '柳_';
# 模糊查询，%表示多个字符
select name,hire_date from stu where hire_date like '%09%';
# distinct可去除查询结果中的相同记录，本来有两个马斯克满足条件
select distinct name,age,sex from stu where age = 55;
# 排序，desc表示降序，asc表示升序（默认），当math字段的记录相同时通过english字段进行排序
select name,math,english from stu order by math desc,english asc;

-- 聚合函数
/* 所有的聚合函数中null都不参与运算 */# 统计记录的条数一般用*
select count(*) from stu;
# min计算中不统计null值
select min(english) from stu;
select avg(english) from stu;
select sum(english) from stu;
# 同时输出其他非聚合函数的字段
select name,math from stu where math = (select max(math) from stu);

-- 分组查询
/* 注意：分组之后，查询的字段为聚合函数和分组字段，查询其他字段无意义 */# 查询男同学和女同学各自的数学平均分，以及各自人数
select sex,avg(math),count(*) from stu group by sex;# 这里的分组字段为sex，查询中输入其他字段将无意义
# 查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组
select sex,avg(math),count(*) from stu where math > 70 group by sex;# where math > 70 分组前的条件限定（表示参与分组的条件）
# 查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组，分组之后人数大2
select sex,avg(math),count(*) from stu where math > 70 group by sex having count(*) > 2;-- having count(*) > 2 分组后的过滤条件（显示分组的条件）
/*
where和having区别：
·执行时机不一样：where是分组之前进行限定，不满足where条件，则不参与分组，而having是分组之后对结果进行过滤。
·可判断的条件不一样：where不能对聚合函数进行判断，having可以。
执行顺序：where>聚合函数>having
 */
-- 分页查询
/* 其实索引=（页码-1）*每页条数 */select * from stu limit 0,3;# 0表示查询的起始记录（0开始），3表示显示的条数
select * from stu limit 3,3;# 第二页
select * from stu limit 6,3;# 第三页
```

### 多表查询

- 联合多张表查询数据即关联查询，查询的结果集中的字段来自多张表，关联查询的重点是连接条件,数据库是根据连接条件对表中的数据做关联然后查询内容的
- 笛卡尔积：关联查询通常要加连接条件,不写连接条件会出现 " 笛卡尔积 "，笛卡尔积通常是一个无意义的结果集，笛卡尔积是将关联查询表中的数据一一连接一遍而产生的结果集，数据量为关联查询表数据量的乘积

#### 连接查询

![image-20220426193628033](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220426193628033.png)

- 内连接查询 ：相当于查询 AB 交集数据
    - 隐式内连接
    - 显示内连接
- 外连接查询
    - 左外连接查询 ：相当于查询 A 表所有数据和交集部门数据
    - 右外连接查询 ： 相当于查询 B 表所有数据和交集部分数据
    - 全外连接：两表并集

#### 子查询

- 子查询根据查询结果不同，作用不同
    - 子查询语句结果是单行单列，子查询语句作为条件值，使用 = != > < 等进行条件判断
    - 子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断
    - 子查询语句结果是多行多列，子查询语句作为虚拟表

| 代码                                                                       | 解释                                                                                       |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| select \* from emp,dept where emp.deptno = dept.deptno;                    | 通过关联字消除笛卡尔积（隐式内连接）                                                       |
| select e.ename,e.deptno,d.dname from emp e,dept d where e.deptno=d.deptno; | 对于查询的某个字段在多张表上同时存在，我们可以使用表名或表别名来指定该字段来自哪张表       |
| select \* from zhangsan,lisi where zhangsan.`name` = lisi.`name`;          | 通过关联字段做等值判断                                                                     |
|                                                                            |                                                                                            |
| select \* from zhangsan inner join lisi on zhangsan.name = lisi.name;      | 内连接：查询出两张表中的共同数据                                                           |
| select \* from boy left outer join girl on boy.gid = girl.gid;             | 左外连接：将左边表的所有数据查询出来，然后与右表的数据进行匹配，匹配不上的用 null 进行匹配 |
| select \* from boy right outer join girl on boy.gid = girl.gid;            | 右外连接：将右边表的所有数据查询出来，然后与左表的数据进行匹配，匹配不上的用 null 进行匹配 |
| (select \* from boy) union all (select \* from girl);                      | 全外连接：两张表的所有数据都查询出来                                                       |
| select e.ename,m.ename from emp e,emp m where e.mgr = m.empno;             | 自连接：在有些情况下查询数据时需要将一张表当做两张表来使用，然后才能查询出指定的内容；     |
|                                                                            | 子查询：将一条 sql 查询出来的结果作为另一条 sql 的查询条件来使用                           |
| (select max(sal) sal,deptno from emp group by deptno) as m_sal             | 将查询出来的结果作为一张表来使用                                                           |

```sql
-- 数据库查询语言，多表查询
-- 数据准备
drop table if exists emp;
drop table if exists dep;
create table dep # 部门表
(
    id   int primary key auto_increment,
    name varchar(20)
);
create table emp # 员工表
(
    id        int primary key auto_increment,
    name      varchar(10),
    gender    char(1),                       # 性别
    salary    double,                        # 工资
    hire_date date,                          # 入职日期
    dep_id    int,
    foreign key (dep_id) references dep (id) # 外键，关联部门表(部门表的主键)
);
insert into dep (name)
values ('研发部'),
       ('市场部'),
       ('财务部'),
       ('销售部');
insert into emp(name, gender, salary, hire_date, dep_id)
values ('孙悟空', '男', 7200, '2013-02-24', 1),
       ('猪八戒', '男', 3600, '2010-12-02', 2),
       ('唐僧', '男', 9000, '2008-08-08', 2),
       ('白骨精', '女', 5000, '2015-10-07', 3),
       ('蜘蛛精', '女', 4500, '2011-03-14', 1),
       ('小白龙', '男', 2500, '2011-02-14', null);

-- 笛卡尔积 ： 有 a ,b两个集合 取 a,b所有的组合情况
select *
from emp,
     dep;

-- 内连接查询
# 隐式内连接
select *
from emp,
     dep
where emp.dep_id = dep.id;

# 查询 emp的 name，gender。dep表的name
select emp.name,
       emp.gender,
       dep.name
from emp,
     dep
where emp.dep_id = dep.id;

# 给表 起别名
select t1.name,
       t1.gender,
       t2.name
from emp t1,
     dep t2
where t1.dep_id = t2.id;


# 显式内连接
select *
from emp
         inner join dep on emp.dep_id = dep.id;
select *
from dep
         inner join emp on emp.dep_id = dep.id;
# inner可以省略
select *
from emp
         join dep on emp.dep_id = dep.id;


-- 外连接查询
# outer可以省略
# 左外连接
select *
from emp
         left join dep on emp.dep_id = dep.id;# 查询员工表所有数据和对应的部门信息，emp显示在前，显示emp外键为null的记录
select *
from dep
         left join emp on emp.dep_id = dep.id;
# 查询部门表所有数据和对应的员工信息，dep显示在前，显示dep外键为null的记录
# 右外连接
select *
from emp
         right join dep on emp.dep_id = dep.id;# 查询员工表所有数据和对应的部门信息，emp显示在前，显示dep外键为null的记录
select *
from dep
         right join emp on emp.dep_id = dep.id;
# 查询部门表所有数据和对应的员工信息，dep显示在前，显示emp外键为null的记录


-- 子查询
# 查询工资高于猪八戒的员工信息
/*子查询语句结果是单行单列，子查询语句作为条件值，使用 =  !=  >  <  等进行条件判断*/
select *
from emp
where salary > (select salary from emp where name = '猪八戒');

# 查询 '财务部' 和 '市场部' 所有的员工信息
/*子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断*/
select *
from emp
where dep_id in (select id from dep where name in ('财务部', '市场部'));


# 查询入职日期是 '2011-11-11' 之后的员工信息和部门信息
/*子查询语句结果是多行多列，子查询语句作为虚拟表*/
select *
from (select * from emp where hire_date > '2011-11-11') t1,
     dep
where t1.dep_id = dep.id;
```

## 函数

- sql 函数常用语 DQL 和 DML 中

日期、时间：

| 函数 | 解释 |
| ------------------- | ---------------------------------------- |
| sysdate() | 获取当前日期和时间 |
| curdate() | 获取当前日期 |
| curtime() | 获取当前时间 |
| now() | 获取当前日期和时间 |
| current_timestamp() | 获取当前时间戳，控制台打印时间而非时间戳 |

字符串

| 函数 | 解释 |
| -------- | ---------- |
| concat() | 连接 |
| length() | 长度 |
| lower() | 转换为小写 |
| upper() | 转换为大写 |
| trim() | 去空白 |
| ltrim() | 去左边空格 |
| rtrim() | 去右边空格 |

null

| 函数 | 解释 |
| -------- | ---------- |
| ifnull(num,0) | 判断 num 是否为 null，为空返回 0，否则返回 num |
| if(x,y,z) | 判断 x 是否为 null，如果为 null 返回 z，否则返回 y |

加密

| 函数 | 解释 |
| ----- | ---- |
| md5() | 加密 |

- null 的判断不能用 = 或 != ，而是 is 和 is not
- 任何数据和 null 的操作得到的都是 null

```mysql
-- 函数

-- 数据准备
use stage1;
drop table if exists stu;
create table stu (
                     id int, # 编号
                     name varchar(20), # 姓名
                     age int, # 年龄
                     sex varchar(5), # 性别
                     address varchar(100), # 地址
                     math double(5,2), # 数学成绩
                     english double(5,2), # 英语成绩
                     hire_date date # 入学时间
);
insert into stu(id,name,age,sex,address,math,english,hire_date)
values
    (1,'马运',55,'男','杭州',66,78,'1995-09-01'),
    (2,'马花疼',45,'女','深圳',98,87,'1998-09-01'),
    (3,'马斯克',55,'男','香港',56,77,'1999-09-02'),
    (4,'马斯克',55,'男','香港',56,77,'1999-09-02'),
    (5,'柳白',20,'女','湖南',76,65,'1997-09-05'),
    (6,'柳青',20,'男','湖南',86,null,'1998-09-01'),
    (7,'刘德花',57,'男','香港',99,99,'1998-09-01'),
    (8,'张学右',22,'女','香港',99,99,'1998-09-01'),
    (9,'德玛西亚',18,'男','南京',56,65,'1994-09-02');


-- mysql自带函数
-- 日期、时间有关
# 日期时间
select sysdate();
# 日期时间
select now();
# 时间戳
select current_timestamp();
# 日期
select curdate();
# 时间
select curtime();

-- 字符串有关
select concat('Hello', ' ', 'World');
select length('hello');
select lower('JAVA');
select upper('java');
select trim(' java ');
select ltrim(' java ');
select rtrim(' java ');

-- null有关
select name,ifnull(english,'是空的') from stu;
select name,if(english,'不是空的','是空的') from stu;

-- 加密有关
select md5('18435fdsf');

-- sql函数在DML中的应用
insert into stu value (10,'函数在DML中的应用',18,'男','南京',56,65,now());
-- sql函数在DQL中的应用
select *,concat(name,age) from stu;
select name,ifnull(english,'是空的') from stu;
select name,if(english,'不是空的','是空的') from stu;
```

## 事务

- 定义：事务是指一组数据库操作，这些操作要么全部执行成功，要么全部执行失败
- 事务的作用：事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行
- 存储引擎的概念：在 mysql 中的数据用各种不同的技术存储在文件（或内存）中。这些技术中的每一种技术都使用不同的存储机制，索引技巧，并且最终提供广泛的不同的功能和能力。可以通过选择不同的技术，可以获得额外的速度或功能，从而改善应用的整体功能。这些不同的技术以及配套的相关功能在 mysql 中被称为存储引擎（也称为表类型）。
    - 常见引擎：在 mysql 中用的最多的存储引擎有：innodb，bdb，myisam ,memory 等。其中 innodb 和 bdb 支持事务而 myisam 等不支持事务。
    - 指定引擎创建表格：create table 表名 (字段……) engine=innodb;
- 事务的 4 大特性 (ACID)：
    - 原子性 ( Atomicity)：原子性是指事务是一个不可再分割的工作单位，事务中的操作要么都发生，要么都不发生
    - 一致性 (Consistency)：一致性是指在事务开始之前和事务结束以后，数据库的完整性约束没有被破坏。这是说数据库事务不能破坏关系数据的完整性以及业务逻辑上的一致性。
    - 隔离性 (Isolation)：隔离性是指并发的事务是相互隔离的。即一个事务内部的操作及正在操作的数据必须封锁起来，不被企图进行修改的事务看到 。
    - 持久性 (Durability)：持久性是指在事务完成以后，该事务所对数据库所作的更改便持久的保存在数据库之中，并不会被回滚。 即使出现了任何事故比如断电等，事务一旦提交，则持久化保存在数据库中。
- 事务的控制语句：

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

### 事务的隔离级别

- 事务的隔离级别 (从低到高)
    - 读未提交（read uncommitted）：可能出现：脏读、不可重复读、幻读
    - 读已提交（read committed）：可能出现：不可重复读、幻读
    - 可重复读（repeatable read）：(MySQL 默认隔离级别)：可能出现：幻读
    - 串行读（serializable）：都不可能出现
- 并发事务可能产生的错误情况
    - 脏读：一个事务读到了另一个未提交事务修改过的数据
        - 解释：会话 B 开启一个事务，把 id=1 的 name 为武汉市修改成温州市，此时另外一个会话 A 也开启一个事务，读取 id=1 的 name，此时的查询结果为温州市，会话 B 的事务最后回滚了刚才修改的记录，这样会话 A 读到的数据是不存在的，这个现象就是脏读。（脏读只在读未提交隔离级别才会出现）
    - 不可重复度：一个事务只能读到另一个已经提交的事务修改过的数据，并且其他事务每对该数据进行一次修改并提交后，该事务都能查询得到最新值。另一种定义：A 事务读取两次，在这两次读取之间，B 事务进行了修改和提交，导致两次读取的数据不一致
        - 解释：会话 A 开启一个事务，查询 id=1 的结果，此时查询的结果 name 为武汉市。接着会话 B 把 id=1 的 name 修改为温州市（隐式事务，因为此时的 autocommit 为 1，每条 SQL 语句执行完自动提交），此时会话 A 的事务再一次查询 id=1 的结果，读取的结果 name 为温州市。会话 B 再此修改 id=1 的 name 为杭州市，会话 A 的事务再次查询 id=1，结果 name 的值为杭州市，这种现象就是不可重复读。（不可重复读在读未提交和读已提交隔离级别都可能会出现）
    - 幻读：一个事务先根据某些条件查询出一些记录，之后另一个事务又向表中插入了符合这些条件的记录，原先的事务再次按照该条件查询时，能把另一个事务插入的记录也读出来。另一种定义：A 事务读取两次，在这两次读取之间，B 事务进行了添加，导致两次读取的数据行数不一致
        - 解释：会话 A 开启一个事务，查询 id>0 的记录，此时会查到 name=武汉市的记录。接着会话 B 插入一条 name=温州市的数据（隐式事务，因为此时的 autocommit 为 1，每条 SQL 语句执行完自动提交），这时会话 A 的事务再以刚才的查询条件（id>0）再一次查询，此时会出现两条记录（name 为武汉市和温州市的记录），这种现象就是幻读。（幻读在读未提交、读已提交、可重复读隔离级别都可能会出现）

## 索引

- 定义：索引（Index）是一种数据库对象 (database、table、view、index)，是一种特殊的数据结构，用于提高查询的效率和速度 (增加了 b-tree 结构)。索引可以帮助 MySQL 快速定位并访问存储在表中的数据，从而加速查询并提高数据库的性能。与对表进行扫描比较，使用索引可以大大减少查询所需的时间和资源。索引的建立可以针对一个或多个列，根据数据的特点选取不同的创建方式来提高查询效率。
- 分类
    - 主键索引：用于标识一条记录的唯一性，
    - 唯一索引：用于确保某个列的值在整个表中的唯一性。
    - 普通索引：最常用的一种索引类型，用于提高查询的效率。
    - 全文索引：则用于全文搜索等高级查询需求。
- 一般来说，索引建立的主要原则是要尽可能少的创建索引，同时确保索引被应用在具有高选择性的列上。如果对于某列的查询，结果集较大，那么就不建议在这个列上创建索引，否则反而会降低查询效率。对于大型的数据库，索引的设计和使用可以对数据库的性能产生很大的影响，需要仔细选择和优化。以下情况适合添加索引：
    - 字段值绝大多数都是不重复的，b-tree 结构的构成根据数据的区别排列
    - 该字段值基本上改动少，当添加新的节点时，b-tree 的结构就行需要重构

```sql
-- 索引(index)：是一种数据库对象(database、table、view、index)，可以加快搜索速度

-- 数据准备

drop table if exists book;
create table book (
                      id int not null,
                      `name` varchar(64) not null,
                      author varchar(32) not null,
                      detail varchar(32) not null,
                      price double,
                      primary key (id)
)engine = myisam row_format = default;

-- 创建存储过程
drop procedure if exists batchinsertbook;
delimiter $
create procedure batchinsertbook(in start int,in loop_time int)
begin
    declare var int;
    declare id int;
    declare bname varchar(20);
    set var = 0;
    set id= start;
    while var < loop_time do
            set bname = concat('java基础入门',id);
            insert into book(id,`name`,author,detail,price)
            values(id,bname,'zhangsan','这本书主要值针对没有java基础人员的入门教程',1.23);
            set id= id + 1;
            set var = var + 1;
        end while;end $

-- 禁用索引，加快数据导入速度
alter  table  book  disable  keys;

-- 调用存储过程导入200w条数据
call batchinsertbook(1,500000);

-- 添加索引
alter  table  book  enable  keys;

-- 修改表的引擎为innodb
alter table book engine innodb;
```

## 表的设计三范式

- 定义：在对数据库进行设计时为了方便后期代码业务的实现，通常会在设计数据库时遵守一些规范，这些规范称之为范式。

### 第一范式

- 数据表的列不可再分。
- 例如：下表中的选课字段可以再分为对应的学科，所以不满足第一范式

| **学号** | **姓名** | **选课**         |
| -------- | -------- | ---------------- |
| 10001    | 张三     | 数学，语文，英语 |
| 10002    | 李四     | 语文，英语       |
| 10003    | 王五     | 语文，英语，历史 |

### 第二范式

- 满足第一范式的前提下，并且表中非主键列不存在对主键的部分依赖。
- 例如：下表中，学号和课程构成联合主键，成绩同时依赖于学号和课程，但课程学分只依赖于课程 (课程是主键的一部分)

| **学号** | **课程** | **成绩** | **课程学分** |
| -------- | -------- | -------- | ------------ |
| 10001    | 数学     | 100      | 6            |
| 10001    | 语文     | 90       | 2            |
| 10001    | 英语     | 85       | 3            |
| 10002    | 数学     | 90       | 6            |
| 10003    | 数学     | 99       | 6            |
| 10004    | 语文     | 89       | 2            |

- 如需满足第二范式，需将表拆分：

| **学号** | **课程** | **成绩** |
| -------- | -------- | -------- |
| 10001    | 数学     | 100      |
| 10001    | 语文     | 90       |
| 10001    | 英语     | 85       |
| 10002    | 数学     | 90       |
| 10003    | 数学     | 99       |
| 10004    | 语文     | 89       |

| **课程** | **课程学分** |
| -------- | ------------ |
| 数学     | 6            |
| 语文     | 3            |
| 英语     | 2            |

### 第三范式

- 满足第二范式的同时，表中的列不存在对非主键列的传递依赖。
- 例如：下面的学生信息表，虽然满足第二范式，所有字段都依赖主键（学号），但是，表中存在一个传递依赖，(学号）->(班级）->（班主任）。也就是说，（班主任）这个非主键列依赖于另外一个非主键列 （班级）。所以不符号第三范式。

| **学号** | **姓名** | **性别** | **班级** | **班主任** |
| -------- | -------- | -------- | -------- | ---------- |
| 10001    | 张三     | 男       | 一班     | 小王       |
| 10002    | 李四     | 男       | 一班     | 小王       |
| 10003    | 王五     | 男       | 二班     | 小李       |
| 10004    | 张小三   | 男       | 二班     | 小李       |

- 如需满足第三范式，需将表拆分：

| **学号** | **姓名** | **性别** | **班级** |
| -------- | -------- | -------- | -------- |
| 10001    | 张三     | 男       | 一班     |
| 10002    | 李四     | 男       | 一班     |
| 10003    | 王五     | 男       | 二班     |
| 10004    | 张小三   | 男       | 二班     |

| **班级** | **班主任** |
| -------- | ---------- |
| 一班     | 小王       |
| 二班     | 小李       |
